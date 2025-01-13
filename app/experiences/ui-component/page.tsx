import { PATH_EXPERIENCES, PATH_STORYBOOK } from "@/constants/paths"
import { MainLayout } from "@/ui-component/Layout/mainLayout"
import { SectionLayout } from "@/ui-component/Layout/sectionLayout"
import Link from "next/link"

const UIComponentProjectPage = () => {
	return <MainLayout className="experiences peach-white">
		<>
			<SectionLayout>
				<>
					<div className="back-container">
						<Link href={PATH_EXPERIENCES}><span className="material-symbols-outlined">chevron_left</span> Back</Link>
					</div>
					<h1>UI Component</h1>
					<p>Check out my <a href={PATH_STORYBOOK} target="_blank">component library</a> in progress.</p>
				</>
			</SectionLayout>
		</>
	</MainLayout>
}

export default UIComponentProjectPage;