import { render, screen } from "@testing-library/react";
import Footer from "./footer";
import { PATH_GITHUB, PATH_LINKEDIN, PATH_STORYBOOK } from "@/constants/paths";

describe("Footer", () => {
	it("renders the copyright notice and social links", () => {
		render(<Footer />);

		expect(screen.getByText(/The Departed Online\./)).toBeInTheDocument();

		const links = screen.getAllByRole("link");
		const hrefs = links.map(link => link.getAttribute("href"));
		expect(hrefs).toEqual(expect.arrayContaining([PATH_GITHUB, PATH_LINKEDIN, PATH_STORYBOOK]));
	});
});
