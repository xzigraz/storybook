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
			<SectionLayout className="about-me husband">
				<>
					<h2><span className="material-symbols-outlined">join</span>Husband</h2>
					<p></p>
				</>
			</SectionLayout>
			<SectionLayout className="about-me father">
				<>
					<h2><span className="material-symbols-outlined">baby_changing_station</span>Father</h2>
				</>
			</SectionLayout>
			<SectionLayout className="about-me engineer">
				<>
					<h2><span className="material-symbols-outlined">code</span>Front-End Engineer</h2>
				</>
			</SectionLayout>
			<SectionLayout className="about-me fishkeeper">
				<>
					<h2><span className="material-symbols-outlined">pets</span>Fish Keeper</h2>
				</>
			</SectionLayout>
			<SectionLayout className="about-me gamer">
				<>
					<h2><span className="material-symbols-outlined">videogame_asset</span>Gamer</h2>
				</>
			</SectionLayout>
			<SectionLayout className="about-me knowledge">
				<>
					<h2><span className="material-symbols-outlined">explore</span>Explorer</h2>
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
