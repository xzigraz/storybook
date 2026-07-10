import { PATH_BLOGS } from "@/constants/paths";
import { POST } from "@/constants/posts";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Link from "next/link";

const getPost = async (slug: string) => {
	if (!process.env.SERVER_BASE_URL || process.env.SERVER_BASE_URL === "") {
		throw new Error("Server base url is not defined.");
	}

	const res = await fetch(`${process.env.SERVER_BASE_URL}/api/get-post`, {
		method: "POST",
		body: JSON.stringify({ slug })
	});

	const data: { post: POST | null } = await res.json();

	if (!data || !data.post) {
		return null;
	}

	return data.post;
}

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
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
