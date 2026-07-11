import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

describe("ContactPage", () => {
	it("renders the contact form", () => {
		render(<ContactPage />);

		expect(screen.getByText("Contact Me")).toBeInTheDocument();
	});
});
