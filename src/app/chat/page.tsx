import { SideBar } from "@/components/containers/layout";
import { ChatView } from "@/components/containers/list-chat";

const ChatPage = () => {
	return (
		<div className="flex h-full w-full flex-row">
			<SideBar />
			<ChatView />
		</div>
	);
};

export default ChatPage;
