/**
 * @jest-environment node
 */
import { POST } from "./route";
import { fetchPost } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

jest.mock("@/lib/posts");
jest.mock("@/lib/markdown");

const mockedFetchPost = fetchPost as jest.Mock;
const mockedMarkdownToHtml = markdownToHtml as jest.Mock;

const makeRequest = (slug: string) =>
	new Request("http://localhost/api/get-post", {
		method: "POST",
		body: JSON.stringify({ slug }),
	});

afterEach(() => {
	jest.resetAllMocks();
});

describe("POST /api/get-post", () => {
	it("returns the post with its markdown body converted to HTML", async () => {
		mockedFetchPost.mockResolvedValue({
			summary: { slug: "a-post", title: "A Post", date: "2024-01-01", snippet: "..." },
			body: "**bold**",
		});
		mockedMarkdownToHtml.mockResolvedValue("<p><strong>bold</strong></p>");

		const res = await POST(makeRequest("a-post"));
		const data = await res.json();

		expect(mockedMarkdownToHtml).toHaveBeenCalledWith("**bold**");
		expect(data.post).toEqual({
			slug: "a-post",
			title: "A Post",
			date: "2024-01-01",
			snippet: "...",
			content: "<p><strong>bold</strong></p>",
		});
	});

	it("returns a null post when the slug can't be resolved", async () => {
		mockedFetchPost.mockResolvedValue(null);

		const res = await POST(makeRequest("missing"));
		const data = await res.json();

		expect(data).toEqual({ post: null });
		expect(mockedMarkdownToHtml).not.toHaveBeenCalled();
	});

	it("returns a 500 response when fetchPost throws", async () => {
		mockedFetchPost.mockRejectedValue(new Error("CMS raw base URL is not defined."));

		const res = await POST(makeRequest("a-post"));

		expect(res.status).toBe(500);
		const data = await res.json();
		expect(data).toEqual({ error: "An error occurred during the request" });
	});
});
