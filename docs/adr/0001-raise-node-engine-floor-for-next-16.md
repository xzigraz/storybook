# 1. Raise the Node engine floor to >=20.19.0 for Next 16

## Status

Accepted. **Revised post-merge**: the floor stated here was `>=20.9.0` (matching only
Next 16's own declared minimum) and shipped that way in `netlify.toml`
(`NODE_VERSION = "20.9.0"`). That broke the actual Netlify build:
`pnpm install` failed with `ERR_PNPM_UNSUPPORTED_ENGINE` on Node 20.9.0, because
`eslint@10.6.0` and `vite@7.3.6` (both landed in this same Phase 2, in 2c and 2b
respectively) declare their own, stricter floors — `^20.19.0 || ^22.13.0 || >=24` and
`^20.19.0 || >=22.12.0`. `>=20.9.0` was never actually installable once the full
Phase 2 dependency set was considered; `engines.node` only ever got checked against
Next's requirement in isolation, not the whole tree. Raised to `>=20.19.0` (satisfies
every floor found: Next, ESLint, typescript-eslint, Vite), and `netlify.toml` to
`NODE_VERSION = "20.20.2"` (latest 20.x LTS) to match. Reproduced the original
Netlify failure locally under Node 20.20.2 before and after to confirm.

## Context

Phase 1 of the [stack upgrade](../stack-upgrade.md) (switching to pnpm) deliberately
left `engines.node` at `>=18.18.0` unchanged, treating any change to the Node version
floor as out of scope.

Phase 2 upgrades every dependency to latest, including Next.js. Next 14.2.3 (current)
has no stated Node floor beyond 18.18. Next 16.2.10 (target) declares
`engines.node: >=20.9.0` in its own `package.json` — it will refuse to run on Node
18.x.

Two real alternatives existed:
- Cap the Next.js upgrade at the 15.x line (`15.5.20`), which still ships the
  async-`params` breaking change and other Next 15 improvements, but keeps this
  repo's Node floor at `>=18.18.0`.
- Take Next 16 and raise the Node floor to `>=20.9.0` to match.

## Decision

Raise `engines.node` to `>=20.9.0` and take Next 16, rather than capping at Next 15 to
preserve the old floor. Phase 2's stated goal is landing on "latest" across the board;
stopping one major short of latest specifically to avoid a Node version bump would be
inconsistent with that goal, and there's no other constraint (e.g. a deploy target
stuck on Node 18) forcing the cap.

## Consequences

- Local dev environments, CI, and Netlify's build image must run Node >=20.19.0
  (revised from the originally-stated >=20.9.0 — see Status above). Verify Netlify's
  configured Node version (via `netlify.toml` or dashboard/`NODE_VERSION` env var) is
  bumped alongside this change, or the production build will fail on the engine
  check — this exact thing happened once already with the wrong floor.
- Any contributor still on Node 18.x locally will fail `engine-strict` installs
  (`.npmrc` has `engine-strict=true`) until they upgrade Node — intentional, not an
  oversight, since `engine-strict` is what surfaces this kind of mismatch early rather
  than at deploy time.
- Reversing this later (dropping back to Node 18-compatible tooling) would mean
  downgrading Next below 16, which fights against the "stay on latest" goal this
  entire Phase 2 effort exists to satisfy — so treat this as a one-way door absent a
  concrete reason to support older Node again.
