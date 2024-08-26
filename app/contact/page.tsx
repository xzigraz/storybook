'use client';

import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Nav from "@/components/nav";
import "./_contact.page.scss";
import Footer from "@/components/footer";
import Link from "next/link";
import { PATH_LINKEDIN, PATH_RESUME } from "@/constants/paths";
import { TextInput } from "@/ui-component/TextInput/textInput";
import { useState } from "react";
import { Loading } from "@/ui-component/Loading/loading";

export default function Projects() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSubmitSuccess, setIsSubmitSuccess] = useState<"success" | "error" | null>(null);

	const handleSubmit = () => {
		setIsLoading(true);
		const sheetWebAppURL = "https://script.google.com/macros/s/AKfycbzzko7KN06ag7jF_2D_YjTu_vd3UBg_QULB9vz11Q682dnOQDItDWnYi-MOpSHzWRQ2CA/exec";
		const submitBody = new FormData();
		submitBody.append("Name", name);
		submitBody.append("Email", email);
		submitBody.append("Phone", phone);
		submitBody.append("Message", message);
		fetch(sheetWebAppURL, {method: "POST", body: submitBody})
		.then(res => res.json())
		.then(data => {
			setIsLoading(false);
			setIsSubmitSuccess(data.result);
		})
		.catch(error => {
			console.warn(error);
			setIsLoading(false);
			setIsSubmitSuccess("error");
		});
	}

	return <>
		<Nav />
		<MainLayout className="contact">
			<>
				<SectionLayout className="contact-form">
					<>
						<h1>Contat Me</h1>
						<p>Like what you see so far? Let's talk and see what I can help you with! Here's
							my <Link href={PATH_RESUME} rel="noopener noreferrer" target="_blank">resume</Link>,
							and my <a href={PATH_LINKEDIN}>LinkedIn</a>, you can also reach me via the form below.</p>
						{isSubmitSuccess === "success" 
							? <p>Thank you for reaching out. I'll get back to you in 24 hours.</p>
							: <form>
							<TextInput label="Name" name="Name" isRequired onValueChange={(value) => setName(value)} />
							<TextInput label="Email" name="Email" isRequired onValueChange={(value) => setEmail(value)} />
							<TextInput label="Phone" name="Phone" onValueChange={(value) => setPhone(value)} />
							<TextInput label="Message" name="Message" isTextArea onValueChange={(value) => setMessage(value)} />
							<button type="button" className="td-button secondary" onClick={() => handleSubmit()}>Send</button>
						</form>
						}
					</>
				</SectionLayout>
			</>
		</MainLayout>
		<Footer />
		{isLoading && <Loading style="rotate"/>}
	</>;
}
