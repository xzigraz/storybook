import Skillset from "@/constants/skillset";
import { ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";


type CanvasType = {
	contentWidth: number
}

const SkillsetCanvas = ({contentWidth}: CanvasType) => {
	return <ForceGraph3D
		graphData={Skillset}
		width={contentWidth - 60}
		height={600}
		nodeAutoColorBy="group"
		backgroundColor="#011627"
		nodeThreeObject={(node: { id: string | undefined; label: string, color: string; }) => {
			const sprite = new SpriteText(node.label);
			sprite.color = node.color;
			sprite.textHeight = node.id === "SDLC" 
				? 16 
				: (node.id === "FrontEnd" || node.id === "Backend" || node.id === "Mobile" 
					|| node.id === "DevOps" || node.id === "SourceControl" || node.id === "ProjectManagement"
					|| node.id === "ClientCustomization" || node.id === "Tools") 
					? 10 
					: 6;
			return sprite;
		}}
	/>
}

export default SkillsetCanvas;