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

## Blog, backed by a headless WordPress instance over GraphQL

`app/blogs/page.tsx` and `app/blogs/[slug]/page.tsx` render a blog whose content comes
from a headless WordPress instance, queried over GraphQL.

- `constants/queries.ts` defines the shared `POST_PROJECTION` GraphQL fragment and
  response types (`POST`, `POSTS`, `POST_DATA`, `POST_BY_DATA`).
- `app/api/get-posts/route.ts` and `app/api/get-post/route.ts` are internal API routes
  that proxy the actual GraphQL request to `WORDPRESS_GRAPHQL_URL`; the page components
  call these internal routes (via `SERVER_BASE_URL`) rather than the WordPress GraphQL
  endpoint directly.
- The listing page revalidates hourly (`export const revalidate = 3600`).

**Being replaced** — see the Roadmap and
[ADR 0002](adr/0002-migrate-blog-content-source-to-github-markdown.md): the free
WordPress hosting backing this has proven unreliable, so the content source is
migrating to a dedicated GitHub repo of markdown files.

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
