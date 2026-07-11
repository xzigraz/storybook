import { render, screen, fireEvent } from "@testing-library/react";
import InxeptionDotComProjectPage from "./page";

describe("InxeptionDotComProjectPage", () => {
	it("renders the project write-up and a closed dialog", () => {
		render(<InxeptionDotComProjectPage />);

		expect(screen.getByText("inxeption.com")).toBeInTheDocument();
		expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute("open");
	});

	it("opens the dialog with the clicked screenshot", () => {
		render(<InxeptionDotComProjectPage />);

		const images = screen.getAllByRole("img");
		fireEvent.click(images[0]);

		const dialog = screen.getByRole("dialog", { hidden: true });
		expect(dialog).toHaveAttribute("open");
		expect(screen.getAllByText(images[0].getAttribute("alt") as string).length).toBeGreaterThan(1);
	});

	it("closes the dialog via the close button", () => {
		render(<InxeptionDotComProjectPage />);

		fireEvent.click(screen.getAllByRole("img")[0]);
		fireEvent.click(screen.getByRole("button"));

		expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute("open");
	});

	it("closes the dialog via the modal mask", () => {
		const { container } = render(<InxeptionDotComProjectPage />);

		fireEvent.click(screen.getAllByRole("img")[0]);
		fireEvent.click(container.querySelector(".modal-mask") as Element);

		expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute("open");
	});
});
