import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound", () => {
	it("renders a 404 message with a link back home", () => {
		render(<NotFound />);

		expect(screen.getByText("404 Not Found")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Return Home" })).toHaveAttribute("href", "/");
	});
});
