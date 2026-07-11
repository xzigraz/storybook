/**
 * @jest-environment node
 */
import { POST } from "./route";

const originalEnv = process.env;

const makeRequest = (body: unknown) =>
	new Request("http://localhost/api/generate", {
		method: "POST",
		body: JSON.stringify(body),
	});

beforeEach(() => {
	process.env = {
		...originalEnv,
		WORKER_AI_API_URL: "https://api.cloudflare.com/client/v4/accounts/",
		WORKER_AI_ACCOUNT_ID: "acct-123",
		WORKER_AI_API_TOKEN: "token-abc",
	};
	global.fetch = jest.fn();
});

afterEach(() => {
	process.env = originalEnv;
	jest.resetAllMocks();
});

describe("POST /api/generate", () => {
	it("uses the text model and appends the html hint for a text prompt", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ result: { response: "generated text" } }),
		});

		const res = await POST(makeRequest({ prompt: "Generating five paragraphs" }));
		const data = await res.json();

		expect(data).toEqual({ result: { response: "generated text" } });
		const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
		expect(url).toBe(
			"https://api.cloudflare.com/client/v4/accounts/acct-123/ai/run/@cf/google/gemma-7b-it-lora"
		);
		expect(JSON.parse(options.body).prompt).toBe(
			"Generating five paragraphs Wrap html p tag around sentences."
		);
	});

	it("uses the image model when the prompt mentions generating an image", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ result: { image: "base64data" } }),
		});

		const res = await POST(makeRequest({ prompt: "Please start Generate an image of a cat" }));
		const data = await res.json();

		expect(data).toEqual({ result: { image: "base64data" } });
		const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
		expect(url).toContain("black-forest-labs/flux-1-schnell");
		expect(JSON.parse(options.body).prompt).toBe("Please start Generate an image of a cat");
	});

	it("throws when Workers AI env vars are missing", async () => {
		delete process.env.WORKER_AI_API_TOKEN;

		await expect(POST(makeRequest({ prompt: "hello" }))).rejects.toThrow(
			"Cloudflare Workers AI account id and api token are missing."
		);
	});

	it("returns a 500 response when the fetch fails", async () => {
		(global.fetch as jest.Mock).mockRejectedValue(new Error("network down"));

		const res = await POST(makeRequest({ prompt: "hello" }));

		expect(res.status).toBe(500);
		const data = await res.json();
		expect(data).toEqual({ error: "An error occurred during the request" });
	});
});
