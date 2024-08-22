import Link from "next/link";
import Logo from "@/assets/images/thedeparted-logo.png";

const Nav = () => {
	return <nav>
		<Link href="/"><img src={Logo.src} /></Link>
		<ul>
			<li>
				<Link href="/">About</Link>
			</li>
			<li>
				<Link href="/projects">Projects</Link>
			</li>
			<li>
				<Link href="/contact">Contact</Link>
			</li>
		</ul>
	</nav>
}

export default Nav;