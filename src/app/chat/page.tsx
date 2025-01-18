import { SideBar } from "@/containers/layout";
import { ChatView } from "@/containers/list-chat";


const ChatPage = () => {
	return (
		<div className="flex h-full w-full flex-row">
			<SideBar />
			<ChatView />
		</div>
	);
};

export default ChatPage;
