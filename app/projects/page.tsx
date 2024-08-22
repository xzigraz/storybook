import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Nav from "@/components/nav";

export default function Projects() {
	return <MainLayout className="projects">
		<>
			<Nav/>
			<SectionLayout>
				<>
					<h1>Projects</h1>
					<a href="https://storybook.thedepartedonline.com">UI Component Storybook</a>
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
