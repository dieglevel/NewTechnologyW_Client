
import { SideBar } from "@/containers/chat";
import { ChatView } from "@/components/list-chat";



const ChatPage = () => {
	return (
		<div className="flex h-full w-full flex-row">
			<SideBar />
			<ChatView />
		</div>
	);	
};

export default ChatPage;
