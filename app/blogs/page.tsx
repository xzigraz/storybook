import { POST_SUMMARY } from "@/constants/posts";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import "./_blog.page.scss";
import Link from "next/link";
import { getBlogPost } from "@/constants/paths";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Blog | The Departed Online",
	description: "A blog section where the content is coming from a headless CMS. I write about my job search journey, and anything interests me.",
};

const getPosts = async () => {
	if (!process.env.SERVER_BASE_URL || process.env.SERVER_BASE_URL === "") {
		throw new Error("Server base url is not defined.");
	}

	const res = await fetch(`${process.env.SERVER_BASE_URL}/api/get-posts`, {
		method: "POST"
	});

	const data: { posts: POST_SUMMARY[] } = await res.json();

	if (!data || !data.posts || data.posts.length < 1) {
		return [];
	}

	return data.posts;
}

const BlogsPage = async () => {
	const posts: Array<POST_SUMMARY> = await getPosts();

	return <MainLayout className="blog-page peach-white">
		<>
			<SectionLayout>
				<>
					<h1>Blog</h1>
					{posts.length > 0 && <div className="posts">
						{posts.map(post => <Link href={getBlogPost(post.slug)} className="post" key={post.slug}>
							<h2>{post.title}</h2>
							<p>{post.excerpt}</p>
							<p className="read-more">Read More <span className="material-symbols-outlined">chevron_right</span></p>
						</Link>)}
					</div>}
				</>
			</SectionLayout>
		</>
	</MainLayout>
}

export default BlogsPage;
