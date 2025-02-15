import { BodyView, ChatView, OptionView, SideBar } from "@/containers/chat";

const ChatPage = () => {
	return (
		<div className="flex h-full w-full flex-row">
			<SideBar />
			<ChatView />
			<BodyView />
			<OptionView />
		</div>
	);
};

export default ChatPage;
