import { render, screen } from "@testing-library/react";
import TheDepartedOnlineProjectPage from "./page";

describe("TheDepartedOnlineProjectPage", () => {
	it("renders the project write-up", () => {
		render(<TheDepartedOnlineProjectPage />);

		expect(screen.getByText("thedepartedonline.com")).toBeInTheDocument();
	});
});
