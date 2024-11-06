import { PATH_BLOGS } from "@/constants/paths";
import { POST, POST_BY_DATA } from "@/constants/queries";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Link from "next/link";

async function getPost(slug: string) {
	if (!process.env.SERVER_BASE_URL || process.env.SERVER_BASE_URL === "") {
		throw new Error("Server base url is not defined.");
	}

	const res = await fetch(`${process.env.SERVER_BASE_URL}/api/get-post`, {
		method: "POST",
		body: JSON.stringify({ slug })
	});

	const data: POST_BY_DATA = await res.json();

	if (!data || !data.data.postBy) {
		return null;
	}

	return data.data.postBy;
}
const BlogPage = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;
	const post: POST | null = await getPost(slug);

	const formateDate = (date: string) => {
		return new Date(date).toLocaleDateString();
	}

	return <MainLayout className="peach-white">
		<>
			<SectionLayout>
				<>
					<div className="back-container">
						<Link href={PATH_BLOGS}><span className="material-symbols-outlined">chevron_left</span> Back</Link>
					</div>
					{post && <>
						<h1>{post.title}</h1>
						<p>{formateDate(post.date)}</p>
						<div dangerouslySetInnerHTML={{ __html: post.content }} />
					</>}
				</>
			</SectionLayout>
		</>
	</MainLayout>
}

export default BlogPage;