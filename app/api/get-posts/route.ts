import { POST_PROJECTION } from "@/constants/queries";

export async function POST() {
	if (!process.env.WORDPRESS_GRAPHQL_URL && process.env.WORDPRESS_GRAPHQL_URL !== "") {
		throw new Error("WordPress GraphQL URL not defined.");
	}

	const query = `query {
		posts {
			nodes {
				${POST_PROJECTION}
			}
		}
	}`

	try {
		const res = await fetch(`${process.env.WORDPRESS_GRAPHQL_URL}/graphql`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		});

		return res;
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}

}