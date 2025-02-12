import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import { getExperience, PATH_ATS_SAFE_LONG_RESUME, PATH_RESUME } from "@/constants/paths";
import "./_experiences.page.scss";
import Link from "next/link";
import type { Metadata } from "next";
import { Projects } from "@/constants/projects";

export const metadata: Metadata = {
	title: "Experiences and Projects | The Departed Online",
	description: "Showcasing my experiences, projects over the time. The current project is this porfolio site, I will discuss why I did it, how I did it, and what I am going to do next.",
};

export default function Experiences() {
	return <MainLayout className="experiences peach-white">
		<>
			<SectionLayout>
				<>
					<h1>Experiences</h1>
					<p>Here are my resumes, <Link href={PATH_RESUME}>nice looking one</Link>, <Link href={PATH_ATS_SAFE_LONG_RESUME}>ATS safe version</Link>.</p>
					<p>If you want to get in touch with me, use the contact page. <span className="material-symbols-outlined get-in-touch">touch_app</span></p>
				</>
			</SectionLayout>
			<SectionLayout>
				<>
					<h2>Projects</h2>
					{Projects.length && <div className="projects-container">
						{Projects.map(project =>
							<Link href={getExperience(project.slug)} className="project-summary" key={project.name} title={project.summary}>
								<h3>{project.label}</h3>
								<p>{project.summary}</p>
							</Link>
						)}
					</div>}
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
