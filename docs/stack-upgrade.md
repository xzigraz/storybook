# Stack Upgrade

## Phase 1: Switch package manager to pnpm

Scope: package-manager swap only. No dependency version bumps and no change to the
`engines.node` floor in this phase — those are deliberately deferred to Phase 2.

### Decisions

- **Hoisting**: use pnpm's default strict/symlinked `node_modules` (no
  `shamefully-hoist`). Run `dev`, `build`, `storybook`, `build-storybook`, and `test`
  after migration; only add targeted `public-hoist-pattern` entries if something
  actually breaks due to a phantom dependency.
  **Found during implementation — two phantom dependencies surfaced:**
  1. `.eslintrc.cjs` requires `@typescript-eslint/parser` and
     `@typescript-eslint/eslint-plugin` directly, but `package.json` only ever
     declared the `typescript-eslint` meta-package. Yarn's hoisting silently exposed
     the nested packages at the root; pnpm's strict linking doesn't. Fixed via the
     anticipated remedy — added `public-hoist-pattern[]=@typescript-eslint/*` to
     `.npmrc`, since this is lint tooling config wiring rather than application code.
  2. `app/verkada/page.tsx` does `import _ from "lodash"`, but `lodash` was **never
     declared in `package.json` at all** — it only resolved because some build-tool
     dependency (webpack, pulled in transitively) happened to get hoisted flat under
     Yarn. Since this is real application code depending on the package (not tooling
     config), the correct fix was different from case 1: added `lodash` (`4.17.21`)
     and `@types/lodash` (`4.17.15`) as explicit direct dependencies, pinned to the
     versions already transitively resolved, rather than hoist-patterning it — an
     app-code import should have its dependency declared, not silently rely on
     another package's hoisted transitive.
  Both fixes verified via `pnpm build`, `pnpm build-storybook`, `pnpm test`, and a
  manual `pnpm dev` smoke test hitting `/`, `/verkada`, `/front-end-development-leader`,
  `/lorem-ipsum-generator`, `/contact`, and `/experiences` (all 200).
- **Lockfile migration**: run `pnpm import` to convert `yarn.lock` →
  `pnpm-lock.yaml` (preserves currently-resolved versions instead of letting pnpm's
  resolver pick fresh ones). Then delete `yarn.lock`, `.yarnrc.yml`, and the `.yarn/`
  directory.
- **Version pin**: keep pinning the package manager via Corepack, same mechanism as
  today. Set `"packageManager": "pnpm@10.34.4"` in `package.json`, replacing
  `"packageManager": "yarn@4.12.0"`. **Revised during implementation:** pnpm 11.10.0
  (originally planned) itself requires Node >=22.13 just to run the CLI — unrelated to
  what this app needs, but it would force any machine running `pnpm install` onto Node
  22+, silently contradicting the "no engine floor change in Phase 1" decision above.
  pnpm 10.34.4 (latest in the 10.x line) only requires Node >=18.12, fitting the
  existing `>=18.18.0` floor with no side effect — used instead.
- **`resolutions` field**: pnpm doesn't read npm/yarn's top-level `resolutions` key.
  Move the existing `resolutions` block (`jackspeak`, `react`, `react-dom`,
  `@types/react`, `@types/react-dom`) into a nested `pnpm.overrides` key.
- **`.npmrc`**: keep `engine-strict=true` as-is; pnpm honors it.
- **`ui-component` submodule**: leave untouched on yarn with its own `yarn.lock`. It's
  a separate git repo consumed only via the TS path alias (`@/*` → `./*`), not
  installed as an npm dependency, so pnpm in the root repo never touches it.
- **Netlify**: no `netlify.toml` exists today; build command/publish dir for both the
  portfolio and storybook sites live in Netlify's dashboard. Added a `netlify.toml`
  pinning `NODE_VERSION = "18.18.0"` under `[build.environment]` — the one thing
  that's genuinely common install-time config. **Revised during implementation:**
  `corepack enable` turned out not to belong in `netlify.toml` after all — Netlify's
  `[build]` block only exposes a single `command` field, and setting that would mean
  owning the per-site build command here too, contradicting the "dashboard keeps
  per-site build/publish" decision. Instead, each site's dashboard Build command needs
  `corepack enable &&` prefixed onto it directly: portfolio →
  `corepack enable && pnpm build`; storybook →
  `corepack enable && pnpm build-storybook`, publish dir stays `storybook-static`.
  Update those two dashboard commands manually after this lands.
- **Docs**: update `README.md`'s Project Setup section (and any other yarn
  references) from `yarn <cmd>` to `pnpm <cmd>`.
