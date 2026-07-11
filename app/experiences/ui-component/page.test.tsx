import { render, screen } from "@testing-library/react";
import UIComponentProjectPage from "./page";

describe("UIComponentProjectPage", () => {
	it("renders the project write-up", () => {
		render(<UIComponentProjectPage />);

		expect(screen.getByText("UI Component")).toBeInTheDocument();
	});
});
