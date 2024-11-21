export type PATH = string;

export const PATH_GITHUB: PATH = "//github.com/xzigraz/storybook";

export const PATH_LINKEDIN: PATH = "//www.linkedin.com/in/danielzzhu/";

export const PATH_STORYBOOK: PATH = "//storybook.thedepartedonline.com/";

export const PATH_RESUME: PATH = "/documents/Resume_Daniel_Zhu_with_picture.pdf";
export const PATH_ATS_SAFE_LONG_RESUME: PATH = "/documents/Resume_Daniel_Zhu.pdf";
export const PATH_ATS_SAFE_SHORT_RESUME: PATH = "/documents/resume-daniel-zhu.pdf";

export const PATH_HOME: PATH = "/";

export const PATH_EXPERIENCES: PATH = "/experiences";

export const PATH_BLOGS: PATH = "/blogs";

export const getBlogPost = (id: string): PATH => `${PATH_BLOGS}/${id}`;

export const PATH_CONTACT: PATH = "/contact";

export const PATH_FRONT_END_DEVELOPMENT_LEADER: PATH = "/front-end-development-leader";