import {
	OrganizationSwitcher,
	RedirectToSignIn,
	SignOutButton,
	SignedIn,
	SignedOut,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function Topbar() {
	return (
		<nav className="topbar">
			<Link href={"/"} className="flex items-center gap-4">
				<Image
					src={"/assets/logo.svg"}
					alt="logo"
					width={20}
					height={28}
					style={{ width: "auto", height: "auto" }}
				/>
				<p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
			</Link>

			<div className="flex items-center gap-1 text-white">
				<div className="block md:hidden">
					<SignedIn>
						<SignOutButton>
							<div className="flex cursor-pointer">
								<Image
									src={"/assets/logout.svg"}
									alt="logout"
									width={24}
									height={24}
								/>
							</div>
						</SignOutButton>
					</SignedIn>
				</div>

				<OrganizationSwitcher
					appearance={{
						baseTheme: dark,
						elements: {
							organizationSwitcherTrigger: "py-2 px-4",
						},
					}}
				/>
			</div>
		</nav>
	);
}
