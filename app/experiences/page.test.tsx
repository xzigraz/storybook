import { render, screen } from "@testing-library/react";
import Experiences from "./page";
import { Projects } from "@/constants/projects";

describe("Experiences", () => {
	it("renders a link for every project", () => {
		render(<Experiences />);

		expect(screen.getByText("Experiences")).toBeInTheDocument();
		Projects.forEach(project => {
			expect(screen.getByRole("link", { name: new RegExp(project.label) })).toBeInTheDocument();
		});
	});
});
