'use client';

import { useRef } from "react";
import "./_homepage.page.scss";
import Daniel from "@/assets/images/daniel.webp";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Nav from "@/components/nav";
import Wife from "@/assets/images/wife.webp";
import Kids from "@/assets/images/kids.webp";
import clsx from "clsx";
import isRefInView from "@/ui-component/CheckInview/checkIsInview";

export default function Home() {
	const husbandRef = useRef(null);
	const fatherRef = useRef(null);
	const engineerRef = useRef(null);
	const fishkeeperRef = useRef(null);
	const gamerRef = useRef(null);
	const explorerRef = useRef(null);
	
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
			<SectionLayout className={clsx("about-me husband align-left", isRefInView(husbandRef) && "section-in-view")} ref={husbandRef}>
				<>
					<h2><span className="material-symbols-outlined">join</span>Husband</h2>
					<p>My wife and I have been together for 21 years and I am looking forward to waking up next to her each day.</p>
					<img src={Wife.src} alt="Wife" title="A stunning woman." />
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me father align-right", isRefInView(fatherRef) && "section-in-view")} ref={fatherRef} height="400px">
				<>
					<h2><span className="material-symbols-outlined">baby_changing_station</span>Father</h2>
					<p>My kids are my proudest achievements. There are so many horrored stories on the internet about parenthood, 
						but I feel like it is a personal thing. Yes, it is not for the faint of heart, but one's heart is filled 
						a bit more each day.</p>
					<p>People tell me I am ready when I ask myself, "What if I mess up?" It was 9 years ago, I feel pretty good so far.</p>
					<img src={Kids.src} alt="Kids" title="Two beautiful children." />
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me engineer align-left", isRefInView(engineerRef) && "section-in-view")} ref={engineerRef}>
				<>
					<h2><span className="material-symbols-outlined">code</span>Front-End Engineer</h2>
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me fishkeeper align-right", isRefInView(fishkeeperRef) && "section-in-view")} ref={fishkeeperRef}>
				<>
					<h2><span className="material-symbols-outlined">pets</span>Fish Keeper</h2>
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me gamer align-left", isRefInView(gamerRef) && "section-in-view")} ref={gamerRef}>
				<>
					<h2><span className="material-symbols-outlined">videogame_asset</span>Gamer</h2>
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me explorer align-right", isRefInView(explorerRef) && "section-in-view")} ref={explorerRef}>
				<>
					<h2><span className="material-symbols-outlined">explore</span>Explorer</h2>
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
