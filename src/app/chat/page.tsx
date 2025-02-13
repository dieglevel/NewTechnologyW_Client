
import { BodyView, ChatView, SideBar } from "@/containers/chat";



const ChatPage = () => {
	return (
		<div className="flex h-full w-full flex-row">
			<SideBar />
			<ChatView />
			<BodyView />
		</div>
	);	
};

export default ChatPage;
