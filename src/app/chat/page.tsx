"use client";

import { BodyView, ChatView, OptionView, SideBar } from "@/containers/chat";
import { SOCKET_ON } from "@/lib/socket";
import useSocket from "@/lib/socket/socket.config";
import { BaseResponse } from "@/types";
import { useEffect } from "react";

const ChatPage = () => {
	const socket = useSocket({
		url: `${process.env.NEXT_PUBLIC_SOCKET_URL}`,
		token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1NTE1NGM0LTM5MzMtNDBkNi1iNGY3LTVmYjg3NTk4MDVhMSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicGhvbmUiOiJhZG1pbiIsImlhdCI6MTc0MTM1ODk2OSwiZXhwIjoxNzQxNDQ1MzY5fQ.NQGQFjBi-zOARigf07eT-RN9F43DgyCOuTwndkMJjpBqupbAwIVlYms9Xhi-VokJwbPUJijZB7nlacHbOiLjnEqoE0038T2L3XfGojJ2tQoDSnSoDRDjZN2TwZ295hLXPxRcLDBiU5U9CfLV6-PfmSWIykwVN3QlA9nOU6j01apP_8t4ZtPPr1SSILFjXC9n9e4w8uyq5brXyRGuEDvdcfQqbU_NF_J2Cq3uzTRzk3ric8dClV4S5BFwes75rZjdf2kHLzy6WZgNK-84wgjgJyfGUumW8xTlQb8zgEWiLbHPrjYGpLCpTNY4kHfhbcUaaOpmXNQFlRAqV9aSBa12dg",
	});

	useEffect(() => {
		if (socket.isConnected) {
			socket.onEvent<BaseResponse<any>>(SOCKET_ON.connectServer, (response) => {
				console.log("Socket", response);
			});
	
			socket.onEvent<BaseResponse<any>>(SOCKET_ON.myListRoom, (response) => {
				console.log("Socket", response);
			});
		}
	}, [socket]);

	useEffect(() => {
		if (socket.isConnected) {
			socket.emitEvent(SOCKET_ON.connectServer, {});

			socket.emitEvent(SOCKET_ON.myListRoom, {});
		}
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
