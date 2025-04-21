"use client";

import { getAccountApi } from "@/api/auth";
import { BodyView, OptionView, SecondBar, Sidebar } from "@/containers/chat";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { LocalStorage } from "@/lib/local-storage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/redux/store";
import { socketService } from "@/lib/socket/socket";
import InformationModal from "@/containers/chat/sidebar/components/user/modal/information-modal";
import { useOptionView } from "@/hooks/option-view";
import { SideBarSelected } from "@/redux/store/ui";
import { getListFriend, getListResponseFriend, getListSended } from "@/api";
import { initMyListFriend, initRequestFriend, setMyListFriend, setRequestFriend } from "@/redux/store/models";
import { ErrorResponse } from "@/lib/axios";
import ContactBody from "@/containers/chat/main-body/contact/contact-body/page";
import { initSendedFriend, setSendedFriend } from "@/redux/store/models/sended-friend-slice";
import { IntroduceView } from "@/containers/chat/main-body/chat/introduce";
const ChatPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch<AppDispatch>();

	const { status: detailInformationStatus } = useSelector((state: RootState) => state.detailInformation);
	const { selected } = useSelector((state: RootState) => state.sidebar);
	const { isOpen } = useOptionView();
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);

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
		const fetch = async () => {
			try {
				const response = await getListFriend();
				if (response?.statusCode === 200) {
					// console.log("response: ", response.data);
					store.dispatch(initMyListFriend(response.data));
				}
			} catch (error) {
				const e = error as ErrorResponse;
			}
		};

		fetch();
	}, []);

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await getListSended();
				if (response?.statusCode === 200) {
					// console.log("response: ", response.data);
					store.dispatch(initSendedFriend(response.data));
				}
			} catch (error) {
				const e = error as ErrorResponse;
			}
		};
		fetch();
	}, []);

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await getListResponseFriend();
				if (response?.statusCode === 200) {
					// console.log("response: ", response.data);
					store.dispatch(initRequestFriend(response.data));
				}
			} catch (error) {
				const e = error as ErrorResponse;
			}
		};
		fetch();
	}, []);

	useEffect(() => {
		// console.log("Detail information status: ", detailInformationStatus);
		// console.log("Status: ", status);
		if (detailInformationStatus === "succeeded") {
			setIsLoading(false);
		}
	}, [detailInformationStatus]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="flex h-screen min-w-[650px] flex-row">
					<InformationModal />
					<Sidebar />
					<SecondBar />
					{selected === SideBarSelected.Chat ? (
						<>
							{selectedRoom?.id ? (
								<>
									<BodyView />
									{isOpen && <OptionView />}
								</>
							) : (
								<IntroduceView />
							)}
						</>
					) : (
						<ContactBody />
					)}
				</div>
			)}
		</>
	);
};

export default ChatPage;
