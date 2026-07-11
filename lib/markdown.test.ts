import { markdownToHtml } from "./markdown";

describe("markdownToHtml", () => {
	it("converts a single paragraph to HTML", async () => {
		const html = await markdownToHtml("Hello world.");
		expect(html).toBe("<p>Hello world.</p>");
	});

	it("converts multiple paragraphs", async () => {
		const html = await markdownToHtml("First paragraph.\n\nSecond paragraph.");
		expect(html).toBe("<p>First paragraph.</p>\n<p>Second paragraph.</p>");
	});

	it("converts a markdown link", async () => {
		const html = await markdownToHtml("[example](https://example.com)");
		expect(html).toBe('<p><a href="https://example.com">example</a></p>');
	});

	it("supports GFM strikethrough", async () => {
		const html = await markdownToHtml("~~struck~~");
		expect(html).toBe("<p><del>struck</del></p>");
	});

	it("supports GFM tables", async () => {
		const html = await markdownToHtml("| a | b |\n| - | - |\n| 1 | 2 |");
		expect(html).toContain("<table>");
		expect(html).toContain("<td>1</td>");
	});

	it("returns an empty string for empty input", async () => {
		const html = await markdownToHtml("");
		expect(html).toBe("");
	});
});
