import React from "react";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "normalize.css";
import "@/ui-component/scss/_baseline.scss";
import "@/assets/scss/style.scss";

const comfortaa = Comfortaa({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "The Departed Online by Daniel Zhu",
	description: "A personal portfolio website by veteran Front End engineer with over 17 years of coding, managing and mentoring experiences.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />
			</head>
			<body className={comfortaa.className}>{children}</body>
		</html>
	);
}
