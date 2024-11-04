export async function POST() {
	if (!process.env.WORDPRESS_GRAPHQL_URL && process.env.WORDPRESS_GRAPHQL_URL !== "") {
		throw new Error("WordPress GraphQL URL not defined.");
	}

	const query = `query {
		pages {
			edges {
				node {
					id,
					title,
					content
				}
			}
		}
	}`

	try {
		const res = await fetch(`${process.env.WORDPRESS_GRAPHQL_URL}/graphql`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({query})
		});

		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}

}