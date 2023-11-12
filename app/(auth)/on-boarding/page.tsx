import AccountProfile from "@/components/forms/AccountProfile";
import { Iuser } from "@/interface";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
	const clerkUser = await currentUser();

	const userDb: Iuser = clerkUser?.id && (await fetchUser(clerkUser?.id));

	if (userDb?.onboarded) redirect("/");

	const userData = {
		id: (clerkUser && clerkUser.id) || "",
		objectId: userDb && userDb._id,
		username: userDb ? userDb.username : clerkUser?.username,
		name: userDb ? userDb.name : clerkUser?.firstName || "",
		bio: userDb ? userDb.bio : "",
		image: userDb ? userDb.image : clerkUser?.imageUrl,
	};

	return (
		<main
			className="mx-auto flex max-w-3xl flex-col 
    justify-start px-10 py-20"
		>
			<h1 className="head-text">OnBoarding</h1>
			<p className="mt-3 text-base-regular text-light-2">
				Complete your profile name to use Threads
			</p>

			<section className="mt-9 bg-dark-2 p-10">
				<AccountProfile user={userData} btnTitle="Continue" />
			</section>
		</main>
	);
}

export default Page;
