"use client";

import { getAccountApi } from "@/api/auth";
import { BodyView, ChatList, OptionView, Sidebar } from "@/containers/chat";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { IDBManager } from "@/lib/idb";
import { LocalStorage } from "@/lib/local-storage";
import { Spinner } from "@heroui/spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { socketService } from "@/lib/socket/socket";
import { useDisclosure } from "@heroui/modal";
import InformationModal from "@/containers/chat/sidebar/components/user/modal/information-modal";
const ChatPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { status: detailInformationStatus } = useSelector((state: RootState) => state.detailInformation);

	useEffect(() => {
		const fetch = async () => {
			const token = localStorage.getItem(LocalStorage.token);
			if (token) {
				const data = await getAccountApi();
				if (data) {
					socketService.connect();
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
			{isLoading ? 
				<Loading />
			 : 
				<div className="flex min-w-[650px] flex-row">
					<InformationModal />
					<Sidebar />
					<ChatList />
					<BodyView />
					<OptionView />
				</div>
			}
		</>
	);
};

export default ChatPage;
