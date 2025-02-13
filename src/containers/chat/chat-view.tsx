import { ChatProfile } from "@/components/list-chat/chat-profile";
import { SearchComponent } from "../../components/list-chat/search";

export const ChatView = () => {
	return (
		<div className="flex h-lvh min-w-28 w-96 flex-col flex-wrap gap-2 border-r-1 border-border bg-white">
			<SearchComponent />
			<div className="flex flex-col gap-1">
				{
					/* { for 5 } */
					[...Array(5)].map((_, index) => (
						<ChatProfile
							key={index}
							userName="Nguyễn Văn A"
							imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
							message={{
								isReceived: true,
								text: ` ⚠ The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.`,
							}}
							timeSent={new Date()}
							type="user"
						/>
					))
				}
			</div>
		</div>
	);
};
