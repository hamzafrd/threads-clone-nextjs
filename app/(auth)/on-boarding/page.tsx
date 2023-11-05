import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { userInfo } from "os";

async function Page() {
	const user = await currentUser();
	const useInfo = {};
	console.log(user);

	const userData = {
		id: user?.id,
		objectId: userInfo?.id,
		username: userInfo?.username || user?.username,
		name: userInfo?.name || user?.firstName || "",
		bio: userInfo?.bio || "",
		image: userInfo?.image || user?.imageUrl,
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
				<AccountProfile user={userData} btnTtitle="Continue" />
			</section>
		</main>
	);
}

export default Page;
