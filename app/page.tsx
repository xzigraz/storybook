'use client';

import { useRef } from "react";
import "./_homepage.page.scss";
import Daniel from "@/assets/images/daniel.webp";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Wife from "@/assets/images/wife.webp";
import Kids from "@/assets/images/kids.webp";
import Classroom from "@/assets/images/dma-classroom.webp";
import FishTank from "@/assets/images/fish-tank.webp";
import Games from "@/assets/images/games.webp";
import NCC1701D from "@/assets/images/ncc-1701-d.webp";
import clsx from "clsx";
import isRefInView from "@/ui-component/CheckInview/checkIsInview";
import Link from "next/link";
import { PATH_CONTACT, PATH_FRONT_END_DEVELOPMENT_LEADER, PATH_LINKEDIN, PATH_RESUME } from "@/constants/paths";

export default function Home() {
	const husbandRef = useRef<HTMLDivElement>(null);
	const fatherRef = useRef<HTMLDivElement>(null);
	const engineerRef = useRef<HTMLDivElement>(null);
	const fishkeeperRef = useRef<HTMLDivElement>(null);
	const gamerRef = useRef<HTMLDivElement>(null);
	const explorerRef = useRef<HTMLDivElement>(null);

	return <MainLayout className="homepage">
		<>
			<SectionLayout className="hero-panel">
				<>
					<div className="portrait-container">
						<img src={Daniel.src} alt="Daniel Zhu" title="Person who owns this website." />
						<h1>Who is Daniel?</h1>
					</div>
					<div className="scrolling-indicator">
						<span className="dot" />
					</div>
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me engineer align-left", isRefInView(engineerRef) && "section-in-view")} ref={engineerRef}>
				<>
					<h2><span className="material-symbols-outlined">code</span>Front-End Development Leader</h2>
					<h3>Strong hands-on engineer and Experienced people manager</h3>
					<p>That is my classroom; it hasn't changed much. My field of study was Digital Media Art, and our course required us to
						present our projects on a page hosted by the school. In the early 2000s, information as art is the thing, and we created
						art used mediums like Arduino boards, breadboards, sensors, HTML, CSS, and ActionScript. That's how everything started for me.</p>
					<p className="mb-40">For the past 17 years, equipped with the most valuable lesson I learned from my program—critical thinking—I have been honing
						my skills and learning from peers and mentors across various companies. Finally, over the last three years, I have had the
						opportunity to mentor others and give back. <Link href={PATH_FRONT_END_DEVELOPMENT_LEADER} className="read-more">Read More <span className="material-symbols-outlined">chevron_right</span></Link></p>
					<img src={Classroom.src} alt="Digital Media Art Classroom" title="The classroom look the same after I graduated for 17 years." />
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me fishkeeper align-right", isRefInView(fishkeeperRef) && "section-in-view")} ref={fishkeeperRef}>
				<>
					<h2><span className="material-symbols-outlined">pets</span>Fish Keeper</h2>
					<p>This is my older kid's aquarium, I have been keeping it since the start of the COVID-19 pandemic. With the help from Youtube
						channels like <a href="https://www.youtube.com/@FootheFlowerhorn" target="_blank">Foo the Flowerhorn</a>, <a href="https://www.youtube.com/@MDFishTanks" target="_blank">
							MD Fish Tanks</a>, <a href="https://www.youtube.com/@SerpaDesign" target="_blank">SerpaDesign</a>, <a href="https://www.youtube.com/@AquariumCoop" target="_blank">
							Aquarium Co-op</a>, <a href="https://www.youtube.com/@PrimeTimeAquatics" target="_blank">Prime Time Aquatics</a>, as well as <a href="https://aquariumplantlab.com/" target="_blank">
							Auqarium Plant Lab</a>, and the <a href="https://www.youtube.com/@FootheFlowerhorn" target="_blank">r/Aquariums</a>, I was
						able to create a little ecosystem here and Snails are the most thriving!</p>
					<img src={FishTank.src} alt="Planted Freshwater Aquarium" title="A 20 gallon planted freshwater aquarium with a sustainable ecosystem." />
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me gamer align-left", isRefInView(gamerRef) && "section-in-view")} ref={gamerRef}>
				<>
					<h2><span className="material-symbols-outlined">videogame_asset</span>Gamer</h2>
					<p>I enjoy playing video games, but I only play when I have a lot of free time. That's why I played World of
						Warcraft for over 14 years since its release then stopped. I just don't have the time anymore. I am also
						playing Eve Online, mostly just training skills because I can set it and forget it, It'll continue when I
						am not online.</p>
					<p>These days, time is a valuable commodity, so no games, but I do miss it.</p>
					<img src={Games.src} alt="Games I used to play" title="Eve online as the back drop, we have Ultima Online, WOW, Final Fantasy XI Online, and Witcher 3." />
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me explorer align-right", isRefInView(explorerRef) && "section-in-view")} ref={explorerRef}>
				<>
					<h2><span className="material-symbols-outlined">explore</span>Explorer</h2>
					<p>My favorite thing is Star Trek. I learned English watching Star Trek series when I first came to the United States. High school
						was great and all, but Star Trek taught me the most. I was like Data, learning how to act like a human being in a new country.
						And Star Trek inspired me to be an explorer, because that is Star Fleet's mission.</p>
					<p>I am learning computer fundamental, aquarscaping, botanic, Physics, and LLM at the moment. I have some thoughts on the current
						state of "Artificial Intelligence".</p>
					<p>There is an infinite amount of knowledge out there, but a person's life is finite. It is impossible for any individual or group
						to be experts in everything, and that's where LLMs can help. If done right, LLMs can digest vast amounts of knowledge and
						provide the information I need when I need it. While I don't believe we have achieved true AI yet, I think what we have is
						a step in the right direction. We probably don't want general generative AI trained on the entire internet, but we do want
						RAG (Retrieval-Augmented Generation) generative AI, and that's where the future lies. As many software engineers say,
						"garbage in, garbage out," which highlights the importance of quality data in developing effective AI.<span>*</span></p>
					<p><span>*</span> <em>I used Microsoft Copilot to help me write the above sentence better.</em></p>
					<img src={NCC1701D.src} alt="Enterprise NCC-1701-D" title="Star fleet Enterprise starship embark on a mission to explore." />
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me father align-right", isRefInView(fatherRef) && "section-in-view")} ref={fatherRef}>
				<>
					<h2><span className="material-symbols-outlined">baby_changing_station</span>Father</h2>
					<p>These are my kids, and they are my proudest achievements. There are so many horrored stories on the internet about parenthood,
						but I feel like it is a personal thing. Yes, it is not for the faint of heart, but one's heart is filled
						a bit more each day.</p>
					<p>People tell me I am ready when I ask myself, "What if I mess up?" It was 9 years ago, I feel pretty good so far.</p>
					<img src={Kids.src} alt="Kids" title="Two beautiful children." />
				</>
			</SectionLayout>
			<SectionLayout className={clsx("about-me husband align-left", isRefInView(husbandRef) && "section-in-view")} ref={husbandRef}>
				<>
					<h2><span className="material-symbols-outlined">join</span>Husband</h2>
					<p>This is my wife. We have been together for 21 years and I am looking forward to waking up next to her each day.</p>
					<img src={Wife.src} alt="Wife" title="A stunning woman." />
				</>
			</SectionLayout>
			<SectionLayout className="about-me plug-for-myself">
				<>
					<p>Like what you see so far? Let's talk and see what I can help you with! Here's
						my <Link href={PATH_RESUME} rel="noopener noreferrer" target="_blank">resume</Link>,
						and my <a href={PATH_LINKEDIN}>LinkedIn</a>, you can also reach me via the <Link href={PATH_CONTACT}>contact</Link> page.</p>
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
