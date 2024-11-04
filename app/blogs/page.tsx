import { MainLayout } from "@/ui-component/Layout/mainLayout";

async function getPosts() {
	if (!process.env.SERVER_BASE_URL || process.env.SERVER_BASE_URL === "") {
		throw new Error("Server base url is not defined.");
	}

	let res = await fetch(`${process.env.SERVER_BASE_URL}/api/get-posts`, {
		method: "POST"
	});

	let posts = await res.json();

	if (!posts) {
		return [];
	}

	console.log(posts?.data?.pages?.edges);

	return posts?.data?.pages?.edges;
}

const BlogsPage = async () => {
	let posts = await getPosts();

	return <MainLayout>
		<>
			<h1>Test</h1>
			{posts.length > 0 && posts.map(post => <div key={post.id}>
				<h2>{post?.node?.title}</h2>
				<div dangerouslySetInnerHTML={{__html: post?.node?.content}}/>
			</div>)}
		</>
	</MainLayout>
}

export default BlogsPage;