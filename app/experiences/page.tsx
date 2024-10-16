import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import { PATH_ATS_SAFE_LONG_RESUME, PATH_ATS_SAFE_SHORT_RESUME, PATH_RESUME, PATH_STORYBOOK } from "@/constants/paths";
import "./_experiences.page.scss";
import Link from "next/link";

export default function Experiences() {
	return <MainLayout className="experiences peach-white">
		<>
			<SectionLayout>
				<>
					<h1>Experiences</h1>
					<p>Here are my resumes, <Link href={PATH_RESUME}>nice looking one</Link>, <Link href={PATH_ATS_SAFE_LONG_RESUME}>ATS safe long version</Link>, <Link href={PATH_ATS_SAFE_SHORT_RESUME}>ATS safe short version</Link>.</p>
					<p>If you want to get in touch with me, use the contact page. <span className="material-symbols-outlined get-in-touch">touch_app</span></p>
				</>
			</SectionLayout>
			<SectionLayout>
				<>
					<h2>Projects</h2>
					<div className="project-container">
						<h3>thedepartedonline.com</h3>
						<p>Portfolio site, this project is where I will refresh from time to time by using the industry trendy frameworks, design methodology, and best 
							practices so that I can showcase my front-end development chops.</p>
						<h4>Tech stack</h4>
						<ul>
							<li>Front-End: next.js, scss, html, eslint, typescript, storybook, ui-component</li>
							<li>Build: Netlify</li>
							<li>Domain: Squarespace</li>
							<li>Backend: next.js route handler, Google Sheet ActionScript</li>
						</ul>
						<h4>Set up</h4>
						<p>The codes I used in this project are source controlled in two different repos on Github. The storybook repo, and the ui-component repo. 
							ui-component repo is a common component library that I am working on that can be used in other projects. I'll talk more about it in 
							the ui-component project section. The storybook repo has all the code for thedepartedonline.com site including the storybook codes.</p>
						<p>For the front end, I am using next.js as the javascript framework because I feel like they are doing something amazing with react.js. 
							It is server side rendering by default, but it gives plenty options to do client side render for components and rendering speed is 
							always optimized. I am using my ui-component as a git submodule instead of using it as a node package because I don't need to deal 
							with the whole packaging the project thing, it just works.</p>
						<p>For the CI and CD, I set up two different pipelines in Netlify, one to build and deploy the portfolio site, the other one to build 
							and deploy the storybook documentation site. Anytime a commit happen in the storybook repo's main branch will trigger a deployment 
							in both pipelines. My domain registray is Squarespace, but it was Google Domain before it was sold to Squarespace. It is really 
							easy to set up the custom domain in Netlify and the hosting is free for personal projects. Super happy with their service.</p>
						<p>There is really no backend for my portfolio site. The only thing is a contact form. For that, I am using Google sheet, I made 
							an ActionScript based on this repo: https://github.com/jamiewilson/form-to-google-sheets. Super easy to set up. To hide the 
							actual form api endpoint, I created a route handler in the nextjs app, take in the form data as is and submit it straight to 
							the google sheet. Since this is handled on the server side, the Google sheet Actionscript api endpoint is not exposed in 
							the network traffic. Obviously, the url is put in an env file which is handled by the Netlify's environment variable feature 
							in the build process so it is committed in the source control.</p>
						<h4>Coming up</h4>
						<ul>
							<li>Automated testing, I am planning to set up jest testing framework in my code.</li>
							<li>Husky, integrating husky in my workflow so that I cannot commit unless some of the basic stuff is covered, like lint doesn't repo any error, automated tests passed, etc.</li>
							<li>Add more projects to the experiences page.</li>
							<li>Refine the homepage, I am thinking about using grid in the sections.</li>
							<li>Provide a better user experience on mobile.</li>
						</ul>
					</div>
					<div className="project-container">
						<h3>UI Component</h3>
						<p>Check out my <a href={PATH_STORYBOOK} target="_blank">component library</a> in progress.</p>
					</div>
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
