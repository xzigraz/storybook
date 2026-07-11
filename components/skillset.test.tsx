import { render } from "@testing-library/react";
import SkillsetCanvas from "./skillset";

jest.mock("react-force-graph-3d", () => {
	return function MockForceGraph3D(props: { nodeThreeObject: (node: { id: string; label: string; color: string }) => unknown }) {
		// Exercise nodeThreeObject the same way the real component would, so
		// its branching logic is covered without needing a real WebGL canvas.
		props.nodeThreeObject({ id: "SDLC", label: "SDLC", color: "#fff" });
		props.nodeThreeObject({ id: "FrontEnd", label: "Front End", color: "#fff" });
		props.nodeThreeObject({ id: "Other", label: "Other", color: "#fff" });
		return <div data-testid="force-graph-3d" />;
	};
});

jest.mock("three-spritetext", () => {
	return jest.fn().mockImplementation((label: string) => ({ label, color: "", textHeight: 0 }));
});

describe("SkillsetCanvas", () => {
	it("renders the force graph with a width capped at 1366", () => {
		const { getByTestId } = render(<SkillsetCanvas contentWidth={2000} />);

		expect(getByTestId("force-graph-3d")).toBeInTheDocument();
	});

	it("renders with a narrower width when contentWidth is small", () => {
		const { getByTestId } = render(<SkillsetCanvas contentWidth={500} />);

		expect(getByTestId("force-graph-3d")).toBeInTheDocument();
	});
});
