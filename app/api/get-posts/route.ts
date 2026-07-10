import { POST_SUMMARY } from "@/constants/posts";

export async function POST() {
	if (!process.env.CMS_RAW_BASE_URL) {
		throw new Error("CMS raw base URL is not defined.");
	}

	try {
		const res = await fetch(`${process.env.CMS_RAW_BASE_URL}/posts.json`);

		if (!res.ok) {
			return Response.json({ posts: [] });
		}

		const posts: POST_SUMMARY[] = await res.json();

		return Response.json({ posts });
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}
}
