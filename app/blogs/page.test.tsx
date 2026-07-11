import { render, screen } from "@testing-library/react";
import BlogsPage from "./page";

const originalEnv = process.env;

beforeEach(() => {
	process.env = { ...originalEnv, SERVER_BASE_URL: "http://localhost:3000" };
	global.fetch = jest.fn();
});

afterEach(() => {
	process.env = originalEnv;
	jest.resetAllMocks();
});

describe("BlogsPage", () => {
	it("renders a card for every post, including the optional image", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({
				posts: [
					{ slug: "post-a", title: "Post A", date: "2024-01-01", snippet: "Snippet A", image: "https://example.com/a.jpg" },
					{ slug: "post-b", title: "Post B", date: "2024-02-02", snippet: "Snippet B" },
				],
			}),
		});

		render(await BlogsPage());

		expect(screen.getByText("Post A")).toBeInTheDocument();
		expect(screen.getByText("Snippet A")).toBeInTheDocument();
		expect(screen.getByText("Post B")).toBeInTheDocument();
		expect(screen.getAllByRole("img")).toHaveLength(1);
	});

	it("renders no post cards when there are no posts", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ posts: [] }),
		});

		const { container } = render(await BlogsPage());

		expect(container.querySelector(".posts")).not.toBeInTheDocument();
	});

	it("throws when SERVER_BASE_URL is not defined", async () => {
		delete process.env.SERVER_BASE_URL;

		await expect(BlogsPage()).rejects.toThrow("Server base url is not defined.");
	});
});
