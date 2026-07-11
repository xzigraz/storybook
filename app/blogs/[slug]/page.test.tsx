import { render, screen } from "@testing-library/react";
import BlogPage from "./page";

const originalEnv = process.env;

beforeEach(() => {
	process.env = { ...originalEnv, SERVER_BASE_URL: "http://localhost:3000" };
	global.fetch = jest.fn();
});

afterEach(() => {
	process.env = originalEnv;
	jest.resetAllMocks();
});

describe("BlogPage", () => {
	it("renders the post title, date, and content when found", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({
				post: {
					slug: "a-post",
					title: "A Post",
					date: "2024-01-01",
					snippet: "...",
					content: "<p>Hello world.</p>",
				},
			}),
		});

		render(await BlogPage({ params: Promise.resolve({ slug: "a-post" }) }));

		expect(screen.getByText("A Post")).toBeInTheDocument();
		expect(screen.getByText("Hello world.")).toBeInTheDocument();
		expect(screen.queryByRole("img")).not.toBeInTheDocument();
	});

	it("renders the header image when the post has one", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({
				post: {
					slug: "a-post",
					title: "A Post",
					date: "2024-01-01",
					snippet: "...",
					image: "https://example.com/header.jpg",
					content: "<p>Hello world.</p>",
				},
			}),
		});

		render(await BlogPage({ params: Promise.resolve({ slug: "a-post" }) }));

		expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/header.jpg");
	});

	it("renders nothing extra when the post isn't found", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ post: null }),
		});

		render(await BlogPage({ params: Promise.resolve({ slug: "missing" }) }));

		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		expect(screen.getByRole("link", { name: /Back/ })).toBeInTheDocument();
	});

	it("throws when SERVER_BASE_URL is not defined", async () => {
		delete process.env.SERVER_BASE_URL;

		await expect(BlogPage({ params: Promise.resolve({ slug: "a-post" }) })).rejects.toThrow(
			"Server base url is not defined."
		);
	});
});
