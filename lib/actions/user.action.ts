"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
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

export const fetchUserPosts = async (userId: string) => {
	try {
		connectToDB();
		//TODO Populate community
		const threads = await User.findOne({ id: userId }).populate({
			path: "threads",
			model: Thread,
			populate: {
				path: "children",
				model: Thread,
				populate: {
					path: "author",
					model: User,
					select: "name image id",
				},
			},
		});

		return threads;
	} catch (error: any) {
		throw new Error(`Failed to fetch user posts: ${error.message}`);
	}
};

export const fetchAllUser = async ({
	userId,
	searchString = "",
	pageNumber = 1,
	pageSize = 30,
	sortBy = "desc",
}: {
	userId: string;
	searchString?: string;
	pageNumber?: number;
	pageSize?: number;
	sortBy?: SortOrder;
}) => {
	try {
		connectToDB();
		const skipAmount = (pageNumber - 1) * pageSize;
		const regex = new RegExp(searchString, "i");

		const query: FilterQuery<typeof User> = {
			//ne stands for "not equal"
			id: { $ne: userId },
		};

		if (searchString.trim() !== "") {
			query.$or = [
				{ username: { $regex: regex } },
				{ name: { $regex: regex } },
			];
		}

		const sortOptions = { createdAt: sortBy };

		const usersQuery = User.find(query)
			.sort(sortOptions)
			.skip(skipAmount)
			.limit(pageSize);

		const totalUsersCount = await User.countDocuments(query);

		const users = await usersQuery.exec();

		const isNext = totalUsersCount > skipAmount + users.length;

		return { users, isNext };
	} catch (error: any) {
		throw new Error(`Cannot fetch all other users : ${error.message}`);
	}
};

export const getNotification = async (userId: string) => {
	try {
		connectToDB();

		//find all thread created by Users
		const userThreads = await Thread.find({ author: userId });

		/*example (sum) : [1,2,3]
		 *then: 
		 => 0(prev) | 1(next) (0+1 = 1)
		 => 1 | 2 ( 1 + 2 = 3)
		 => 3 | 3
		 => 6 
		 */
		const childThreadIds = userThreads.reduce((prevThread, nextThread) => {
			/**
			 * [] (prev) | {_id,text,author,children[A{},B{}]} =>
			 *  => A{},B{} | {_id2,text2,author2,children[C{}]}
			 *  => A{},B{},C{}
			 */
			return prevThread.concat(nextThread.children);
		}, []);

		//search child (comments/replies) from db
		const replies = await Thread.find({
			_id: { $in: childThreadIds },
			//ne standsfor "not e" (exluding replies from the same user)
			author: { $ne: userId },
		}).populate({
			path: "author",
			model: User,
			select: "name image _id",
		});

		return replies;
	} catch (error: any) {
		throw new Error(`Failed to fetch notification : ${error.message}`);
	}
};
