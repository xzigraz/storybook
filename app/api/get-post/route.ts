import { POST_PROJECTION } from "@/constants/queries";

export async function POST(request: Request) {
	if (!process.env.WORDPRESS_GRAPHQL_URL && process.env.WORDPRESS_GRAPHQL_URL !== "") {
		throw new Error("WordPress GraphQL URL not defined.");
	}

	const slug = await request.json();

	const query = `query GetPostBySlug ($slug: String!) {
		postBy (slug: $slug) {
			${POST_PROJECTION}
		}
	}`

	try {
		const res = await fetch(`${process.env.WORDPRESS_GRAPHQL_URL}/graphql`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, variables: slug })
		});

		return res;
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}

}