import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

jest.mock("next/font/google", () => ({
	Lexend: () => ({ className: "lexend-mock" }),
}));

jest.mock("@next/third-parties/google", () => ({
	GoogleTagManager: ({ gtmId }: { gtmId: string }) => <div data-testid="gtm" data-gtm-id={gtmId} />,
}));

const originalEnv = process.env;

// RootLayout renders a real <html>/<body> pair, but RTL always mounts into a
// <div> - expected DOM-nesting warning, not a real issue.
let consoleErrorSpy: jest.SpyInstance;

beforeAll(() => {
	consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
	consoleErrorSpy.mockRestore();
});

afterEach(() => {
	process.env = originalEnv;
});

describe("RootLayout", () => {
	it("renders the nav, children, and footer", () => {
		delete (process.env as Record<string, string | undefined>).GTM_ID;

		render(
			<RootLayout>
				<div data-testid="child">child content</div>
			</RootLayout>
		);

		expect(screen.getByRole("navigation")).toBeInTheDocument();
		expect(screen.getByTestId("child")).toBeInTheDocument();
		expect(screen.getByRole("contentinfo")).toBeInTheDocument();
	});

	it("omits GoogleTagManager when GTM_ID is not set", () => {
		delete (process.env as Record<string, string | undefined>).GTM_ID;

		render(<RootLayout><div /></RootLayout>);

		expect(screen.queryByTestId("gtm")).not.toBeInTheDocument();
	});

	it("renders GoogleTagManager when GTM_ID is set", () => {
		process.env = { ...originalEnv, GTM_ID: "GTM-TEST123" };

		render(<RootLayout><div /></RootLayout>);

		expect(screen.getByTestId("gtm")).toHaveAttribute("data-gtm-id", "GTM-TEST123");
	});
});
