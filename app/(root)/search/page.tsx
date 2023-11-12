import UsersCard from "@/components/cards/UsersCard";
import { Iuser } from "@/interface";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Search = async () => {
	const user = await currentUser();

	if (!user) return null;

	//get id user from other user
	const userInfo: Iuser = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/on-boarding");

	//fetch all other users
	const result = await fetchUsers({
		userId: user.id,
		searchString: "",
		pageNumber: 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			{/* Search Bar */}

			<div className="mt-14 flex flex-col gap-9">
				{result.users.length === 0 ? (
					<p className="no-result">No Users</p>
				) : (
					<>
						{result.users.map((person) => {
							return (
								<UsersCard
									key={person.id}
									id={person.id}
									name={person.name}
									username={person.username}
									imgUrl={person.image}
									personType={"user"}
								/>
							);
						})}
					</>
				)}
			</div>
		</section>
	);
};

export default Search;
