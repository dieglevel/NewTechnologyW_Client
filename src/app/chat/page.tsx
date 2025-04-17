"use client";

import { getAccountApi } from "@/api/auth";
import { BodyView, ChatList, OptionView, Sidebar } from "@/containers/chat";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { IDBManager } from "@/lib/idb";
import { LocalStorage } from "@/lib/local-storage";
import { Spinner } from "@heroui/spinner";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import { socketService } from "@/lib/socket/socket";
import { useDisclosure } from "@heroui/modal";
import InformationModal from "@/containers/chat/sidebar/components/user/modal/information-modal";
import { useOptionView } from "@/hooks/option-view";
import { SideBarSelected } from "@/redux/store/ui";
import Contact from "@/containers/chat/contact/contact";
import { getListFriend } from "@/api";
import { setMyListFriend } from "@/redux/store/models";
import { ErrorResponse } from "@/lib/axios";
const ChatPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { status: detailInformationStatus } = useSelector((state: RootState) => state.detailInformation);
	const { selected } = useSelector((state: RootState) => state.sidebar);
	const { status: roomStatus } = useSelector((state: RootState) => state.listRoom);
	const { isOpen } = useOptionView();

	useEffect(() => {
		const fetch = async () => {
			setIsLoading(true);
			const token = localStorage.getItem(LocalStorage.token);
			if (token) {
				const data = await getAccountApi();
				if (data) {
					socketService.connect();

					if (data.statusCode === 200) {
						const detailInformation = data.data.detailInformation;
						if (
							!detailInformation.fullName &&
							!detailInformation.avatarUrl &&
							!detailInformation.gender &&
							!detailInformation.dateOfBirth
						) {
							window.location.href = "/update-profile";
							return;
						}
					}
				}
			} else {
				localStorage.removeItem(LocalStorage.token);
				window.location.href = "/login";
			}
		};

		fetch();
	}, []);

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await getListFriend();
				if (response?.statusCode === 200) {
					console.log("response: ", response.data);
					store.dispatch(setMyListFriend(response.data));
				}
			} catch (error) {
				const e = error as ErrorResponse;
			}
		};

		fetch();
	}, []);

	useEffect(() => {
		console.log("Detail information status: ", detailInformationStatus);
		console.log("Room status: ", roomStatus);
		if (detailInformationStatus === "succeeded" && roomStatus === "succeeded") {
			setIsLoading(false);
		}
	}, [detailInformationStatus, roomStatus]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="flex min-w-[650px] flex-row">
					<InformationModal />
					<Sidebar />
					{selected === SideBarSelected.Chat ? (
						<>
							<ChatList />
							<BodyView />
							{isOpen && <OptionView />}
						</>
					) : (
						<>
							<Contact />
						</>
					)}
				</div>
			)}
		</>
	);
};

export default ChatPage;
