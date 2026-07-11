import { getBlogPost, getExperience, PATH_BLOGS, PATH_EXPERIENCES } from "./paths";

describe("getExperience", () => {
	it("builds a path under /experiences", () => {
		expect(getExperience("ui-component")).toBe(`${PATH_EXPERIENCES}/ui-component`);
	});
});

describe("getBlogPost", () => {
	it("builds a path under /blogs", () => {
		expect(getBlogPost("a-post")).toBe(`${PATH_BLOGS}/a-post`);
	});
});
