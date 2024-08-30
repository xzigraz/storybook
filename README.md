Personal portfolio site built using NextJS, Storybook, Git Submodule, SASS, and TypeScript. You can check it out here: https://thedepartedonline.com and https://storybook.thedepartedonline.com

## Background

I have started looking for a new position, but my old site is really outdated. It was built in 2015 using backbone.js. It has been almost 10 years, I have learned a lot since 2015. I figure I should apply what I know now into my own project, it gives me a chance to summarize myself, get a realistic assessment of what I can accomplish with the limited resources and see how far I can take this.

## Project Setup
- Clone this repo
- Run `yarn` to install all the dependencies
- Run `git submodule update --init` to pull in the code from the `ui-component` repo.
- Run `yarn dev` to start the local dev server
- Run `yarn build` to compile production code
- Run `yarn start` to start the local production server
- Run `yarn storybook` to start the storybook server
- Run `yarn build-storybook` to compile production storybook code

## Deployment
I am using Netlify to handle the deployment for the portfolio site and the storybook site.

The portfolio pipeline will run the NextJS build script and serve the site from `./next` directory. The storybook pipeline will run the Storybody build script and serve the site from `storybook-static` directory.

I am using Squarespace to manage my domain, for the storybook site, I created a subdomain under my domain. In the Netlify, I added my custom domains for the two deployments and then updated DNS records.

## Roadmap
For initial phase, I just want to set up a site with the following pages:
 - Homepage: talk about myself a little bit
 - Experiences: My professional and personal projects
 - Contact: A way to get in touch with me.

I don't have a lot of backend experiences. I have used PHP, MySQL, PostGresSQL, and GraphQL, but not enough to set up my own backend server, create api endpoints where I am able send request to to store contact info. So, I am using Google Sheet and set it up as an Webapp and use it as my endpoint. I can also get notifications when there's new entry. Perfect for my usecase.

After this, I would like to expand on what the site can do, use as many as possible the free available microservices out there to build something cool. I would also like to improve the tooling so that I can put restrictions on code commits, making sure code is automatically linted, and automatic tests when I or somebody else try to commit code.