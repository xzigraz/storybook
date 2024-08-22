import React from "react";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "normalize.css";
import "@/ui-component/scss/_baseline.scss";
import "@/assets/scss/style.scss";

const comfortaa = Comfortaa({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "The Departed Online by Daniel Zhu",
	description: "A personal portfolio described in a timeline fashion.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={comfortaa.className}>{children}</body>
		</html>
	);
}
