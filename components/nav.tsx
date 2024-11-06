'use client';

import { useState } from "react";
import Link from "next/link";
import Logo from "@/assets/images/thedeparted-logo.png";
import { PATH_BLOGS, PATH_CONTACT, PATH_EXPERIENCES, PATH_HOME } from "@/constants/paths";
import clsx from "clsx";

const Nav = () => {
	const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

	return <nav>
		<Link href={PATH_HOME}><img src={Logo.src} /></Link>
		<button 
			type="button" 
			className={clsx("material-symbols-outlined", isNavOpen && "nav-open")} 
			onClick={() => setIsNavOpen(!isNavOpen)}>
			{isNavOpen ? "close" : "menu"}
		</button>
		<ul>
			<li>
				<Link href={PATH_HOME}>About</Link>
			</li>
			<li>
				<Link href={PATH_EXPERIENCES}>Experiences</Link>
			</li>
			<li>
				<Link href={PATH_BLOGS}>Blog</Link>
			</li>
			<li>
				<Link href={PATH_CONTACT}>Contact</Link>
			</li>
		</ul>
	</nav>
}

export default Nav;