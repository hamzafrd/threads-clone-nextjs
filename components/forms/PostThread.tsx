"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { createThread } from "@/lib/actions/thread.action";
import { ThreadValidation } from "@/lib/validation/thread";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

function PostThread({ userId }: { userId: string }) {
	const router = useRouter();
	const pathName = usePathname();

	const form = useForm({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: "",
			accountId: userId,
		},
	});

	const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
		await createThread({
			text: values.thread,
			author: userId,
			communityId: null,
			path: pathName,
		});

		router.push("/");
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-10 flex flex-col justify-start gap-10"
			>
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex flex-col  gap-3 w-full">
							<FormLabel className="text-base-semibold text-light-1">
								Content
							</FormLabel>
							<FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-4">
								<Textarea
									rows={15}
									className="account-form_input no-focus"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="bg-primary-500">
					Post Thread
				</Button>
			</form>
		</Form>
	);
}

export default PostThread;
