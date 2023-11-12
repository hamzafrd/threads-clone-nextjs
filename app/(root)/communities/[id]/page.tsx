import UsersCard from "@/components/cards/UsersCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants/constant.index";
import { Iuser } from "@/interface";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
	const user = await currentUser();

	if (!user) return null;

	//get id user from other user
	const userInfo: Iuser = await fetchUser(user.id);

	if (!userInfo?.onboarded) redirect("/on-boarding");

	const communityDetails = await fetchCommunityDetails(params.id);
	return (
		<section>
			<ProfileHeader
				accountId={communityDetails.id}
				authUserId={user.id}
				name={communityDetails.name}
				username={communityDetails.username}
				imgUrl={communityDetails.image}
				bio={communityDetails.bio}
				type={"community"}
			/>

			<div className="my-9">
				<Tabs defaultValue="threads" className="w-full">
					<TabsList className="tab">
						{communityTabs.map((tab) => (
							<TabsTrigger key={tab.label} value={tab.value} className="tab">
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className="object-contain"
								/>
								<p className="max-sm:hidden">{tab.label}</p>
								{tab.label === "Threads" && (
									<p
										className="
									ml-1 rounded-sm bg-light-4 px-2 py-1 
									!text-tiny-medium text-light-2"
									>
										{communityDetails?.threads?.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent value={"threads"} className="w-full text-light-1 ">
						<ThreadsTab
							currentUserId={user.id}
							accountId={communityDetails._id}
							accountType={"community"}
						/>
					</TabsContent>
					<TabsContent value={"members"} className="w-full text-light-1 ">
						<section className="mt-9 flex flex-col gap-10">
							{communityDetails.members.map((member: any) => {
								return (
									<UsersCard
										key={member.id}
										id={member.id}
										name={member.name}
										username={member.username}
										imgUrl={member.image}
										personType="User"
									/>
								);
							})}
						</section>
					</TabsContent>
					<TabsContent value={"request"} className="w-full text-light-1 ">
						<ThreadsTab
							currentUserId={user.id}
							accountId={communityDetails._id}
							accountType={"community"}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

export default Page;
