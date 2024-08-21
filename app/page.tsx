import { MainLayout } from "@/ui-component/Layout/mainLayout";
import Link from "next/link";
import Logo from "@/app/assets/images/icon.png";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";

export default function Home() {
	return <MainLayout>
		<>
			<nav>
				<Link href="/"><img src={Logo.src} /></Link>
				<ul>
					<li>
						<Link href="#">About</Link>
					</li>
					<li>
						<Link href="#">Projects</Link>
					</li>
					<li>
						<Link href="#">Contact</Link>
					</li>
				</ul>
			</nav>
			<SectionLayout>
				<>
					<h1>Daniel</h1>
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
