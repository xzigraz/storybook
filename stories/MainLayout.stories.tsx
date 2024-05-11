import type { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from '@/ui-component/Layout/mainLayout';

const meta = {
	title: 'Example/Layout',
	component: MainLayout,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {

	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { },
	decorators: [
		(Story) => (
			<div style={{backgroundColor: "#ff9900", width: "400px"}}><Story/></div>
		)
	]
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		children: <div>Test</div>
	},
};