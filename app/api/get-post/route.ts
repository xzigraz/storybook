import { markdownToHtml } from "@/lib/markdown";
import type { POST as POST_TYPE, POST_SUMMARY } from "@/constants/posts";

export async function POST(request: Request) {
	if (!process.env.CMS_RAW_BASE_URL) {
		throw new Error("CMS raw base URL is not defined.");
	}

	const { slug } = await request.json();

	try {
		const [summariesRes, markdownRes] = await Promise.all([
			fetch(`${process.env.CMS_RAW_BASE_URL}/posts.json`),
			fetch(`${process.env.CMS_RAW_BASE_URL}/posts/${slug}.md`)
		]);

		if (!summariesRes.ok || !markdownRes.ok) {
			return Response.json({ post: null });
		}

		const summaries: POST_SUMMARY[] = await summariesRes.json();
		const summary = summaries.find(candidate => candidate.slug === slug);

		if (!summary) {
			return Response.json({ post: null });
		}

		const markdown = await markdownRes.text();
		const content = await markdownToHtml(markdown);

		const post: POST_TYPE = { ...summary, content };

		return Response.json({ post });
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}
}
