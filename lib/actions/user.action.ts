"use server";

import { revalidatePath } from "next/cache";
import User from "../modals/user.model";
import { connectToDB } from "../mongoose";

interface Params {
	userId: string;
	username: string;
	name: string;
	bio: string;
	image: string;
	path: string;
}
export default async function updateUser({
	userId,
	username,
	name,
	bio,
	image,
	path,
}: Params): Promise<void> {
	connectToDB();
	try {
		await User.findOneAndUpdate(
			{ id: userId },

			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: true,
			},

			{
				//updating and inserting
				upsert: true,
			}
		);

		//revalidate path using next
		if (path === "/profile/edit") {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user : ${error.message}}`);
	}
}

export const fetchUser = async (userId: string) => {
	try {
		connectToDB();

		return await User.findOne({ id: userId });
		// 	.populate({
		// 	path: "communities",
		// 	model: Community,
		// });
	} catch (e: any) {
		throw new Error(`Failed to fetch user : ${e.message}`);
	}
};
