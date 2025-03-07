"use client";

import { BodyView, ChatView, OptionView, SideBar } from "@/containers/chat";
import { SOCKET_EMIT, SOCKET_ON } from "@/lib/socket";
import useSocket from "@/lib/socket/socket.config";
import { BaseResponse, Test } from "@/types";
import { useEffect } from "react";

const ChatPage = () => {
	const socket = useSocket(`${process.env.SOCKET_DOMAIN}:${process.env.SOCKET_PORT}`);

	useEffect(() => {
		socket.onEvent<BaseResponse<Test>>(SOCKET_ON.CONNECT, (response) => {
			console.log("Socket", response.data.message);
		});

		socket.emitEvent(SOCKET_EMIT.JOIN_ROOM, { message: "Hello, World!" });
	}, [socket]);

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
