import "./_homepage.page.scss";
import Daniel from "@/assets/images/daniel.webp";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Nav from "@/components/nav";

export default function Home() {
	return <MainLayout className="homepage">
		<>
			<Nav/>
			<SectionLayout className="hero-panel" height="100vh">
				<>
					<div className="portrait-container">
						<img src={Daniel.src} alt="Daniel Zhu" title="Person who owns this website." />
						<h1>Who is Daniel?</h1>
					</div>
				</>
			</SectionLayout>
			{/* <SectionLayout className="about me">
				<>
					<h2>Resume</h2>
				</>
			</SectionLayout> */}
		</>
	</MainLayout>;
}
