export type POST = {
	id: string
	title: string
	date: string
	content: string
	excerpt: string
	slug: string
}

export type POSTS = {
	posts: {
		nodes: Array<POST>
	}
}

export type POST_DATA = {
	data: POSTS
}

export type POST_BY_DATA = {
	data: {
		postBy: POST
	}
}

export const POST_PROJECTION = `
	id
	title
	date
	content
	excerpt
	slug
`;