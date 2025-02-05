import {render} from "@testing-library/react";
import Home from "./page";

describe('Homepage', () => {
	it('Homepage rendered without error', () => {
		const {container} = render(<Home />);
		expect(container).toBeInTheDocument();
	})
})
