import { fetchPost, fetchSlugs } from "@/lib/posts";

export async function POST() {
	try {
		const slugs = await fetchSlugs();

		const parsed = await Promise.all(slugs.map(slug => fetchPost(slug)));
		const posts = parsed
			.filter((post): post is NonNullable<typeof post> => post !== null)
			.map(post => post.summary);

		return Response.json({ posts });
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}
}
