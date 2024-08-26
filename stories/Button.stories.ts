import type { Meta, StoryObj } from '@storybook/react';
import ButtonExample from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Example/Button',
	component: ButtonExample,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {},
} satisfies Meta<typeof ButtonExample>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		title: "Default Button"
	},
};

export const Secondary: Story = {
	args: {
		title: "Secondary Action",
		buttonClasses: "secondary"
	},
};

export const Tertiary: Story = {
	args: {
		title: "Tertiary Action",
		buttonClasses: "tertiary"
	},
};

export const RoundCorner: Story = {
	args: {
		title: "Round Corner Button",
		buttonClasses: "primary round-corner"
	},
};

export const LinkAsButton: Story = {
	args: {
		title: "A link button",
		buttonType: "link",
		href: "https://google.com",
		linkTarget: "_blank"
	},
};

export const ButtonTriggerConfirmationMessage: Story = {
	args: {
		title: "Click to open a confirmation modal",
		buttonAction: () => confirm("Are you sure?")
	}
}