# 1. Raise the Node engine floor to >=20.9.0 for Next 16

## Status

Accepted

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

- Local dev environments, CI, and Netlify's build image must run Node >=20.9.0. Verify
  Netlify's configured Node version (via `netlify.toml` or dashboard/`NODE_VERSION`
  env var) is bumped alongside this change, or the production build will fail on the
  engine check.
- Any contributor still on Node 18.x locally will fail `engine-strict` installs
  (`.npmrc` has `engine-strict=true`) until they upgrade Node — intentional, not an
  oversight, since `engine-strict` is what surfaces this kind of mismatch early rather
  than at deploy time.
- Reversing this later (dropping back to Node 18-compatible tooling) would mean
  downgrading Next below 16, which fights against the "stay on latest" goal this
  entire Phase 2 effort exists to satisfy — so treat this as a one-way door absent a
  concrete reason to support older Node again.
