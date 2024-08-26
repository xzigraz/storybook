export interface Node {
	id: string
}

export interface Link {
	source: string
	target: string
}

export type Skillsets = {
	nodes: Array<Node>
	links: Array<Link>
}

const Skillsets: Skillsets = {
	nodes: [
		{
			id: "SDLC"
		},
		{
			id: "FrontEnd"
		},
		{
			id: "HTML"
		},
		{
			id: "CSS"
		},
		{
			id: "JavaScript"
		},
		{
			id: "React"
		},
		{
			id: "NextJs"
		},
		{
			id: "Webpack"
		},
		{
			id: "Grunt"
		},
		{
			id: "Vite"
		},
		{
			id: "SASS"
		},
		{
			id: "Less"
		},
		{
			id: "EmberJS"
		},
		{
			id: "MarionetteJS"
		},
		{
			id: "Backbone"
		},
		{
			id: "Backend"
		},
		{
			id: "GraphQL"
		},
		{
			id: "PHP"
		},
		{
			id: "MySQL"
		},
		{
			id: "PostGresSQL"
		},
		{
			id: "Prisma"
		},
		{
			id: "Mobile"
		},
		{
			id: "ReactNative"
		},
		{
			id: "DevOps"
		},
		{
			id: "Jenkins"
		},
		{
			id: "AWS"
		},
		{
			id: "Docker"
		},
		{
			id: "Kubernetes"
		},
		{
			id: "Terraform"
		},
		{
			id: "ArgoCD"
		},
		{
			id: "SSH"
		},
		{
			id: "SourceControl",
		},
		{
			id: "Git"
		},
		{
			id: "Subversion"
		},
		{
			id: "Mercurial"
		},
		{
			id: "Bitbucket"
		},
		{
			id: "Github"
		},
		{
			id: "ProjectManagement"
		},
		{
			id: "JIRA"
		},
		{
			id: "Trello"
		},
		{
			id: "Monday"
		},
		{
			id: "ClientCustomization"
		},
		{
			id: "WordPress"
		},
		{
			id: "Magento"
		},
		{
			id: "Tools"
		},
		{
			id: "Windows"
		},
		{
			id: "MacOS"
		},
		{
			id: "Linux"
		},
		{
			id: "IntelliJ"
		},
		{
			id: "VSCode"
		},
		{
			id: "XCode"
		},
		{
			id: "AndroidStudio"
		},
		{
			id: "AndroidSDK"
		}
	],
	links: [
		{
			source: "FrontEnd",
			target: "SDLC"
		},
		{
			source: "FrontEnd",
			target: "SDLC"
		},
		{
			source: "Backend",
			target: "SDLC"
		},
		{
			source: "Mobile",
			target: "SDLC"
		},
		{
			source: "DevOps",
			target: "SDLC"
		},
		{
			source: "SourceControl",
			target: "SDLC"
		},
		{
			source: "ProjectManagement",
			target: "SDLC"
		},
		{
			source: "ClientCustomization",
			target: "SDLC"
		},
		{
			source: "Tools",
			target: "SDLC"
		}
	]
}

export default Skillsets;