import ContactForm from "@/components/contactForm";
import "./_contact.page.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact Me | The Departed Online",
	description: "If you like what you see here, you can reach out to me via the Contact me form.",
};

export default function Projects() {
	return <ContactForm />
}
