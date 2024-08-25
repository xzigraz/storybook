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
						<h1>Experiences</h1>
						<a href={PATH_STORYBOOK} target="_blank">UI Component Storybook</a>
					</>
				</SectionLayout>
			</>
		</MainLayout>
		<Footer />
	</>;
}