- **CI**: no GitHub Actions workflows exist currently, so nothing to update there.

### Out of scope for Phase 1

- Any dependency version changes (Next, React, Storybook, ESLint, TypeScript, etc.)
- Raising the `engines.node` floor (currently `>=18.18.0`) — **note:** Phase 2 ends up
  raising this to `>=20.9.0`, forced by Next 16's own `engines` requirement. Not a
  Phase 1 concern, but flagged here so the two docs don't read as contradicting each
  other.
- Migrating the `ui-component` submodule off yarn

## Phase 2: Upgrade all packages

Goal: upgrade every dependency in the main repo to current latest, once Phase 1 has
landed and pnpm is the established package manager.

### Scope

Every dependency, including ones already close to latest (jest, testing-library,
babel, etc.) — no "skip if already recent" carve-out. Simplest rule to follow, and a
few will end up being no-ops.

Lands as **separate sequenced sub-phases**, each its own commit, each verified
(install + build + lint + test + a manual pass through the affected pages) before
moving to the next. If something breaks, it's attributable to one sub-phase's change,
not a tangle of four simultaneous major bumps.

### Sub-phase order and rationale

1. **2a. Next.js + React** — frameworks first; everything else's compatibility
   depends on which React version lands.
2. **2b. Storybook (+ its ESLint plugin)** — needs the final React version to pick
   compatible addons.
3. **2c. ESLint** — isolated tooling change, no runtime risk, but sequenced after
   Storybook since `eslint-plugin-storybook` is version-locked to the Storybook line.
4. **2d. three.js stack** (`three`, `react-force-graph`, `three-spritetext`) — isolated
   blast radius (only the front-end-development-leader page), but the single biggest
   API-surface rewrite, so it gets dedicated attention without other changes in
   flight.

### 2a. Next.js + React

- Target: `next@16.2.10`, `react@19.2.7`, `react-dom@19.2.7` (current latest at time
  of writing).
- **Node floor conflict, resolved**: Next 16 declares `engines.node: >=20.9.0` in its
  own package.json, which conflicts with Phase 1's decision to leave this repo's
  `engines.node` at `>=18.18.0`. Resolution: raise `engines.node` to `>=20.9.0` as part
  of 2a. This isn't scope creep from Phase 1's perspective — Phase 1 deferred the
  question, it didn't rule out ever changing it — but it is a hard requirement of
  landing on "latest" here, so calling it out explicitly rather than letting it slide
  in as a side effect.
- **Known required code change**: `app/blogs/[slug]/page.tsx` destructures `params`
  synchronously (`const { slug } = params`). Next 15+ makes `params` (and
  `searchParams`, `cookies()`, `headers()`, `draftMode()`) async — this page must
  await `params` (`const { slug } = await params`, with the prop typed as
  `Promise<{ slug: string }>`). Confirmed via grep that this is the *only* file in
  `app/` touching `params`/`searchParams`/`cookies()`/`headers()`, so this is the
  full known blast radius — anything beyond this is unknown-unknowns to find via
  build/test, not something pre-audited here.
- Also watch for Next 15's changed default fetch caching behavior (uncached by
  default, vs. cached-by-default pre-15) interacting with the existing hourly
  revalidation logic in the blog data fetching path — verify revalidation still
  behaves as intended after the bump, don't assume it's a no-op.
- `react-force-graph`'s peer dependency on React is `"*"` (unconstrained), so it's not
  a blocker for the React 19 bump itself, but its actual runtime compatibility with
  React 19 isn't guaranteed by the peer range alone — real verification happens in
  2d.

**What actually happened (2a is done):** landed `next@16.2.10`, `react@19.2.7`,
`react-dom@19.2.7`, `@next/third-parties@16.2.10`, `@types/react@19.2.17`,
`@types/react-dom@19.2.3`, `engines.node` raised to `>=20.9.0`, `pnpm.overrides`
updated from `"18"` to `"19"` for react/react-dom/@types (the override was still
force-pinning 18, which would have silently blocked the whole upgrade if left as-is).
The known `params` fix landed as planned. Several more things surfaced only by
actually running it:

- **`next lint` no longer exists** — Next 16 removed the subcommand entirely
  (confirmed via `next --help`). The `"lint": "next lint"` script was simply broken,
  not something deferrable to 2c. Fixed to call `eslint` directly, scoped to
  `app components constants` — deliberately matching `next lint`'s old default scope
  and *not* widening to `stories`/`tests`/`__mocks__`, since "actually enable the
  Storybook lint rules" is explicitly 2c's decision, not 2a's.
