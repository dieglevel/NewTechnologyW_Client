"use client";

import { getAccountApi } from "@/api/auth";
import { BodyView, OptionView, SecondBar, Sidebar } from "@/containers/chat";
import { IntroduceView } from "@/containers/chat/main-body/chat/introduce";
import ContactBody from "@/containers/chat/main-body/contact/contact-body/page";
import InformationModal from "@/containers/chat/sidebar/components/user/modal/information-modal";
import { useOptionView } from "@/hooks/option-view";
import { LocalStorage } from "@/lib/local-storage";
import { socketService } from "@/lib/socket/socket";
import { AppDispatch, RootState } from "@/redux/store";
import { SideBarSelected } from "@/redux/store/ui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
import { initialDataPage } from "./handle-initital-page";
const ChatPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);

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
		initialDataPage()
	}, []);


	useEffect(() => {
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
