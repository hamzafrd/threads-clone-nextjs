import CommunityCard from "@/components/cards/CommunityCard";
import { Iuser } from "@/interface";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Communities = async () => {
	const user = await currentUser();

	if (!user) return null;

	//get id user from other user
	const userInfo: Iuser = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/on-boarding");

	//fetch all communities
	const result = await fetchCommunities({
		searchString: "",
		pageNumber: 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			{/* Search Bar */}

			<div className="mt-14 flex flex-col gap-9">
				{result.communities.length === 0 ? (
					<p className="no-result">No Users</p>
				) : (
					<>
						{result.communities.map((community) => {
							return (
								<CommunityCard
									key={community.id}
									id={community.id}
									name={community.name}
									username={community.username}
									imgUrl={community.image}
									bio={community.bio}
									members={community.members}
								/>
							);
						})}
					</>
				)}
			</div>
		</section>
	);
};

export default Communities;
