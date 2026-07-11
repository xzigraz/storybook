import matter from "gray-matter";
import { POST_SUMMARY } from "@/constants/posts";

const cmsBaseUrl = () => {
	if (!process.env.CMS_RAW_BASE_URL) {
		throw new Error("CMS raw base URL is not defined.");
	}

	return process.env.CMS_RAW_BASE_URL;
}

export const fetchSlugs = async (): Promise<string[]> => {
	const res = await fetch(`${cmsBaseUrl()}/posts.json`);

	if (!res.ok) {
		return [];
	}

	return res.json();
}

export type ParsedPost = {
	summary: POST_SUMMARY
	body: string
}

export const fetchPost = async (slug: string): Promise<ParsedPost | null> => {
	const res = await fetch(`${cmsBaseUrl()}/posts/${slug}.md`);

	if (!res.ok) {
		return null;
	}

	const raw = await res.text();
	const { data, content } = matter(raw);

	return {
		summary: {
			slug,
			title: data.title,
			date: data.date,
			snippet: data.snippet,
			image: data.image
		},
		body: content
	};
}
