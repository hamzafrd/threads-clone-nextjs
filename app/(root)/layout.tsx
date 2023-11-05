import { ClerkProvider } from "@clerk/nextjs";
import "app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Bottombar from "../../components/shared/Bottombar";
import LeftSidebar from "../../components/shared/LeftSidebar";
import RightSidebar from "../../components/shared/RightSidebar";
import Topbar from "../../components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Threads",
	description: "A next.js 14 Meta Threads Application",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<Topbar />
					<main className="flex">
						<LeftSidebar />
						<section className="main-container">
							<div className="w-full max-w-4xl">{children}</div>
						</section>
						<RightSidebar />
					</main>
					<Bottombar />
				</body>
			</html>
		</ClerkProvider>
	);
}
