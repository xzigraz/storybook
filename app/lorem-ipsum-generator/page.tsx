'use client';

import { MainLayout } from "@/ui-component/Layout/mainLayout"
import { SectionLayout } from "@/ui-component/Layout/sectionLayout"
import { TextInput } from "@/ui-component/TextInput/textInput";
import { useState } from "react";

export default function LoreumIpsumGeneratorPage() {
	const [prompt, setPrompt] = useState<string>("");
	const [text, setText] = useState<string | null>(null);
	const [image, setImage] = useState<string | null>(null);
	const handleAPICall = async () => {
		if (prompt === "" || prompt === null || prompt === undefined) {
			console.error("prompt cannot be empty.");
			return;
		}

		await fetch("/api/generate", {
			method: "POST",
			body: JSON.stringify({
				prompt: `${prompt} Wrap html p tag around sentences.`
			})
		})
			.then(res => res.json())
			.then(data => {
				setImage(null);
				setText(data?.result?.response);
			})
			.catch(error => console.error(error));
	}

	return <MainLayout className="experiences peach-white">
		<>
			<SectionLayout>
				<>
					<h1>Placeholder Text and Image generator</h1>
					<p>This is another placeholder text and image generator, but it leverages Gen AI so that the possibility is endless. Please make sure to describe your requirement as detailed as possible. This tool doesn't support chat mode, one prompt is all you got.</p>
					<TextInput 
						isTextArea
						textAreaRows={4}
						value={prompt} 
						name="prompt" 
						onValueChange={e => setPrompt(e.target.value)} />
					<button className="td-button secondary" onClick={() => handleAPICall()}>Generate</button>
				</>
			</SectionLayout>
			<SectionLayout className="output">
				<>
					{text !== null && <textarea>
						{text}
					</textarea>}
					{image !== null && <img src={`data:image/png;base64,${image}`} />}
				</>
			</SectionLayout>
		</>
	</MainLayout>
}