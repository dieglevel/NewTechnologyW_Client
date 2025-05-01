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
import { Spinner } from "@heroui/spinner";
import { DisbandedGroup } from "./main-option/components/disband-group";


export const BodyView = () => {
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const dispatch = useDispatch<AppDispatch>();

	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		socketService.emit(SocketEmit.joinRoom, {
			room_id: selectedRoom?.id,
		});

		socketService.on(SocketOn.sendMessage, async (data) => {
			const { message, behavior } = data;

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
		};
	}, [selectedRoom]);

	useEffect(() => {
		if (!selectedRoom) return;
		setIsLoading(true);

		if (!selectedRoom.isDisbanded) {
			const fetchMessages = async () => {
				const data = await getMessageByRoomId(selectedRoom.id || "");
				if (data && data.data) {
					dispatch(setMessage({ messages: data.data }));
				}

				await dispatch(fetchMessageByRoomId(selectedRoom.id || ""));
			};

			fetchMessages();
		}
		setIsLoading(false);
	}, [selectedRoom, status]);

	return (
		<div className="flex h-lvh w-full flex-col">
			<HeaderChat imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg" />
			{isLoading ? (
				<div className="flex h-full w-full items-center justify-center">
					<Spinner size="lg" />
				</div>
			) : !selectedRoom?.isDisbanded ? (
				<>
					<BodyChat />
					<FooterChat />
				</>
			) : (
				<DisbandedGroup />
			)}
		</div>
	);
};
