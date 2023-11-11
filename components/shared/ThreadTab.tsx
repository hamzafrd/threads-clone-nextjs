import { Iauthor, Ithread, Iuser } from "@/interface";
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
	let result: Iuser = await fetchUserPosts(accountId);

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
					community={thread.community} //todo
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			))}
		</section>
	);
};

export default ThreadsTab;
