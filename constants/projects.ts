import { PATH } from "./paths"

export default interface PROJECT {
	name: string
	label: string
	slug: string
	summary: string
	thumbnail?: PATH | string | null
}
export const Projects: PROJECT[] = [
	{
		name: "thedepartedonline",
		label: "The Departed Online",
		slug: "the-departed-online",
		summary: "Portfolio site, this project is where I will refresh from time to time by using the industry trendy frameworks, design methodology, and best practices so that I can showcase my front-end development chops."
	},
	{
		name: "ui-component",
		label: "UI Component",
		slug: "ui-component",
		summary: "Yet another component library"
	},
	{
		name: "inxeption-dot-com",
		label: "inxeption.com",
		slug: "inxeption-com",
		summary: "inxeption.com is the cumulation of all the service offerings from Inxeption Platform to do business better."
	},
]