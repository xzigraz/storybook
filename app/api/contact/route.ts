import { FormType } from "@/app/contact/page";

export async function POST(request: Request) {
	if (!process.env.GOOGLE_FORM_ID) {
		throw new Error("Google Form ID is not defined in environment variables.");
	}

	const formData: FormType = await request.json();
	const body = new FormData();

	if (!formData || !formData.Name || !formData.Email) {
		throw new Error("Invalid form data. Required fields are missing.");
	}

	Object.entries(formData).forEach(([key, value]) => body.append(key, value));

	try {
		const res = await fetch(process.env.GOOGLE_FORM_ID, {
			method: "POST",
			body: body
		});
		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}
}