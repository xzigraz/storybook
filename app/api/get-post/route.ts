import { fetchPost } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import type { POST as POST_TYPE } from "@/constants/posts";

export async function POST(request: Request) {
	const { slug } = await request.json();

	try {
		const parsed = await fetchPost(slug);

		if (!parsed) {
			return Response.json({ post: null });
		}

		const content = await markdownToHtml(parsed.body);
		const post: POST_TYPE = { ...parsed.summary, content };

		return Response.json({ post });
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}
}
