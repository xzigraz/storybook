import { PATH_HOME } from "@/constants/paths";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Link from "next/link";

const NotFound = () => {
	return <MainLayout className="peach-white">
		<>
			<SectionLayout>
				<>
					<h1>404 Not Found</h1>
					<Link href={PATH_HOME}>Return Home</Link>
				</>
			</SectionLayout>
		</>
	</MainLayout>
}

export default NotFound;