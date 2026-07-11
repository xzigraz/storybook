/**
 * @jest-environment node
 */
import { POST } from "./route";

const originalEnv = process.env;

const makeRequest = (body: unknown) =>
	new Request("http://localhost/api/contact", {
		method: "POST",
		body: JSON.stringify(body),
	});

beforeEach(() => {
	process.env = { ...originalEnv, GOOGLE_FORM_ID: "https://forms.example.com/submit" };
	global.fetch = jest.fn();
});

afterEach(() => {
	process.env = originalEnv;
	jest.resetAllMocks();
});

describe("POST /api/contact", () => {
	it("forwards the form data and returns the response JSON", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ result: "success" }),
		});

		const res = await POST(makeRequest({ Name: "Jane", Email: "jane@example.com" }));
		const data = await res.json();

		expect(data).toEqual({ result: "success" });
		expect(global.fetch).toHaveBeenCalledWith(
			"https://forms.example.com/submit",
			expect.objectContaining({ method: "POST" })
		);
	});

	it("throws when required fields are missing", async () => {
		await expect(POST(makeRequest({ Name: "", Email: "" }))).rejects.toThrow(
			"Invalid form data. Required fields are missing."
		);
	});

	it("throws when GOOGLE_FORM_ID is not defined", async () => {
		delete process.env.GOOGLE_FORM_ID;

		await expect(POST(makeRequest({ Name: "Jane", Email: "jane@example.com" }))).rejects.toThrow(
			"Google Form ID is not defined in environment variables."
		);
	});

	it("returns a 500 response when the fetch fails", async () => {
		(global.fetch as jest.Mock).mockRejectedValue(new Error("network down"));

		const res = await POST(makeRequest({ Name: "Jane", Email: "jane@example.com" }));

		expect(res.status).toBe(500);
		const data = await res.json();
		expect(data).toEqual({ error: "An error occurred during the request" });
	});
});
