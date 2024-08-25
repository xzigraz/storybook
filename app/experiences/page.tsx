import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Nav from "@/components/nav";
import { PATH_STORYBOOK } from "@/constants/paths";
import Footer from "@/components/footer";

export default function Experiences() {
	return <>
		<Nav />
		<MainLayout className="experiences">
			<>
				<SectionLayout>
					<>
						<h1 style={{marginTop: "100px"}}>Experiences</h1>
						<p>Under construction, meanwhile, checkout my <a href={PATH_STORYBOOK} target="_blank">component library</a> in progress.</p>
					</>
				</SectionLayout>
			</>
		</MainLayout>
		<Footer />
	</>;
}
