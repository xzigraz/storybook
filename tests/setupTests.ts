import '@testing-library/jest-dom'; // Adds custom jest matchers from jest-dom for assertions like `toBeInTheDocument()`

global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	observe() {}
	unobserve() {}
	disconnect() {}
  } as unknown as typeof IntersectionObserver;