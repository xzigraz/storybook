import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import { PATH_STORYBOOK } from "@/constants/paths";
import "./_experiences.page.scss";

export default function Experiences() {
	return <MainLayout className="experiences peach-white">
		<>
			<SectionLayout>
				<>
					<h1>Experiences</h1>
					<p>Under construction, meanwhile, checkout my <a href={PATH_STORYBOOK} target="_blank">component library</a> in progress.</p>
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
