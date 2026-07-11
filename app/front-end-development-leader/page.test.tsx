import { render, screen } from "@testing-library/react";
import FrontEndDevelopmentLeader from "./page";
import Skillset from "@/constants/skillset";

jest.mock("next/dynamic", () => () => {
	const DynamicSkillsetCanvas = () => <div data-testid="skillset-canvas-mock" />;
	DynamicSkillsetCanvas.displayName = "LoadableComponent";
	return DynamicSkillsetCanvas;
});

describe("FrontEndDevelopmentLeader", () => {
	it("renders the write-up, grouped skills, and the force graph", () => {
		render(<FrontEndDevelopmentLeader />);

		expect(screen.getByText("Front End Development Leader")).toBeInTheDocument();
		expect(screen.getByTestId("skillset-canvas-mock")).toBeInTheDocument();

		const categories = new Set(Skillset.listData.map(skill => skill.category));
		expect(screen.getAllByRole("term")).toHaveLength(categories.size);
	});
});
