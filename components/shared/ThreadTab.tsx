import { Iauthor, Ithread } from "@/interface";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
	currentUserId: string;
	accountId: string;
	accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
	//get data from database
	let result =
		accountType.toLowerCase() === "user"
			? await fetchUserPosts(accountId)
			: await fetchCommunityPosts(accountId);

	const author: Iauthor = {
		name: result.name,
		image: result.image,
		id: result.id,
	};

	if (!result) redirect("/");
	return (
		<section className="mt-9 flex flex-col gap-10">
			{result.threads.map((thread: Ithread) => (
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={currentUserId}
					parentId={thread.parentId}
					content={thread.text}
					author={accountType.toLowerCase() === "user" ? author : thread.author} // todo
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			))}
		</section>
	);
};

export default ThreadsTab;
