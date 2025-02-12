"use client";

import { PATH_EXPERIENCES } from "@/constants/paths";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import "./../_experiences.page.scss";
import Link from "next/link";
import InxeptionDotComHomepage from "@/assets/images/inxeption-com/inxeption-com-homepage.webp";
import InxeptionDotComManagedStoreOne from "@/assets/images/inxeption-com/inxeption-com-managed-store-1.webp";
import InxeptionDotComManagedStoreTwo from "@/assets/images/inxeption-com/inxeption-com-managed-store-2.webp";
import InxeptionDotComManagedStoreThree from "@/assets/images/inxeption-com/inxeption-com-managed-store-3.webp";
import InxeptionDotComManagedStoreFour from "@/assets/images/inxeption-com/inxeption-com-managed-store-4.webp";
import InxeptionDotComManagedStoreFive from "@/assets/images/inxeption-com/inxeption-com-managed-store-5.webp";
import InxeptionDotComPricing from "@/assets/images/inxeption-com/inxeption-com-pricing.webp";
import InxeptionDotComProductDetails from "@/assets/images/inxeption-com/inxeption-com-product-details.webp";
import InxeptionDotComBlog from "@/assets/images/inxeption-com/inxeption-com-blog.webp";
import { useState } from "react";

type Screenshot = {
	name: string,
	file: {
		src: string
	}
}

const Screenshots: Screenshot[] = [
	{
		name: "homepage",
		file: InxeptionDotComHomepage
	},
	{
		name: "managed-store-1",
		file: InxeptionDotComManagedStoreOne
	},
	{
		name: "managed-store-2",
		file: InxeptionDotComManagedStoreTwo
	},
	{
		name: "managed-store-3",
		file: InxeptionDotComManagedStoreThree
	},
	{
		name: "managed-store-4",
		file: InxeptionDotComManagedStoreFour
	},
	{
		name: "managed-store-5",
		file: InxeptionDotComManagedStoreFive
	},
	{
		name: "pricing",
		file: InxeptionDotComPricing
	},
	{
		name: "product-details",
		file: InxeptionDotComProductDetails
	},
	{
		name: "blog",
		file: InxeptionDotComBlog
	},
]

const InxeptionDotComProjectPage = () => {
	const [imageIndex, setImageIndex] = useState<number | null>(null);
	const closeImage = () => {
		setImageIndex(null);
	}
	const enlargeImage = (index: number) => {
		setImageIndex(index);
	}
	return <>
		<MainLayout className="experiences peach-white">
			<>
				<SectionLayout>
					<>
						<div className="back-container">
							<Link href={PATH_EXPERIENCES}><span className="material-symbols-outlined">chevron_left</span> Back</Link>
						</div>
						<h1>inxeption.com</h1>
						<p>Inxeption is the Industrial Commerce SuperApp. Its secure and scalable cloud-based digital commerce platform brings capital,
							data, products, and services on-demand for Industrial and supply chain businesses. Companies of any size in any industry can
							drive more sales, gain operational visibility and realize cost savings. Inxeption Commerce Partners enjoy access to sell
							products on the Inxeption B2B marketplace and to develop new online commerce channels, as well as valuable applications that
							simplify and streamline logistics and other operations.</p>
						<p>inxeption.com is the cumulation of all the service offerings from the platform, from digitizing products, multiple sales channels,
							fulfillment, finance, and lead generation. I have lead a team of engineers working on the site over the past two years to iterate
							on the design, messaging, and functionalties.</p>
						<h4>Tech stack</h4>
						<ul>
							<li>Front-End: next.js, scss, typescript, ssr</li>
							<li>Build: jenkins, docker, ECR, kubernetes, terraform, and argoCD</li>
							<li>Backend: next.js route handler, graphql</li>
						</ul>
						<h4>Screenshots</h4>
						<div className="screenshots-container">
							{Screenshots.map((screenshot, index) => <img
								src={screenshot.file.src}
								key={screenshot.name}
								alt={screenshot.name}
								onClick={() => enlargeImage(index)} />)}
						</div>
					</>
				</SectionLayout>
			</>
		</MainLayout>
		<dialog open={imageIndex !== null}>
			<button type="button" className="close-button" onClick={() => closeImage()}>
				<span className="material-symbols-outlined">close</span>
			</button>
			{imageIndex !== null && <img src={Screenshots[imageIndex].file.src} alt={Screenshots[imageIndex].name} />}
		</dialog>
		<div className="modal-mask" onClick={() => closeImage()} />
	</>
}

export default InxeptionDotComProjectPage;