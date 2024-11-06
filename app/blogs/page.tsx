import { POST_DATA, POST } from "@/constants/queries";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import "./_blog.page.scss";
import Link from "next/link";
import { getBlogPost } from "@/constants/paths";

async function getPosts() {
	if (!process.env.SERVER_BASE_URL || process.env.SERVER_BASE_URL === "") {
		throw new Error("Server base url is not defined.");
	}

	let res = await fetch(`${process.env.SERVER_BASE_URL}/api/get-posts`, {
		method: "POST"
	});

	let data: POST_DATA = await res.json();

	if (!data || !data.data || !data.data.posts || !data.data.posts.nodes || data.data.posts.nodes.length < 1) {
		return [];
	}

	return data.data.posts.nodes;
}

const BlogsPage = async () => {
	let posts: Array<POST> = await getPosts();

	return <MainLayout className="blog-page peach-white">
		<>
			<SectionLayout>
				<>
					<h1>Blog</h1>
					{posts.length > 0 && <div className="posts">
						{posts.map(post => <Link href={getBlogPost(post.slug)} className="post" key={post.id}>
							<h2>{post.title}</h2>
							<div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
							<p className="read-more">Read More <span className="material-symbols-outlined">chevron_right</span></p>
						</Link>)}
					</div>}
				</>
			</SectionLayout>
		</>
	</MainLayout>
}

export default BlogsPage;