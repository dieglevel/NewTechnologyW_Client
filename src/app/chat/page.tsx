"use client";

import { BodyView, ChatView, OptionView, SideBar } from "@/containers/chat";
import useSocket from "@/hooks/socket";

const ChatPage = () => {
	const { socket } = useSocket();

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
