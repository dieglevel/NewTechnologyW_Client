"use client";

import { getAccountApi } from "@/api/auth";
import { BodyView, ChatList, OptionView, Sidebar } from "@/containers/chat";
import useSocket from "@/hooks/socket";
import { Suspense, useEffect, useState } from "react";
import Loading from "../loading";

const ChatPage = () => {
	const { socket } = useSocket();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetch = async () => {
			const data = await getAccountApi();

			if (data) {
				setIsLoading(false);
			}
		};

		fetch();
	}, []);
	return (
		<>
			{isLoading ? (
			<Loading />) :
			<div className="flex h-full w-full min-w-[650px] flex-row">
				<Sidebar />
				<ChatList />
				<BodyView />
				<OptionView />
			</div>}
		</>
	);
};

export default ChatPage;
