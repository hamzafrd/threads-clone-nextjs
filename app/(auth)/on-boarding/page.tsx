import AccountProfile from "@/components/forms/AccountProfile";
import { Iuser } from "@/interface";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

async function Page() {
	const clerkUser = await currentUser();
	const userDb: Iuser = clerkUser?.id
		? await fetchUser(clerkUser?.id)
		: undefined;
	const userData = {
		id: userDb?.id,
		objectId: userDb?._id,
		username: userDb?.username || (await currentUser())?.username,
		name: userDb?.name || (await currentUser())?.firstName || "",
		bio: userDb?.bio || "",
		image: userDb?.image || (await currentUser())?.imageUrl,
	};
	return (
		<main
			className="mx-auto flex max-w-3xl flex-col 
    justify-start px-10 py-20"
		>
			<h1 className="head-text">Hello OnBoarding</h1>
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
