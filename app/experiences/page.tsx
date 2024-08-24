import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Nav from "@/components/nav";

export default function Experiences() {
	return <MainLayout className="experiences">
		<>
			<Nav/>
			<SectionLayout>
				<>
					<h1>Experiences</h1>
					<a href="https://storybook.thedepartedonline.com">UI Component Storybook</a>
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
