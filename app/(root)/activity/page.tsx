import { Iuser } from "@/interface";
import { fetchUser, getNotification } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Activity = async () => {
	const user = await currentUser();

	if (!user) return null;

	//get id user from other user
	const userInfo: Iuser = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/on-boarding");

	//getActivity/notification

	const activities = await getNotification(userInfo._id);

	return (
		<section>
			<h1 className="head-text mb-10">Activity</h1>

			<section className="mt-10 flex flex-col gap-5">
				{activities.length > 0 ? (
					<>
						{activities.map((activity) => (
							<Link key={activity._id} href={`/thread/${activity.parentId}`}>
								<article className="activity-card">
									<Image
										src={activity.author.image}
										alt="profile image"
										width={20}
										height={20}
										className="rounded-full object-cover"
									/>
									<p className="!text-small-regular text-light-1">
										<span className="mr-1 text-purple-500">
											{activity.author.name}
										</span>{" "}
										replied to your comment
									</p>
								</article>
							</Link>
						))}
					</>
				) : (
					<p className="no-result">No activities yet</p>
				)}
			</section>
		</section>
	);
};

export default Activity;
