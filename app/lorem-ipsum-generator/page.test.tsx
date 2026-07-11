import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoreumIpsumGeneratorPage from "./page";

const getPromptInput = (container: HTMLElement) =>
	container.querySelector('[name="prompt"]') as HTMLTextAreaElement;

describe("LoreumIpsumGeneratorPage", () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("does not call the API when the prompt is empty", () => {
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		render(<LoreumIpsumGeneratorPage />);

		fireEvent.click(screen.getByRole("button", { name: "Generate" }));

		expect(global.fetch).not.toHaveBeenCalled();
		expect(consoleErrorSpy).toHaveBeenCalledWith("prompt cannot be empty.");
		consoleErrorSpy.mockRestore();
	});

	it("renders generated text on a text response", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ result: { response: "Generated placeholder text." } }),
		});

		const { container } = render(<LoreumIpsumGeneratorPage />);
		fireEvent.change(getPromptInput(container), { target: { value: "Generating five paragraphs" } });
		fireEvent.click(screen.getByRole("button", { name: "Generate" }));

		await waitFor(() => {
			expect(screen.getByText("Generated placeholder text.")).toBeInTheDocument();
		});

		expect(global.fetch).toHaveBeenCalledWith(
			"/api/generate",
			expect.objectContaining({ method: "POST", body: JSON.stringify({ prompt: "Generating five paragraphs" }) })
		);
	});

	it("renders generated images when there's no text response", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ result: { image: "base64data" } }),
		});

		const { container } = render(<LoreumIpsumGeneratorPage />);
		fireEvent.change(getPromptInput(container), { target: { value: "Generating an image" } });
		fireEvent.click(screen.getByRole("button", { name: "Generate" }));

		await waitFor(() => {
			expect(screen.getAllByRole("img")).toHaveLength(5);
		});
	});

	it("stops loading and logs the error when the fetch rejects", async () => {
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		(global.fetch as jest.Mock).mockRejectedValue(new Error("network down"));

		const { container } = render(<LoreumIpsumGeneratorPage />);
		fireEvent.change(getPromptInput(container), { target: { value: "Generating five paragraphs" } });
		fireEvent.click(screen.getByRole("button", { name: "Generate" }));

		await waitFor(() => {
			expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("network down"));
		});

		consoleErrorSpy.mockRestore();
	});
});
