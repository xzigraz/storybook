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

### 2b. Storybook

- Target: `storybook@10.4.6` and matching `@storybook/*` packages (not 9.x — 10.4.6 is
  current latest, confirmed via registry).
- `eslint-plugin-storybook@10.4.6` requires `storybook: ^10.4.6` as a peer, so its bump
  is tied to this sub-phase even though it's an ESLint plugin — can't cleanly land it
  in 2c on its own.

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
