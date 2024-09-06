'use client';

import Skillset, { Skill } from "@/constants/skillset";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import { Loading } from "@/ui-component/Loading/loading";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./_front.end.development.leader.page.scss";

interface skillCategory {
	category: string
	label: string
	items: Skill[]
}

const SkillsetCanvas = dynamic(() => import("@/components/skillset"), {
	loading: () => <Loading style="rotate" />,
	ssr: false
});

/**
 * TODO: On viewport resize, recalculate the content width and then rerender the force graph.
 */
const FrontEndDevelopmentLeader = () => {
	const [skills, setSkills] = useState<skillCategory[]>([]);
	const [contentWidth, setContentWidth] = useState<number>(0);
	const mainSectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const skills: skillCategory[] = [];
		Skillset.listData.forEach(skill => {
			const existingCategoryIndex = skills.findIndex(item => item.category === skill.category);
			if (existingCategoryIndex !== -1) {
				skills[existingCategoryIndex].items.push(skill)
			} else {
				const items: Skill[] = [];
				if (skill.id !== skill.category) {
					items.push(skill);
				}
				const newCategory: skillCategory = { category: skill.category, label: skill.label, items: items };
				skills.push(newCategory);
			}
		})

		if (mainSectionRef.current) {
			setContentWidth(mainSectionRef.current.getBoundingClientRect().width);
		}

		setSkills(skills.sort((skillA, skillB) => 
			skillA.items.length > skillB.items.length 
				? -1 
				: skillA.items.length < skillB.items.length 
					? 1 
					: 0
		));
	}, []);


	return <>
		<MainLayout className="front-end-development-leader peach-white">
			<>
				<SectionLayout ref={mainSectionRef}>
					<>
						<div className="back-container">
							<Link href="/"><span className="material-symbols-outlined">chevron_left</span> Back</Link>
						</div>
						<h1>Front End Development Leader</h1>
						<h3>Strong hands-on engineer and Experienced people manager</h3>
						<p>That is my classroom; it hasn't changed much. My field of study was Digital Media Art, and our course required us to
							present our projects on a page hosted by the school. In the early 2000s, information as art is the thing, and we created
							art used mediums like Arduino boards, breadboards, sensors, HTML, CSS, Javascript, and ActionScript. That's how everything
							started for me.</p>
						<p>For the past 17 years, equipped with the most valuable lesson I learned from my program—critical thinking—I have been honing
							my skills and learning from peers and mentors across various companies. Finally, over the last three years, I have had the
							opportunity to mentor others and give back.</p>
						<p>My last position was at Inxeption. It is a B2B ecommerce platform that lasted seven years. I was the number ten hire and we
							grew to about 250 employees at its peak. I get to experience a business go from a small business to a mature medium sized
							business. That's where I got the majority of my cross functional team cooperation experiences from. I had to work with a
							lot of teams because my expertise with the platform is valued by people. My name would pop up in a lot of conversations.
							It was an honor to be like that person, but at the same time it is bad for the business because we need redundancy, so I
							do as much as possible to share the knowledge I possess.</p>
						<p>I was hired as Senior front end development engineer, working with a designer, a backend architect, and a product manager,
							we were able to have a product go into market within the first month after I joined. We signed our first client the month
							after. I lead the effect to move common css, components into another repository so we can use it as a git module in other
							applications. Over the time, we have quite a comprehensive list of components and css that are used in various applications
							in the platform. It was truly a fun experience because I am doing what I enjoyed and was supported by my teammates. We
							learned to optimize code to make it performant, learned to use d3 library, and highcharts to make graphs and charts, fine
							tuned our internal toolings so that deployment doesn't need to be handled manually. We were able to deploy an application
							to a new server with a few clicks in a management app that was developed using our common component library and the
							internal tooling we created.</p>
						<p>Almost three years ago, I was promoted to director, front end development. I was already leading a small team locally
							before that, mentoring the junior developers, doing code reviews, and making sure knowledge is spread out in the
							product organization. After my promotion, I officially led the team in the United States and another team offshore.
							During the time at Inxeption, I worked on six different applications including inxeption.com, we used react, nextjs,
							graphql, sass, and various open source software as our main tech stack.</p>
					</>
				</SectionLayout>
				<SectionLayout>
					<>
						<h2>Skillset</h2>
						<p>These are the skills I use almost everyday to solve interesting challenges.</p>
						{skills.length > 0 && <div className="skills-container mb-40">
							{skills?.map(skill => {
								return <dl key={skill.category}>
									<dt>
										{skill.label}
									</dt>
									{skill.items.map(item => <dd key={item.id}>{item.label}</dd>)}
								</dl>
							})}
						</div>}
						<p>A forced graph for everything software development:</p>
						<SkillsetCanvas contentWidth={contentWidth} />
					</>
				</SectionLayout>
			</>
		</MainLayout>
	</>
}

export default FrontEndDevelopmentLeader;