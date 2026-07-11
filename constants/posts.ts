export type POST_SUMMARY = {
	slug: string
	title: string
	date: string
	snippet: string
	image?: string
}

export type POST = POST_SUMMARY & {
	content: string
}
