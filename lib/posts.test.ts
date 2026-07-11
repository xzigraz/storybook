import { fetchPost, fetchSlugs } from "./posts";

const originalEnv = process.env;

beforeEach(() => {
	process.env = { ...originalEnv, CMS_RAW_BASE_URL: "https://raw.example.com/cms" };
	global.fetch = jest.fn();
});

afterEach(() => {
	process.env = originalEnv;
	jest.resetAllMocks();
});

describe("fetchSlugs", () => {
	it("returns the parsed slug list on success", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ["post-a", "post-b"],
		});

		const slugs = await fetchSlugs();

		expect(slugs).toEqual(["post-a", "post-b"]);
		expect(global.fetch).toHaveBeenCalledWith("https://raw.example.com/cms/posts.json");
	});

	it("returns an empty array when the manifest fetch fails", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({ ok: false });

		const slugs = await fetchSlugs();

		expect(slugs).toEqual([]);
	});

	it("throws when CMS_RAW_BASE_URL is not defined", async () => {
		delete process.env.CMS_RAW_BASE_URL;

		await expect(fetchSlugs()).rejects.toThrow("CMS raw base URL is not defined.");
	});
});

describe("fetchPost", () => {
	it("parses frontmatter and body on success", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			text: async () => [
				"---",
				'title: "A Post"',
				'date: "2024-01-01"',
				'snippet: "A snippet."',
				'image: "https://example.com/image.jpg"',
				"---",
				"",
				"The body content.",
			].join("\n"),
		});

		const result = await fetchPost("a-post");

		expect(result).toEqual({
			summary: {
				slug: "a-post",
				title: "A Post",
				date: "2024-01-01",
				snippet: "A snippet.",
				image: "https://example.com/image.jpg",
			},
			body: "\nThe body content.",
		});
		expect(global.fetch).toHaveBeenCalledWith("https://raw.example.com/cms/posts/a-post.md");
	});

	it("parses a post with no image field", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			text: async () => [
				"---",
				'title: "No Image"',
				'date: "2024-02-02"',
				'snippet: "No image here."',
				"---",
				"",
				"Body.",
			].join("\n"),
		});

		const result = await fetchPost("no-image");

		expect(result?.summary.image).toBeUndefined();
	});

	it("returns null when the post fetch fails", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({ ok: false });

		const result = await fetchPost("missing-post");

		expect(result).toBeNull();
	});

	it("throws when CMS_RAW_BASE_URL is not defined", async () => {
		delete process.env.CMS_RAW_BASE_URL;

		await expect(fetchPost("a-post")).rejects.toThrow("CMS raw base URL is not defined.");
	});
});
