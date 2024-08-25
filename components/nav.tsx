import Link from "next/link";
import Logo from "@/assets/images/thedeparted-logo.png";
import { PATH_CONTACT, PATH_EXPERIENCES, PATH_HOME } from "@/constants/paths";

const Nav = () => {
	return <nav>
		<Link href={PATH_HOME}><img src={Logo.src} /></Link>
		<ul>
			<li>
				<Link href={PATH_HOME}>About</Link>
			</li>
			<li>
				<Link href={PATH_EXPERIENCES}>Experiences</Link>
			</li>
			<li>
				<Link href={PATH_CONTACT}>Contact</Link>
			</li>
		</ul>
	</nav>
}

export default Nav;