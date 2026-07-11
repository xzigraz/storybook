/**
 * @jest-environment node
 */
import { POST } from "./route";
import { fetchPost, fetchSlugs } from "@/lib/posts";

jest.mock("@/lib/posts");

const mockedFetchSlugs = fetchSlugs as jest.Mock;
const mockedFetchPost = fetchPost as jest.Mock;

afterEach(() => {
	jest.resetAllMocks();
});

describe("POST /api/get-posts", () => {
	it("returns the summaries for every resolvable slug", async () => {
		mockedFetchSlugs.mockResolvedValue(["post-a", "post-b"]);
		mockedFetchPost.mockImplementation(async (slug: string) => ({
			summary: { slug, title: slug, date: "2024-01-01", snippet: "..." },
			body: "body",
		}));

		const res = await POST();
		const data = await res.json();

		expect(data.posts).toEqual([
			{ slug: "post-a", title: "post-a", date: "2024-01-01", snippet: "..." },
			{ slug: "post-b", title: "post-b", date: "2024-01-01", snippet: "..." },
		]);
	});

	it("filters out slugs that fail to resolve", async () => {
		mockedFetchSlugs.mockResolvedValue(["post-a", "missing"]);
		mockedFetchPost.mockImplementation(async (slug: string) =>
			slug === "missing" ? null : { summary: { slug, title: slug, date: "2024-01-01", snippet: "..." }, body: "b" }
		);

		const res = await POST();
		const data = await res.json();

		expect(data.posts).toEqual([{ slug: "post-a", title: "post-a", date: "2024-01-01", snippet: "..." }]);
	});

	it("returns a 500 response when fetching slugs throws", async () => {
		mockedFetchSlugs.mockRejectedValue(new Error("CMS raw base URL is not defined."));

		const res = await POST();

		expect(res.status).toBe(500);
		const data = await res.json();
		expect(data).toEqual({ error: "An error occurred during the request" });
	});
});
