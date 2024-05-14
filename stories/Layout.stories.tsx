import type { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from '@/ui-component/Layout/mainLayout';
import { SectionLayout } from '@/ui-component/Layout/sectionLayout';
import { Button } from "@/ui-component/Button/Button";
import StarNight from "@/stories/assets/benjamin-voros-phIFdC6lA4E-unsplash.webp";

const meta = {
	title: 'Example/Layout',
	component: MainLayout,
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
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const LayoutContainer: Story = {
	args: {
		children: <>
			<p>children: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed felis eget velit aliquet sagittis. In ante metus dictum at tempor commodo ullamcorper a. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Luctus accumsan tortor posuere ac ut consequat semper. Congue nisi vitae suscipit tellus mauris a diam maecenas. Facilisi nullam vehicula ipsum a arcu cursus. Aliquam eleifend mi in nulla posuere sollicitudin. Tortor consequat id porta nibh venenatis cras. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Augue lacus viverra vitae congue. Consectetur adipiscing elit duis tristique sollicitudin nibh sit. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus.</p>
			<p>Ipsum consequat nisl vel pretium lectus quam. Vitae suscipit tellus mauris a diam maecenas. Elementum nisi quis eleifend quam adipiscing vitae proin. Porttitor eget dolor morbi non arcu. Tincidunt praesent semper feugiat nibh. Urna cursus eget nunc scelerisque viverra mauris. Lectus vestibulum mattis ullamcorper velit sed. Mauris a diam maecenas sed enim. Vel pretium lectus quam id leo in vitae turpis. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper.</p>
			<p>Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Eu mi bibendum neque egestas congue quisque egestas diam. Lectus arcu bibendum at varius vel pharetra vel. Platea dictumst quisque sagittis purus sit amet volutpat. Risus nullam eget felis eget. A condimentum vitae sapien pellentesque habitant morbi tristique. Ut consequat semper viverra nam libero. Senectus et netus et malesuada fames. Cursus metus aliquam eleifend mi in nulla posuere. Ipsum dolor sit amet consectetur. Lobortis mattis aliquam faucibus purus in massa. Sollicitudin tempor id eu nisl nunc mi ipsum. Pretium quam vulputate dignissim suspendisse. Sed vulputate mi sit amet mauris commodo quis imperdiet. Elit sed vulputate mi sit amet. Tincidunt ornare massa eget egestas purus viverra. Nisl tincidunt eget nullam non nisi est. Integer enim neque volutpat ac tincidunt vitae semper quis.</p>
			<p>Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Sit amet purus gravida quis blandit. Lobortis mattis aliquam faucibus purus. Felis eget velit aliquet sagittis id consectetur. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Lacinia at quis risus sed vulputate. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Purus viverra accumsan in nisl nisi scelerisque. Velit laoreet id donec ultrices tincidunt arcu. Proin nibh nisl condimentum id venenatis. Velit ut tortor pretium viverra suspendisse potenti nullam ac tortor. Fringilla est ullamcorper eget nulla facilisi. Sit amet mauris commodo quis imperdiet massa. Viverra accumsan in nisl nisi scelerisque eu ultrices. Congue quisque egestas diam in arcu. Euismod elementum nisi quis eleifend quam. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Purus in mollis nunc sed id. Odio eu feugiat pretium nibh. Sed nisi lacus sed viverra tellus in hac habitasse platea.</p>
			<p>Eget dolor morbi non arcu risus quis varius. Viverra suspendisse potenti nullam ac tortor. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Tempor commodo ullamcorper a lacus. Mauris vitae ultricies leo integer malesuada. Senectus et netus et malesuada fames ac turpis egestas. Nibh cras pulvinar mattis nunc sed blandit libero. Semper risus in hendrerit gravida rutrum quisque. Nibh nisl condimentum id venenatis a condimentum vitae sapien. Venenatis a condimentum vitae sapien pellentesque habitant. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Eget aliquet nibh praesent tristique. Non tellus orci ac auctor augue. Egestas sed sed risus pretium quam vulputate dignissim. Volutpat blandit aliquam etiam erat velit scelerisque in.</p>
		</>,
		className: "show-layout-border"
	},
};

export const LayoutContainerUsesSectionLayout: Story = {
	args: {
		children: <>
			{[...Array(5)].map((_, index) => <SectionLayout key={index}><>Section {index + 1}</></SectionLayout>)}
		</>,
		className: "use-section-layout"
	}
}

export const LayoutForSection: Story = {
	args: {
		children: <>
			<SectionLayout>
				<>
					<h2>A section with predefined padding/margin</h2>
					<p>Anything can be throw into this section layout and each section can have the same content max width regardless whether there's background that bleeds to the edge of the screen or not.</p>
				</>
			</SectionLayout>
			<SectionLayout bgImg={StarNight.src}>
				<>
					<h2>This is a section with background image bleeds to the edge of the screen.</h2>
				</>
			</SectionLayout>
			<SectionLayout bgImg={StarNight.src} isBgFullWidth={false}>
				<>
					<h2>This is a section with background image limited in the content area.</h2>
				</>
			</SectionLayout>
		</>
	}
}

export const LayoutForHeroBanner: Story = {
	args: {
		children: <>
			<SectionLayout bgImg={StarNight.src} isDarkBG height='300px'>
				<>
					<h1>Best Component In the World!</h1>
					<Button label="Get Me" size="medium" backgroundColor='#d600ff'/>
				</>
			</SectionLayout>
		</>
	}
}