"use client";

import { getAccountApi } from "@/api/auth";
import { BodyView, ChatList, OptionView, Sidebar } from "@/containers/chat";
import useSocket from "@/hooks/socket/socket";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { IDBManager } from "@/lib/idb";
import { LocalStorage } from "@/lib/local-storage";
import { Spinner } from "@heroui/spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const ChatPage = () => {
	const { socket } = useSocket();

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const {status: detailInformationStatus} = useSelector((state: RootState) => state.detailInformation);

	useEffect(() => {
		const fetch = async () => {
			const token = localStorage.getItem(LocalStorage.token);
			if (token) {
				const data = await getAccountApi();
				if (data) {
					socket;
				}
			} else {
				localStorage.removeItem(LocalStorage.token);
				window.location.href = "/login";
			}
		};

		fetch();
	}, []);

	useEffect(() => {
		console.log("Detail information status: ", detailInformationStatus);
		if (detailInformationStatus === "succeeded") {
			setIsLoading(false);
		}
	}, [detailInformationStatus]);
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="flex h-full w-full min-w-[650px] flex-row">
					<Sidebar />
					<ChatList />
					<BodyView />
					<OptionView />
				</div>
			)}
		</>
	);
};

export default ChatPage;
