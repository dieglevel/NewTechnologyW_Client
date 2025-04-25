"use client";

import { useEffect, useState } from "react";
import { BodyChat, FooterChat, HeaderChat } from "./components";
import { getMessageByRoomId, getProfileFromAnotherUser } from "@/api";
import { IDetailInformation } from "@/types/implement";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMessageByRoomId, setMessage, setOneMessage } from "@/redux/store/models/message-slice";
import { socketService } from "@/lib/socket/socket";
import { SocketEmit, SocketOn } from "@/constants/socket";
import Loading from "@/app/loading";
import { Spinner } from "@heroui/spinner";
import { setRoom } from "@/redux/store/models";
import { normalizeMessage, normalizeRoom } from "@/utils";
import { IRoom } from "@/types/implement/room.interface";
import { Socket } from "socket.io-client";

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
		socketService.emit(SocketEmit.joinRoom, {
			room_id: selectedRoom?.id,
		});

		socketService.on(SocketOn.sendMessage, async (data) => {
			const { message, behavior } = data;

			console.log("???????room: ", data);

			switch (behavior) {
				case "add":
					await dispatch(setOneMessage(message));
					await dispatch(fetchMessageByRoomId(selectedRoom?.id || ""));
					break;
				case "update":
					await dispatch(setOneMessage(message)); 
					await dispatch(fetchMessageByRoomId(selectedRoom?.id || "")); 
					break;
				case "revoke":
					
					await dispatch(setOneMessage(message)); 
					await dispatch(fetchMessageByRoomId(selectedRoom?.id || "")); 
					break;
				case "delete":
					// await dispatch(setRoom([room]));
					break;
				default:
					break;
			}
		});

		return () => {
			socketService.off(SocketOn.joinRoom);
			socketService.off(SocketOn.sendMessage);
			socketService.off(SocketOn.getRevokeMessage);
		}
	}, [selectedRoom]);

	useEffect(() => {
		if (!selectedRoom) return;

		const fetchMessages = async () => {
			setIsLoading(true);
			console.log("selectedRoomId: ", selectedRoom);
			const data = await getMessageByRoomId(selectedRoom.id || "");
			if (data && data.data) {
				dispatch(setMessage({ messages: data.data}));
			}

			await dispatch(fetchMessageByRoomId(selectedRoom.id || ""));
			setIsLoading(false);
		};

		fetchMessages();
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
