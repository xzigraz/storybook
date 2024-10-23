export async function POST(request: Request) {
	if (!process.env.WORKER_AI_API_URL || !process.env.WORKER_AI_ACCOUNT_ID || !process.env.WORKER_AI_API_TOKEN) {
		throw new Error("Cloudflare Workers AI account id and api token are missing.");
	}

	const prompt = await request.json();
	let model = "google/gemma-7b-it-lora";

	if (prompt?.prompt && (prompt.prompt.toLowerCase().includes("generating an image") || prompt.prompt.toLowerCase().includes("generate an image"))) {
		model = "black-forest-labs/flux-1-schnell";
	} else {
		prompt.prompt += " Wrap html p tag around sentences.";
	}

	try {
		const res = await fetch(`${process.env.WORKER_AI_API_URL}${process.env.WORKER_AI_ACCOUNT_ID}/ai/run/@cf/${model}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.WORKER_AI_API_TOKEN}`
			},
			body: JSON.stringify(prompt)
		});
		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}
}