import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./nav";

describe("Nav", () => {
	it("renders the nav links", () => {
		render(<Nav />);

		expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Experiences" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
	});

	it("toggles the open state when the menu button is clicked", () => {
		render(<Nav />);

		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("menu");
		expect(button.className).not.toContain("nav-open");

		fireEvent.click(button);
		expect(button).toHaveTextContent("close");
		expect(button.className).toContain("nav-open");

		fireEvent.click(button);
		expect(button).toHaveTextContent("menu");
		expect(button.className).not.toContain("nav-open");
	});
});
