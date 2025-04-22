"use client";

import { useEffect, useState } from "react";
import { BodyChat, FooterChat, HeaderChat } from "./components";
import { getMessageByRoomId, getProfileFromAnotherUser } from "@/api";
import { IDetailInformation } from "@/types/implement";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMessageByRoomId, setMessage } from "@/redux/store/models/message-slice";
import { socketService } from "@/lib/socket/socket";
import { SocketOn } from "@/constants/socket";
import Loading from "@/app/loading";
import { Spinner } from "@heroui/spinner";

// interface Props {
// 	account_id: string;
// }

export const BodyView = () => {
	// const [profile, setProfile] = useState<IDetailInformation>({} as IDetailInformation);
	// useEffect(() => {
	// 	const fetchDetailInformation = async () => {
	// 		const
	// 		const response = await getProfileFromAnotherUser(account_id);
	// 		if (response.data) {
	// 			setProfile(response.data);
	// 		}
	// 	};
	// 	fetchDetailInformation();
	// }, [account_id]);

	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const dispatch = useDispatch<AppDispatch>();

	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!selectedRoom) return;

		const fetchMessages = async () => {
			setIsLoading(true);
			console.log("selectedRoomId: ", selectedRoom);
			const data = await getMessageByRoomId(selectedRoom.id);
			console.log("data: ", data);
			if (data && data.data) {
				dispatch(setMessage({ messages: data.data, roomId: selectedRoom.id }));
			}

			await dispatch(fetchMessageByRoomId(selectedRoom.id));
			setIsLoading(false);
		};

		fetchMessages();

		return () => {
			socketService.off(SocketOn.getMessageByChatRoom); // Clean up the socket listener
		};
	}, [selectedRoom, status]);

	return (
		<div className="flex h-lvh w-full flex-col">
			<HeaderChat imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg" />
			{isLoading ? (
				<div className="flex h-full w-full items-center justify-center">

					<Spinner size="lg" />
				</div>
			) : (
				<>
					<BodyChat />
					<FooterChat />
				</>
			)}
		</div>
	);
};
