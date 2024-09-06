export interface Node {
	id: string
	label: string
	group: number
}

export interface Link {
	source: string
	target: string
}

export interface Skill {
	id: string
	label: string
	category: string
	yoe?: number
}

export type SkillsetType = {
	nodes: Array<Node>
	links: Array<Link>
}

export type Skillset = {
	graphData: SkillsetType
	listData: Skill[]
}

/**
 * @TODO: Add yoe to each of the skills.
 */

const Skillset: Skillset = {
	graphData: {
		nodes: [
			{
				id: "SDLC",
				label: "Software Development Life Cycle",
				group: 1,
			},
			{
				id: "FrontEnd",
				label: "Front End",
				group: 2,
			},
			{
				id: "HTML",
				label: "HTML",
				group: 2,
			},
			{
				id: "CSS",
				label: "CSS",
				group: 2,
			},
			{
				id: "JavaScript",
				label: "JavaScript",
				group: 2,
			},
			{
				id: "React",
				label: "ReactJS",
				group: 2,
			},
			{
				id: "NextJs",
				label: "NextJS",
				group: 2,
			},
			{
				id: "Webpack",
				label: "WebPack",
				group: 2,
			},
			{
				id: "Grunt",
				label: "Grunt",
				group: 2,
			},
			{
				id: "Vite",
				label: "Vite",
				group: 2,
			},
			{
				id: "SASS",
				label: "SASS",
				group: 2,
			},
			{
				id: "Less",
				label: "Less",
				group: 2,
			},
			{
				id: "EmberJS",
				label: "EmberJS",
				group: 2,
			},
			{
				id: "MarionetteJS",
				label: "MarionetteJS",
				group: 2,
			},
			{
				id: "Backbone",
				label: "Backbone",
				group: 2,
			},
			{
				id: "Backend",
				label: "Backend",
				group: 3,
			},
			{
				id: "GraphQL",
				label: "GraphQL",
				group: 3,
			},
			{
				id: "PHP",
				label: "PHP",
				group: 3,
			},
			{
				id: "MySQL",
				label: "MySQL",
				group: 3,
			},
			{
				id: "PostGresSQL",
				label: "PostGresSQL",
				group: 3,
			},
			{
				id: "Prisma",
				label: "Prisma",
				group: 3,
			},
			{
				id: "Mobile",
				label: "Mobile",
				group: 4,
			},
			{
				id: "ReactNative",
				label: "React Native",
				group: 4,
			},
			{
				id: "DevOps",
				label: "DevOps",
				group: 5,
			},
			{
				id: "Jenkins",
				label: "Jenkins",
				group: 5,
			},
			{
				id: "AWS",
				label: "Amazon Web Services",
				group: 5,
			},
			{
				id: "Docker",
				label: "Docker",
				group: 5,
			},
			{
				id: "Kubernetes",
				label: "Kubernetes",
				group: 5,
			},
			{
				id: "Terraform",
				label: "Terraform",
				group: 5,
			},
			{
				id: "ArgoCD",
				label: "ArgoCD",
				group: 5,
			},
			{
				id: "SSH",
				label: "SSH",
				group: 5,
			},
			{
				id: "SourceControl",
				label: "Source Control",
				group: 6,
			},
			{
				id: "Git",
				label: "Git",
				group: 6,
			},
			{
				id: "Subversion",
				label: "Subversion",
				group: 6,
			},
			{
				id: "Mercurial",
				label: "Mercurial",
				group: 6,
			},
			{
				id: "Bitbucket",
				label: "Bitbucket",
				group: 6,
			},
			{
				id: "Github",
				label: "Github",
				group: 6,
			},
			{
				id: "ProjectManagement",
				label: "Project Management",
				group: 7,
			},
			{
				id: "JIRA",
				label: "JIRA",
				group: 7,
			},
			{
				id: "Trello",
				label: "Trello",
				group: 7,
			},
			{
				id: "Monday",
				label: "Monday",
				group: 7,
			},
			{
				id: "ClientCustomization",
				label: "Client Customization",
				group: 8,
			},
			{
				id: "WordPress",
				label: "WordPress",
				group: 8,
			},
			{
				id: "Magento",
				label: "Magento",
				group: 8,
			},
			{
				id: "Tools",
				label: "Tools",
				group: 9,
			},
			{
				id: "Windows",
				label: "Windows",
				group: 9,
			},
			{
				id: "MacOS",
				label: "MacOS",
				group: 9,
			},
			{
				id: "Linux",
				label: "Linux",
				group: 9,
			},
			{
				id: "IntelliJ",
				label: "IntelliJ IDE",
				group: 9,
			},
			{
				id: "VSCode",
				label: "VS Code",
				group: 9,
			},
			{
				id: "XCode",
				label: "XCode",
				group: 9,
			},
			{
				id: "AndroidStudio",
				label: "Android Studio",
				group: 9,
			},
			{
				id: "AndroidSDK",
				label: "Android SDK",
				group: 9,
			}
		],
		links: [
			{
				source: "FrontEnd",
				target: "SDLC"
			},
			{
				source: "CSS",
				target: "FrontEnd"
			},
			{
				source: "HTML",
				target: "FrontEnd"
			},
			{
				source: "JavaScript",
				target: "FrontEnd"
			},
			{
				source: "React",
				target: "FrontEnd"
			},
			{
				source: "NextJs",
				target: "FrontEnd"
			},
			{
				source: "Webpack",
				target: "FrontEnd"
			},
			{
				source: "Grunt",
				target: "FrontEnd"
			},
			{
				source: "Vite",
				target: "FrontEnd"
			},
			{
				source: "SASS",
				target: "FrontEnd"
			},
			{
				source: "Less",
				target: "FrontEnd"
			},
			{
				source: "EmberJS",
				target: "FrontEnd"
			},
			{
				source: "MarionetteJS",
				target: "FrontEnd"
			},
			{
				source: "Backbone",
				target: "FrontEnd"
			},
			{
				source: "Backend",
				target: "SDLC"
			},
			{
				source: "GraphQL",
				target: "Backend"
			},
			{
				source: "PHP",
				target: "Backend"
			},
			{
				source: "MySQL",
				target: "Backend"
			},
			{
				source: "PostGresSQL",
				target: "Backend"
			},
			{
				source: "Prisma",
				target: "Backend"
			},
			{
				source: "Mobile",
				target: "SDLC"
			},
			{
				source: "ReactNative",
				target: "Mobile"
			},
			{
				source: "DevOps",
				target: "SDLC"
			},
			{
				source: "Jenkins",
				target: "DevOps"
			},
			{
				source: "AWS",
				target: "DevOps"
			},
			{
				source: "Docker",
				target: "DevOps"
			},
			{
				source: "Kubernetes",
				target: "DevOps"
			},
			{
				source: "Terraform",
				target: "DevOps"
			},
			{
				source: "ArgoCD",
				target: "DevOps"
			},
			{
				source: "SSH",
				target: "DevOps"
			},
			{
				source: "SourceControl",
				target: "Tools"
			},
			{
				source: "Git",
				target: "SourceControl"
			},
			{
				source: "Subversion",
				target: "SourceControl"
			},
			{
				source: "Mercurial",
				target: "SourceControl"
			},
			{
				source: "Bitbucket",
				target: "SourceControl"
			},
			{
				source: "Github",
				target: "SourceControl"
			},
			{
				source: "ProjectManagement",
				target: "SDLC"
			},
			{
				source: "JIRA",
				target: "ProjectManagement"
			},
			{
				source: "Trello",
				target: "ProjectManagement"
			},
			{
				source: "Monday",
				target: "ProjectManagement"
			},
			{
				source: "ClientCustomization",
				target: "SDLC"
			},
			{
				source: "WordPress",
				target: "ClientCustomization"
			},
			{
				source: "Magento",
				target: "ClientCustomization"
			},
			{
				source: "Tools",
				target: "SDLC"
			},
			{
				source: "Windows",
				target: "Tools"
			},
			{
				source: "MacOS",
				target: "Tools"
			},
			{
				source: "Linux",
				target: "Tools"
			},
			{
				source: "IntelliJ",
				target: "Tools"
			},
			{
				source: "VSCode",
				target: "Tools"
			},
			{
				source: "XCode",
				target: "Tools"
			},
			{
				source: "AndroidStudio",
				target: "Tools"
			},
			{
				source: "AndroidSDK",
				target: "Tools"
			}
		]
	},
	listData: [
		{
			id: "FrontEnd",
			label: "Front End",
			category: "FrontEnd"
		},
		{
			id: "HTML",
			label: "HTML",
			category: "FrontEnd"
		},
		{
			id: "CSS",
			label: "CSS",
			category: "FrontEnd"
		},
		{
			id: "JavaScript",
			label: "JavaScript",
			category: "FrontEnd"
		},
		{
			id: "React",
			label: "ReactJS",
			category: "FrontEnd"
		},
		{
			id: "NextJs",
			label: "NextJS",
			category: "FrontEnd"
		},
		{
			id: "Webpack",
			label: "WebPack",
			category: "FrontEnd"
		},
		{
			id: "Grunt",
			label: "Grunt",
			category: "FrontEnd"
		},
		{
			id: "Vite",
			label: "Vite",
			category: "FrontEnd"
		},
		{
			id: "SASS",
			label: "SASS",
			category: "FrontEnd"
		},
		{
			id: "Less",
			label: "Less",
			category: "FrontEnd"
		},
		{
			id: "EmberJS",
			label: "EmberJS",
			category: "FrontEnd"
		},
		{
			id: "MarionetteJS",
			label: "MarionetteJS",
			category: "FrontEnd"
		},
		{
			id: "Backbone",
			label: "Backbone",
			category: "FrontEnd"
		},
		{
			id: "Backend",
			label: "Backend",
			category: "Backend"
		},
		{
			id: "GraphQL",
			label: "GraphQL",
			category: "Backend"
		},
		{
			id: "PHP",
			label: "PHP",
			category: "Backend"
		},
		{
			id: "MySQL",
			label: "MySQL",
			category: "Backend"
		},
		{
			id: "PostGresSQL",
			label: "PostGresSQL",
			category: "Backend"
		},
		{
			id: "Prisma",
			label: "Prisma",
			category: "Backend"
		},
		{
			id: "Mobile",
			label: "Mobile",
			category: "Mobile"
		},
		{
			id: "ReactNative",
			label: "React Native",
			category: "Mobile"
		},
		{
			id: "DevOps",
			label: "DevOps",
			category: "DevOps"
		},
		{
			id: "Jenkins",
			label: "Jenkins",
			category: "DevOps"
		},
		{
			id: "AWS",
			label: "Amazon Web Services",
			category: "DevOps"
		},
		{
			id: "Docker",
			label: "Docker",
			category: "DevOps"
		},
		{
			id: "Kubernetes",
			label: "Kubernetes",
			category: "DevOps"
		},
		{
			id: "Terraform",
			label: "Terraform",
			category: "DevOps"
		},
		{
			id: "ArgoCD",
			label: "ArgoCD",
			category: "DevOps"
		},
		{
			id: "SSH",
			label: "SSH",
			category: "DevOps"
		},
		{
			id: "SourceControl",
			label: "Source Control",
			category: "SourceControl"
		},
		{
			id: "Git",
			label: "Git",
			category: "SourceControl"
		},
		{
			id: "Subversion",
			label: "Subversion",
			category: "SourceControl"
		},
		{
			id: "Mercurial",
			label: "Mercurial",
			category: "SourceControl"
		},
		{
			id: "Bitbucket",
			label: "Bitbucket",
			category: "SourceControl"
		},
		{
			id: "Github",
			label: "Github",
			category: "SourceControl"
		},
		{
			id: "ProjectManagement",
			label: "Project Management",
			category: "ProjectManagement",
		},
		{
			id: "JIRA",
			label: "JIRA",
			category: "ProjectManagement",
		},
		{
			id: "Trello",
			label: "Trello",
			category: "ProjectManagement",
		},
		{
			id: "Monday",
			label: "Monday",
			category: "ProjectManagement",
		},
		{
			id: "ClientCustomization",
			label: "Client Customization",
			category: "ClientCustomization",
		},
		{
			id: "WordPress",
			label: "WordPress",
			category: "ClientCustomization",
		},
		{
			id: "Magento",
			label: "Magento",
			category: "ClientCustomization",
		},
		{
			id: "Tools",
			label: "Tools",
			category: "Tools"
		},
		{
			id: "Windows",
			label: "Windows",
			category: "Tools"
		},
		{
			id: "MacOS",
			label: "MacOS",
			category: "Tools"
		},
		{
			id: "Linux",
			label: "Linux",
			category: "Tools"
		},
		{
			id: "IntelliJ",
			label: "IntelliJ IDE",
			category: "Tools"
		},
		{
			id: "VSCode",
			label: "VS Code",
			category: "Tools"
		},
		{
			id: "XCode",
			label: "XCode",
			category: "Tools"
		},
		{
			id: "AndroidStudio",
			label: "Android Studio",
			category: "Tools"
		},
		{
			id: "AndroidSDK",
			label: "Android SDK",
			category: "Tools"
		}
	]
}

export default Skillset;