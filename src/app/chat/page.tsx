"use client";

import { getAccountApi } from "@/api/auth";
import { BodyView, OptionView, SecondBar, Sidebar } from "@/containers/chat";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { LocalStorage } from "@/lib/local-storage";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import { socketService } from "@/lib/socket/socket";
import InformationModal from "@/containers/chat/sidebar/components/user/modal/information-modal";
import { useOptionView } from "@/hooks/option-view";
import { SideBarSelected } from "@/redux/store/ui";
import { getListFriend, getListResponseFriend, getListSended } from "@/api";
import { setMyListFriend, setRequestFriend } from "@/redux/store/models";
import { ErrorResponse } from "@/lib/axios";
import ContactBody from "@/containers/chat/main-body/contact/contact-body/page";
import { setSendedFriend } from "@/redux/store/models/sended-friend-slice";
const ChatPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();

	const { status: detailInformationStatus } = useSelector((state: RootState) => state.detailInformation);
	const { selected } = useSelector((state: RootState) => state.sidebar);
	const { isOpen } = useOptionView();

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
		const fetch = async () => {
			try {
				const response = await getListSended();
				if (response?.statusCode === 200) {
					console.log("response: ", response.data);
					store.dispatch(setSendedFriend(response.data));
				}
			} catch (error) {
				const e = error as ErrorResponse;
			}
		};
;
		fetch()
	}, []);

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await getListResponseFriend();
				if (response?.statusCode === 200) {
					console.log("response: ", response.data);
					store.dispatch(setRequestFriend(response.data));
				}
			} catch (error) {
				const e = error as ErrorResponse;
			}
		};
;
		fetch()
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
				<div className="flex min-w-[650px] flex-row h-screen">
					<InformationModal />
					<Sidebar />
					<SecondBar />
					{selected === SideBarSelected.Chat ? (
						<>
							<BodyView />
							{isOpen && <OptionView />}
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
