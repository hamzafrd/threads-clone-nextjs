"use server";
import { revalidatePath } from "next/cache";
import Thread from "../modals/thread.model";
import User from "../modals/user.model";
import { connectToDB } from "../mongoose";

interface Params {
	text: string;
	author: string;
	communityId: string | null;
	path: string;
}
export const createThread = async ({
	text,
	author,
	communityId,
	path,
}: Params) => {
	try {
		connectToDB();

		const createdThread = await Thread.create({
			text,
			author,
			communityId: null,
		});

		//update user model, because user have access to thread (of course)
		await User.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id },
		});

		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Error creating thread: ${error.message}`);
	}
};

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
	connectToDB();
	// Calculate number of post
	const skipAmount = (pageNumber - 1) * pageSize;

	//fetch post that have no parent
	const postQuery = Thread.find({ parentId: { $in: [null, undefined] } })
		.sort({ createdAt: "desc" })
		.skip(skipAmount)
		.limit(pageSize)
		.populate({ path: "author", model: User })
		.populate({
			path: "children",
			populate: {
				path: "author",
				model: User,
				select: "_id name parentId image",
			},
		});

	const totalPostCount = await Thread.countDocuments({
		parentId: { $in: [null, undefined] },
	});

	const posts = await postQuery.exec();

	const isNext = totalPostCount > skipAmount + posts.length;

	return { posts, isNext };
};

import React from "react";

export const fetchThreadById = async (id: string) => {
	connectToDB();
	try {
		// TODO: pupolate Community

		const thread = await Thread.findById(id)
			.populate({
				path: "author",
				model: User,
				select: "_id id name image",
			})
			.populate({
				path: "children",
				model: User,
				populate: [
					{
						path: "author",
						model: User,
						select: "_id id parentId image",
					},
					{
						path: "children",
						model: User,
						populate: {
							path: "author",
							model: User,
							select: "_id id name parentId image",
						},
					},
				],
			})
			.exec();

		return thread;
	} catch (error: any) {
		throw new Error(`Error fetching thread : ${error.message}`);
	}
};
