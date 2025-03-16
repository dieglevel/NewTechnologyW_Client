"use client";

import { getAccountApi } from "@/api/auth";
import { BodyView, ChatView, OptionView, SideBar } from "@/containers/chat";
import useSocket from "@/hooks/socket";
import { useEffect } from "react";

const ChatPage = () => {
	const { socket } = useSocket();

	useEffect(() => {
		const fetch = async () => {
				const data = await getAccountApi();
		};

		fetch();
	}, []);

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
