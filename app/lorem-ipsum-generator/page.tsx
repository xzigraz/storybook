'use client';

import { MainLayout } from "@/ui-component/Layout/mainLayout"
import { SectionLayout } from "@/ui-component/Layout/sectionLayout"
import { TextInput } from "@/ui-component/TextInput/textInput";
import { useState } from "react";
import "./_lorem-ipsum-generator.scss";
import { Loading } from "@/ui-component/Loading/loading";

export default function LoreumIpsumGeneratorPage() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [prompt, setPrompt] = useState<string>("");
	const [text, setText] = useState<string | null>(null);
	const [image, setImage] = useState<string | null>(null);

	const handleAPICall = async () => {
		setIsLoading(true);
		if (prompt === "" || prompt === null || prompt === undefined) {
			console.error("prompt cannot be empty.");
			return;
		}

		await fetch("/api/generate", {
			method: "POST",
			body: JSON.stringify({
				prompt: `${prompt}`
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data?.result?.response) {
					setText(data.result.response);
				} else {
					setImage(data?.result?.image);
				}
				setIsLoading(false);
			})
			.catch(error => {
				console.error(error);
				setIsLoading(false);
			});
	}

	const handleUpdatingPrompt = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		setPrompt(e.target.value);
	}

	console.log(isLoading);

	return <><MainLayout className="experiences lorem-ipsum-generator peach-white">
		<>
			<SectionLayout>
				<>
					<h1>Placeholder Text and Image generator</h1>
					<p className="mb-40">This is another placeholder text and image generator, but it leverages Gen AI so that the possibility is endless. Please make sure to describe your requirement as detailed as possible. This tool doesn't support chat mode, one prompt is all you got.</p>
					<TextInput
						label="Prompt"
						additionalClassNames="mb-40"
						placeholder='Please start the sentence with "Generating an Image ..." or "Genetating five paragraph ..."'
						isRequired
						isTextArea
						textAreaRows={4}
						value={prompt}
						name="prompt"
						onValueChange={e => handleUpdatingPrompt(e)} />
					<button className="td-button secondary" onClick={() => handleAPICall()}>Generate</button>
				</>
			</SectionLayout>
			<SectionLayout className="output">
				<>
					<h2>Output for placeholder content</h2>
					{text !== null && <div className="placeholder-text-container mb-40">
						<pre>
							{text}
						</pre>
					</div>}
					{image !== null && <div className="images-container">
						<img width={64} height={64} src={`data:image/png;base64,${image}`} />
						<img width={128} height={128} src={`data:image/png;base64,${image}`} />
						<img width={200} height={200} src={`data:image/png;base64,${image}`} />
						<img width={300} height={300} src={`data:image/png;base64,${image}`} />
						<img width={400} height={400} src={`data:image/png;base64,${image}`} />
					</div>}
				</>
			</SectionLayout>

		</>
	</MainLayout>
		{isLoading && <Loading style="rotate" />}
	</>
}