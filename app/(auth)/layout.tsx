import { ClerkProvider } from "@clerk/nextjs";
import "app/globals.css";
import { Inter } from "next/font/google";
export const metadata = {
	title: "Threads",
	description: "A next.js 14 Meta Threads Application",
};

type children = {
	children: React.ReactNode;
};

const inter = Inter({
	subsets: ["latin"],
});
export default function RootLayout({ children }: children) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${inter.className} bg-dark-4`}>
					<div className="w-full flex justify-center items-center min-h-screen">
						{children}
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
