export type POST_SUMMARY = {
	slug: string
	title: string
	date: string
	excerpt: string
}

export type POST = POST_SUMMARY & {
	content: string
}
