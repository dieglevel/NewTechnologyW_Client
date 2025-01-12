import { SideBar } from "@/components/containers/layout";
import { ChatView } from "@/components/containers/list-chat";

const ChatPage = () => {
	return (
		<div className="flex">
			<SideBar  />
			<ChatView />
		</div>
	);
};

export default ChatPage;
