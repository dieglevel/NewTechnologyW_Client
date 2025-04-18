"use client";

import { getAccountApi } from "@/api/auth";
import { BodyView, ChatList, OptionView, Sidebar } from "@/containers/chat";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { IDBManager } from "@/lib/idb";
import { LocalStorage } from "@/lib/local-storage";
import { Spinner } from "@heroui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { socketService } from "@/lib/socket/socket";
import { useDisclosure } from "@heroui/modal";
import InformationModal from "@/containers/chat/sidebar/components/user/modal/information-modal";
import { useOptionView } from "@/hooks/option-view";
import { SideBarSelected } from "@/redux/store/ui";
import Contact from "@/containers/chat/contact/contact";
import { fetchRoom } from "@/redux/store/models";
const ChatPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();

	const { status: detailInformationStatus } = useSelector((state: RootState) => state.detailInformation);
	const { selected } = useSelector((state: RootState) => state.sidebar);
	const { isOpen } = useOptionView();
	const { status } = useSelector((state: RootState) => state.listRoom);

	useEffect(() => {
		const fetch = async () => {
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
		console.log("Detail information status: ", detailInformationStatus);
		console.log("Status: ", status);
		if (detailInformationStatus === "succeeded") {
			setIsLoading(false);
		}
	}, [detailInformationStatus]);

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
