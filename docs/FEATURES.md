# Features

A record of what's been built and how, moved out of README's Roadmap once shipped so
Roadmap can stay purely forward-looking. See `docs/adr/` for the architecturally
significant decisions behind any of these.

## Initial phase: Homepage, Experiences, Contact

The first version of the site: a Homepage (short intro), an Experiences page
(professional and personal projects), and a Contact page.

The contact form has no backend of its own — `app/api/contact/route.ts` posts form
submissions to a Google Form/Sheet webapp (`GOOGLE_FORM_ID` env var), which gives an
email notification for every new entry. Chosen specifically to avoid standing up a
real backend/database for a single low-volume form.

## Blog, backed by a public GitHub content repo

`app/blogs/page.tsx` and `app/blogs/[slug]/page.tsx` render a blog whose content lives
as markdown in a dedicated public repo, [xzigraz/cms](https://github.com/xzigraz/cms),
fetched over `raw.githubusercontent.com` — no API, no auth, since the repo is public.
See [ADR 0002](adr/0002-migrate-blog-content-source-to-github-markdown.md) for the
full design; this replaced an earlier headless-WordPress-over-GraphQL setup whose free
hosting had proven unreliable.

- `constants/posts.ts` defines the `POST_SUMMARY` (slug/title/date/excerpt) and `POST`
  (`POST_SUMMARY` + `content`) types.
- The content repo has no directory-listing endpoint available over raw fetches, so it
  commits a hand-maintained `posts.json` manifest at its root (slug/title/date/excerpt
  per post); each post's markdown body lives separately at `posts/{slug}.md`.
- `app/api/get-posts/route.ts` and `app/api/get-post/route.ts` are internal API routes
  that fetch from `CMS_RAW_BASE_URL`; the page components call these internal routes
  (via `SERVER_BASE_URL`) rather than GitHub directly — preserved from the WordPress
  setup for consistency, even though there's no secret left to keep off the client.
- `lib/markdown.ts` converts each post's markdown body to HTML via a
  remark/rehype pipeline (`remark-parse` → `remark-gfm` → `remark-rehype` →
  `rehype-stringify`) before it's rendered with `dangerouslySetInnerHTML`.
- The listing page revalidates hourly (`export const revalidate = 3600`).
- The two existing posts were recovered from `thedepartedonline.com`'s stale ISR/CDN
  cache (the WordPress origin was already unreachable by the time this migration
  happened) and seeded into the new repo as-is.

## Lorem Ipsum generator, via Cloudflare Workers AI

`app/lorem-ipsum-generator/page.tsx` is a small AI-powered demo: a prompt box that
generates placeholder text or a placeholder image.

- `app/api/generate/route.ts` calls Cloudflare Workers AI, gated on
  `WORKER_AI_API_URL` / `WORKER_AI_ACCOUNT_ID` / `WORKER_AI_API_TOKEN`.
- Model selection is prompt-driven: `google/gemma-7b-it-lora` for text, or
  `black-forest-labs/flux-1-schnell` for images, switched based on whether the prompt
  text mentions generating an image.

## Jest + React Testing Library

Unit testing infrastructure is in place: `jest.config.ts` (via `next/jest`),
`tests/setupTests.ts`, and `@testing-library/react` / `@testing-library/jest-dom` as
dependencies.

Currently one test exists — `app/page.test.tsx`, a render-smoke-test for the
Homepage. Coverage beyond that is the "increase test coverage" Roadmap item; scope for
that hasn't been decided yet beyond the goal itself.
