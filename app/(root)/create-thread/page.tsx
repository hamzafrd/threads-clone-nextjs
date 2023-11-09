import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (userInfo?.onboarded != true) redirect("/on-boarding");

	return (
		<>
			<h1 className="head-text">Create Threads</h1>
			<PostThread userId={userInfo._id} />
		</>
	);
};

export default Page;
