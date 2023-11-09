import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
	const userInfo = {
		// id: null,
		// username: null
		// name: "test name",
		// bio: "test bio",
		// image: null,
	};
	// console.log(`currentUser ${await currentUser()}`);

	const userData = {
		id: (await currentUser())?.id,
		objectId: userInfo?.id,
		username: userInfo?.username || (await currentUser())?.username,
		name: userInfo?.name || (await currentUser())?.firstName || "",
		bio: userInfo?.bio || "",
		image: userInfo?.image || (await currentUser())?.imageUrl,
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
