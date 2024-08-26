export interface Node {
	id: string
	label: string
	group: number
}

export interface Link {
	source: string
	target: string
}

export type SkillsetType = {
	nodes: Array<Node>
	links: Array<Link>
}

const Skillset: SkillsetType = {
	nodes: [
		{
			id: "SDLC",
			label: "Software Development Life Cycle",
			group: 1
		},
		{
			id: "FrontEnd",
			label: "Front End",
			group: 2
		},
		{
			id: "HTML",
			label: "HTML",
			group: 2
		},
		{
			id: "CSS",
			label: "CSS",
			group: 2
		},
		{
			id: "JavaScript",
			label: "JavaScript",
			group: 2
		},
		{
			id: "React",
			label: "ReactJS",
			group: 2
		},
		{
			id: "NextJs",
			label: "NextJS",
			group: 2
		},
		{
			id: "Webpack",
			label: "WebPack",
			group: 2
		},
		{
			id: "Grunt",
			label: "Grunt",
			group: 2
		},
		{
			id: "Vite",
			label: "Vite",
			group: 2
		},
		{
			id: "SASS",
			label: "SASS",
			group: 2
		},
		{
			id: "Less",
			label: "Less",
			group: 2
		},
		{
			id: "EmberJS",
			label: "EmberJS",
			group: 2
		},
		{
			id: "MarionetteJS",
			label: "MarionetteJS",
			group: 2
		},
		{
			id: "Backbone",
			label: "Backbone",
			group: 2
		},
		{
			id: "Backend",
			label: "Backend",
			group: 3
		},
		{
			id: "GraphQL",
			label: "GraphQL",
			group: 3
		},
		{
			id: "PHP",
			label: "PHP",
			group: 3
		},
		{
			id: "MySQL",
			label: "MySQL",
			group: 3
		},
		{
			id: "PostGresSQL",
			label: "PostGresSQL",
			group: 3
		},
		{
			id: "Prisma",
			label: "Prisma",
			group: 3
		},
		{
			id: "Mobile",
			label: "Mobile",
			group: 4
		},
		{
			id: "ReactNative",
			label: "React Native",
			group: 4
		},
		{
			id: "DevOps",
			label: "DevOps",
			group: 5
		},
		{
			id: "Jenkins",
			label: "Jenkins",
			group: 5
		},
		{
			id: "AWS",
			label: "Amazon Web Services",
			group: 5
		},
		{
			id: "Docker",
			label: "Docker",
			group: 5
		},
		{
			id: "Kubernetes",
			label: "Kubernetes",
			group: 5
		},
		{
			id: "Terraform",
			label: "Terraform",
			group: 5
		},
		{
			id: "ArgoCD",
			label: "ArgoCD",
			group: 5
		},
		{
			id: "SSH",
			label: "SSH",
			group: 5
		},
		{
			id: "SourceControl",
			label: "Source Control",
			group: 6
		},
		{
			id: "Git",
			label: "Git",
			group: 6
		},
		{
			id: "Subversion",
			label: "Subversion",
			group: 6
		},
		{
			id: "Mercurial",
			label: "Mercurial",
			group: 6
		},
		{
			id: "Bitbucket",
			label: "Bitbucket",
			group: 6
		},
		{
			id: "Github",
			label: "Github",
			group: 6
		},
		{
			id: "ProjectManagement",
			label: "Project Management",
			group: 7
		},
		{
			id: "JIRA",
			label: "JIRA",
			group: 7
		},
		{
			id: "Trello",
			label: "Trello",
			group: 7
		},
		{
			id: "Monday",
			label: "Monday",
			group: 7
		},
		{
			id: "ClientCustomization",
			label: "Client Customization",
			group: 8
		},
		{
			id: "WordPress",
			label: "WordPress",
			group: 8
		},
		{
			id: "Magento",
			label: "Magento",
			group: 8
		},
		{
			id: "Tools",
			label: "Tools",
			group: 9
		},
		{
			id: "Windows",
			label: "Windows",
			group: 9
		},
		{
			id: "MacOS",
			label: "MacOS",
			group: 9
		},
		{
			id: "Linux",
			label: "Linux",
			group: 9
		},
		{
			id: "IntelliJ",
			label: "IntelliJ IDE",
			group: 9
		},
		{
			id: "VSCode",
			label: "VS Code",
			group: 9
		},
		{
			id: "XCode",
			label: "XCode",
			group: 9
		},
		{
			id: "AndroidStudio",
			label: "Android Studio",
			group: 9
		},
		{
			id: "AndroidSDK",
			label: "Android SDK",
			group: 9
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
}

export default Skillset;