- **`eslint-config-next` was dead** — grepped and confirmed it was never referenced
  in `.eslintrc.cjs` (only `@next/eslint-plugin-next`, via
  `plugin:@next/next/recommended`, is actually used). Removed entirely rather than
  bumped.
- **`@next/eslint-plugin-next@16.2.10`'s `recommended` config is flat-config-only** —
  loading it through the legacy `.eslintrc.cjs` (still on ESLint 8 until 2c) throws
  `Unexpected top-level property "name"`. Bumping this plugin now would force the
  ESLint flat-config migration into 2a, the same shape of cross-phase collision as
  Phase 1's pnpm-version/Node-floor conflict. Same resolution pattern: kept
  `@next/eslint-plugin-next` pinned at the old `14.2.7` for now; its bump to `16.2.10`
  is deferred to 2c, landing together with the actual flat-config migration.
- **`eslint-plugin-react-hooks` was an undeclared phantom dependency** — `.eslintrc.cjs`
  references `plugin:react-hooks/recommended` directly, but it was never in
  `package.json`; it only resolved before because `next lint` supplied it from Next's
  own internal dependency graph, not this project's. Added explicitly at `7.1.1`
  (chosen specifically because it supports `eslint` 8 through 10 — won't need
  touching again in 2c).
- **That version bump enabled far more "rules of react" than before**, surfacing two
  real, pre-existing bugs once lint could actually run:
  - `app/verkada/page.tsx` used `Math.random()` to generate React `key`s in two spots
    — an actual anti-pattern (unstable keys cause needless remounts), flagged by the
    new `react-hooks/purity` rule. Fixed to use stable `rowIndex`/`cellIndex`-based
    keys.
  - `ui-component/CheckInview/checkIsInview.ts` exports a function that internally
    uses `useState`/`useEffect` — it's a custom hook — but was named `isRefInView`,
    not `useIsRefInView`. Without the `use` prefix, ESLint's hook-detection heuristic
    doesn't recognize it as hook-safe, so the new `react-hooks/refs` rule flagged all
    6 call sites in `app/page.tsx` as potentially reading `ref.current` during render.
    Renamed to `useIsRefInView` (in the `ui-component` submodule, plus the import and
    6 call sites in `app/page.tsx`) rather than suppressing the rule — this is a
    real, if latent, naming bug that happened to work before only because linting on
    this file was effectively broken.
- **A pre-existing Sass import bug surfaced by Turbopack**: Next 16 defaults `next
  build` to Turbopack, whose Sass resolution doesn't fall back to project-root-relative
  imports the way webpack's `sass-loader` silently did. `assets/scss/style.scss` had
  `@import "./ui-component/scss/utility.imports"` (missing the `../../` the very next
  line correctly uses for the same target directory) — only ever worked by accident.
  Fixed the path rather than adding Turbopack config to preserve the accidental
  behavior.
- **`/blogs` and `/blogs/[slug]` fail to build/render** — but traced to the free
  WordPress host itself being down right now (`curl`ing
  `thedepartedonline.atwebpages.com` directly returns HTTP 530, its own
  suspended-hosting placeholder page, not GraphQL), confirmed unrelated to this
  upgrade. Per explicit decision, treated as a known external outage rather than a 2a
  regression — this is exactly the reliability problem the (separate, not-yet-started)
  CMS migration roadmap item exists to fix. Verified 2a instead via `pnpm test`,
  `pnpm lint`, and `pnpm dev` hitting every other route (all 200); `/blogs*` return the
  same pre-existing error signature regardless of the Next/React version.
