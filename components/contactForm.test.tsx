import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "./contactForm";

// ui-component's TextInput doesn't associate its <label> with the input (no
// htmlFor/id), so there's no accessible name to query by role - query by the
// `name` attribute directly instead.
const getInput = (container: HTMLElement, name: string) =>
	container.querySelector(`[name="${name}"]`) as HTMLInputElement;

describe("ContactForm", () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("renders the form fields", () => {
		const { container } = render(<ContactForm />);

		expect(getInput(container, "Name")).toBeInTheDocument();
		expect(getInput(container, "Email")).toBeInTheDocument();
		expect(getInput(container, "Phone")).toBeInTheDocument();
		expect(getInput(container, "Message")).toBeInTheDocument();
	});

	it("updates form state as the user types", () => {
		const { container } = render(<ContactForm />);

		const nameInput = getInput(container, "Name");
		fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

		expect(nameInput.value).toBe("Jane Doe");
	});

	it("submits the form and shows the thank-you message on success", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ result: "success" }),
		});

		const { container } = render(<ContactForm />);

		fireEvent.change(getInput(container, "Name"), { target: { value: "Jane" } });
		fireEvent.change(getInput(container, "Email"), { target: { value: "jane@example.com" } });
		fireEvent.click(screen.getByRole("button", { name: "Send" }));

		await waitFor(() => {
			expect(screen.getByText(/Thank you for reaching out/)).toBeInTheDocument();
		});

		expect(global.fetch).toHaveBeenCalledWith(
			"/api/contact",
			expect.objectContaining({
				method: "POST",
				body: JSON.stringify({ Name: "Jane", Email: "jane@example.com", Phone: "", Message: "" }),
			})
		);
	});

	it("does not show the thank-you message when the submission fails", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ result: "error" }),
		});

		render(<ContactForm />);

		fireEvent.click(screen.getByRole("button", { name: "Send" }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalled();
		});

		expect(screen.queryByText(/Thank you for reaching out/)).not.toBeInTheDocument();
	});
});
