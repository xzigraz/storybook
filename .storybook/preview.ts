import type { Preview } from "@storybook/nextjs-vite";
import "../stories/scss/global.scss";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
