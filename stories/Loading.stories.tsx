import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Loading } from '@/ui-component/Loading/loading';
import LoadingExample from './Loading';

const meta = {
	title: 'Example/Loading',
	component: LoadingExample,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'fullscreen',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {

	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		repeat: 3,
		style: "wave",
		loadingPlacement: "page"
	},
};