Personal portfolio site built using NextJS, Storybook, Git Submodule, SASS, and TypeScript. You can check it out here: https://thedepartedonline.com and https://storybook.thedepartedonline.com

## Background

I have started looking for a new position, but my old site is really outdated. It was built in 2015 using backbone.js. It has been almost 10 years, I have learned a lot since 2015. I figure I should apply what I know now into my own project, it gives me a chance to summarize myself, get a realistic assessment of what I can accomplish with the limited resources and see how far I can take this.

## Project Setup
- Clone this repo
- Run `pnpm install` to install all the dependencies
- Run `git submodule update --init` to pull in the code from the `ui-component` repo.
- Copy `.env.template` to `.env` and fill in the values (see [Environment Variables](#environment-variables) below).
- Run `pnpm dev` to start the local dev server
- Run `pnpm build` to compile production code
- Run `pnpm start` to start the local production server
- Run `pnpm storybook` to start the storybook server
- Run `pnpm build-storybook` to compile production storybook code
- Run `pnpm test` to run the Jest/React Testing Library unit tests
- Run `pnpm lint` to lint the codebase

## Environment Variables
The site relies on a few external services, configured through environment variables (see `.env.template`):
- `GOOGLE_FORM_ID` - endpoint for a Google Form/Sheet webapp used to store contact form submissions.
- `WORKER_AI_API_URL`, `WORKER_AI_ACCOUNT_ID`, `WORKER_AI_API_TOKEN` - Cloudflare Workers AI credentials, used by the `/api/generate` endpoint to power the Lorem Ipsum generator demo (text and image generation).
- `CMS_RAW_BASE_URL` - base URL for the public GitHub content repo that serves the blog posts (fetched via raw.githubusercontent.com, no auth needed).
- `SERVER_BASE_URL` - base URL used for server-side data fetching.
- `GTM_ID` - Google Tag Manager container ID.

## Pages
- **Home** - short introduction about myself.
- **Experiences** - professional and personal projects, including dedicated pages for The Departed Online, ui-component, and Inxeption.com, with screenshots.
- **Blog** - posts pulled from a public GitHub content repo ([xzigraz/cms](https://github.com/xzigraz/cms)) as markdown, including write-ups like the Front-End Development Leader and Verkada pieces.
- **Lorem Ipsum Generator** - a small demo that calls Cloudflare Workers AI to generate placeholder text/images.
- **Contact** - a form that posts to a Google Form, so I get an email notification for every new entry.

## Deployment
I am using Netlify to handle the deployment for the portfolio site and the storybook site.

The portfolio pipeline will run the NextJS build script and serve the site from `./next` directory. The storybook pipeline will run the Storybody build script and serve the site from `storybook-static` directory.

I am using Squarespace to manage my domain, for the storybook site, I created a subdomain under my domain. In the Netlify, I added my custom domains for the two deployments and then updated DNS records.

## Testing
Unit tests are written with Jest and React Testing Library and live alongside the source files (e.g. `app/page.test.tsx`). Run them with `pnpm test`.

## Roadmap
See `docs/FEATURES.md` for a record of what's already been built.

Forward-looking:
- Increase test coverage beyond the current single smoke test (scope not yet decided).
