import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
	if (!params.id) return null;

	//from clerk
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/on-boarding");

	//from mongodb
	const thread = await fetchThreadById(params.id);

	return (
		<section className="relative">
			<div>
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={user?.id || ""}
					parentId={thread.parentId}
					content={thread.text}
					author={thread.author}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			</div>

			<div className="my-7">
				<Comment
					threadId={JSON.stringify(thread._id)}
					currentUserImg={userInfo.image}
					currentUserId={JSON.stringify(userInfo._id)}
				/>
			</div>

			<div className="mx-10">
				{thread.children.map((child: any) => {
					return (
						<ThreadCard
							key={child._id}
							id={child._id}
							currentUserId={child?.id || ""}
							parentId={child.parentId}
							content={child.text}
							author={child.author}
							community={child.community}
							createdAt={child.createdAt}
							comments={child.children}
							isComment={true}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default Page;
