import { render, screen } from "@testing-library/react";
import Home from "./page";

describe('Homepage', () => {
	it('Homepage rendered without error', () => {
		const {container} = render(<Home />);
		expect(container).toBeInTheDocument();
	})

	it('renders the section-in-view class once a section intersects the viewport', () => {
		const originalIntersectionObserver = global.IntersectionObserver;

		// The shared setup mock is a no-op, so useIsRefInView always returns false.
		// Use a mock here that fires immediately on observe() to exercise the
		// "in view" branch of the class name too.
		global.IntersectionObserver = class {
			callback: IntersectionObserverCallback;
			constructor(callback: IntersectionObserverCallback) {
				this.callback = callback;
			}
			observe(target: Element) {
				this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
			}
			unobserve() {}
			disconnect() {}
		} as unknown as typeof IntersectionObserver;

		const { container } = render(<Home />);

		expect(container.querySelector(".section-in-view")).toBeInTheDocument();

		global.IntersectionObserver = originalIntersectionObserver;
	})

	it('renders the read-more link to the front-end-development-leader page', () => {
		render(<Home />);

		expect(screen.getByRole("link", { name: /Read More/ })).toHaveAttribute("href", "/front-end-development-leader");
	})
})
