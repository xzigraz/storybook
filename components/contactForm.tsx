'use client';

import { useState } from "react";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import Link from "next/link";
import { PATH_LINKEDIN, PATH_RESUME } from "@/constants/paths";
import { TextInput } from "@/ui-component/TextInput/textInput";
import { Loading } from "@/ui-component/Loading/loading";

export interface FormType {
	Name: string
	Email: string
	Phone?: string
	Message?: string
}

const ContactForm = () => {
	const [form, setForm] = useState<FormType>({
		Name: "",
		Email: "",
		Phone: "",
		Message: ""
	})
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSubmitSuccess, setIsSubmitSuccess] = useState<"success" | "error" | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		setForm({...form, [e.target.name]: e.target.value});
	}

	const handleSubmit = async () => {
		setIsLoading(true);
		await fetch("/api/contact", {method: "POST", body: JSON.stringify(form)})
		.then(res => res.json())
		.then(data => {
			setIsLoading(false);
			setIsSubmitSuccess(data.result);
		})
		.catch(error => console.log(error));
	}

	return <>
		<MainLayout className="contact peach-white">
			<>
				<SectionLayout className="contact-form">
					<>
						<h1>Contact Me</h1>
						<p>Like what you see so far? Let's talk and see what I can help you with! Here's
							my <Link href={PATH_RESUME} rel="noopener noreferrer" target="_blank">resume</Link>,
							and my <a href={PATH_LINKEDIN}>LinkedIn</a>, you can also reach me via the form below.</p>
						{isSubmitSuccess === "success"
							? <p>Thank you for reaching out. I'll get back to you in 24 hours.</p>
							: <form>
								<TextInput label="Name" name="Name" isRequired onValueChange={(e) => handleInputChange(e)} />
								<TextInput label="Email" name="Email" isRequired onValueChange={(e) => handleInputChange(e)} />
								<TextInput label="Phone" name="Phone" onValueChange={(e) => handleInputChange(e)} />
								<TextInput label="Message" name="Message" isTextArea onValueChange={(e) => handleInputChange(e)} />
								<button type="button" className="td-button secondary" onClick={() => handleSubmit()}>Send</button>
							</form>
						}
					</>
				</SectionLayout>
			</>
		</MainLayout>
		{isLoading && <Loading style="rotate" />}
	</>;
}

export default ContactForm;