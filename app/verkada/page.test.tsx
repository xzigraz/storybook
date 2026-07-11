import { render, screen, fireEvent } from "@testing-library/react";
import VerkadaPage from "./page";

describe("VerkadaPage", () => {
	it("renders the write-up and code samples", () => {
		render(<VerkadaPage />);

		expect(screen.getByText("Verkada Coding Interview Retrospective")).toBeInTheDocument();
	});

	it("toggles a 2D-grid cell between 0 and 2, and ignores walls", () => {
		const { container } = render(<VerkadaPage />);
		const cells = container.querySelectorAll(".floor-layout")[0].children;

		// row 2, col 3 -> flat index 23, value 0
		expect(cells[23]).toHaveTextContent("0");
		fireEvent.click(cells[23]);
		expect(cells[23]).toHaveTextContent("2");
		fireEvent.click(cells[23]);
		expect(cells[23]).toHaveTextContent("0");

		// row 0, col 0 -> flat index 0, value 1 (wall, ignored)
		expect(cells[0]).toHaveTextContent("1");
		fireEvent.click(cells[0]);
		expect(cells[0]).toHaveTextContent("1");
	});

	it("toggles a flat-grid cell between 0 and 2, and ignores walls", () => {
		const { container } = render(<VerkadaPage />);
		const cells = container.querySelectorAll(".floor-layout")[1].children;

		expect(cells[23]).toHaveTextContent("0");
		fireEvent.click(cells[23]);
		expect(cells[23]).toHaveTextContent("2");

		expect(cells[0]).toHaveTextContent("1");
		fireEvent.click(cells[0]);
		expect(cells[0]).toHaveTextContent("1");
	});

	it("toggles an object-grid cell between empty and camera, and ignores walls", () => {
		const { container } = render(<VerkadaPage />);
		const cells = container.querySelectorAll(".floor-layout-9")[0].children;

		// id 6, type 2 (camera)
		expect(cells[5]).toHaveTextContent("2");
		expect(cells[5]).toHaveClass("camera");
		fireEvent.click(cells[5]);
		expect(cells[5]).toHaveTextContent("0");
		expect(cells[5]).not.toHaveClass("camera");

		// id 7, type 0 (empty)
		expect(cells[6]).toHaveTextContent("0");
		fireEvent.click(cells[6]);
		expect(cells[6]).toHaveTextContent("2");
		expect(cells[6]).toHaveClass("camera");

		// id 1, type 1 (wall, ignored)
		expect(cells[0]).toHaveTextContent("1");
		expect(cells[0]).toHaveClass("wall");
		fireEvent.click(cells[0]);
		expect(cells[0]).toHaveTextContent("1");
		expect(cells[0]).toHaveClass("wall");
	});
});
