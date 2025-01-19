import { ChatProfile } from "@/components/list-chat/chat-profile";
import { SearchComponent } from "./search";

export const ChatView = () => {
	return (
		<div className="w-1/4 flex h-lvh flex-col flex-wrap gap-2 bg-white border-r-1 border-border">
			<SearchComponent />
			<div className="flex flex-col gap-1">
{/* { for 5 } */
[...Array(5)].map((_, index) => (
	<ChatProfile key={index} userName="Nguyễn Văn A" imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
	message={{isReceived: true, text: ` ⚠ The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.`}}
	timeSent={new Date()}
	type="user" 
	
	/>))}
			</div>
		</div>
	);
};