- Two of the fixes above (`RefObject<HTMLElement | null>` typing — from before this
  sub-phase's own work, plus the `useIsRefInView` rename) live in the `ui-component`
  submodule — committed and pushed there (`53e13d9`), with this repo's gitlink updated
  to match.

### 2b. Storybook

- Target: `storybook@10.4.6` and matching `@storybook/*` packages (not 9.x — 10.4.6 is
  current latest, confirmed via registry).
- `eslint-plugin-storybook@10.4.6` requires `storybook: ^10.4.6` as a peer, so its bump
  is tied to this sub-phase even though it's an ESLint plugin — can't cleanly land it
  in 2c on its own.

**What actually happened (2b is done):** used Storybook's own `storybook@<major>
upgrade` CLI rather than hand-picking package versions — for a 2-major jump this is
more reliable than guessing which packages got merged/renamed. The tool itself
refused to jump straight from 8→10 (`storybook@latest upgrade` hit a "Major Version
Gap Detected" blocker) and recommended stepping through one major at a time, so that's
what happened:

- **8 → 9** (`storybook@9 upgrade --yes`): automigrations removed
  `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/blocks`,
  and `@storybook/test` (all merged into core / consolidated in Storybook 9 — confirmed
  via registry that none of them published past `8.6.x`), added
  `@storybook/addon-docs`, and rewrote `.storybook/main.ts` accordingly (dropped the
  `docs.autodocs` setting, added `addon-docs` to the addons list).
- **`@chromatic-com/storybook` needed its own, separate bump** — it's a third-party
  Chromatic-maintained addon, not part of Storybook's own automigration. Still pinned
  at `1.3.5`, its `manager.mjs` imports old pre-consolidation package names
  (`@storybook/manager-api`, `@storybook/theming`, etc.) that no longer resolve.
  Checked its version history for a build that actually supports Storybook 9 as a
  bridge (`4.1.1`, peer range includes `^9.0.0`) rather than jumping straight to the
  final `5.2.1` (which requires `^10.1.0+`), to keep the 9.x checkpoint independently
  verifiable.
- **`@storybook/nextjs@9.1.20` doesn't support Next 16** — `build-storybook` failed
  with `TypeError: swc.isWasm is not a function` inside its internal
  `next-swc-loader-patch.js`, a genuine gap in the 9.x line's Next.js integration
  against Next 16's SWC bindings API. Not something to work around; this is exactly
  why Storybook recommends the step-through-one-major-at-a-time path — 9 is a
  migration waypoint, not a place to expect full Next 16 compatibility.
- **9 → 10** (`storybook@10 upgrade --yes`): the automigration's answer to the above
  was `nextjs-to-nextjs-vite` — it replaced `@storybook/nextjs` (webpack-based, the
  thing that broke) with `@storybook/nextjs-vite` (Vite-based), adding `vite@^7.0.0`
  as a new dependency and updating `.storybook/main.ts`'s framework name accordingly.
  This sidesteps the SWC incompatibility entirely rather than patching around it.
  Bumped `@chromatic-com/storybook` to its final `5.2.1` (needs `storybook ^10.1.0+`)
  at the same time.
- Verified via `pnpm build-storybook` (succeeds), `pnpm storybook` (dev server boots,
  `/` and `/iframe.html` both 200), `pnpm test`, `pnpm lint` (clean), `pnpm build`
  (compiles and type-checks; `/blogs` still hits the same known external WordPress
  outage from 2a, unrelated), and `pnpm dev` hitting every non-blog route (all 200).

### 2c. ESLint

- Target: `eslint@10.6.0` (current latest — not 9.x).
- **Config format migration**: this repo currently has *two* ESLint config sources —
  `.eslintrc.cjs` (active) and a `package.json` `eslintConfig` key (`extends:
  ["plugin:storybook/recommended"]`, **dead** — ESLint's legacy resolution only
  consults `package.json`'s `eslintConfig` when no `.eslintrc.*` file exists in the
  same directory, and `.eslintrc.cjs` is present, so this has silently never run).
  ESLint 10 requires flat config (`eslint.config.js`) by default. Migration
  consolidates both sources into one flat config, and — per explicit decision —
  **actually enables** the storybook recommended rules this time, since the original
  intent was clearly to have them running. Expect this to surface some new lint
  findings under `stories/` that were never caught before; fix those as part of this
  sub-phase rather than suppressing them.

### 2d. three.js stack

- **Dead dependency found**: `package.json` lists `"three.js": "0.77.1"` in
  `dependencies`, but on npm the real Three.js library is published as `three`, not
  `three.js` — the `three.js` package name is an unrelated, effectively-abandoned
  placeholder. Nothing in the codebase imports from it (only `three-spritetext` is
  imported directly, in `components/skillset.tsx`). The actual rendering dependency,
  `three`, is currently resolved purely *transitively* at `0.173.0` via
  `react-force-graph` → `3d-force-graph`.
- Resolution: delete the `three.js` line entirely; add `three` as an explicit direct
  dependency pinned to latest (`0.185.1` at time of writing) so the
  rendering-critical version is visible and controlled by this repo instead of
  implicit; bump `react-force-graph` (→ `1.48.2`) and `three-spritetext` (→ `1.10.0`)
  alongside it. `three-spritetext@1.10.0` requires `three >=0.86.0` as a peer, so
  `0.185.1` satisfies it.
- Highest-risk sub-phase for visible regressions given the size of the version jump —
  manually verify the force-graph visualization on the front-end-development-leader
  page renders correctly after this lands, don't rely on build success alone.
