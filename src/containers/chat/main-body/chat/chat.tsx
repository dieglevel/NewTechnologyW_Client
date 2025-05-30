"use client";

import { useEffect, useState } from "react";
import { BodyChat, FooterChat, HeaderChat } from "./components";
import { getMessageByRoomId, getProfileFromAnotherUser } from "@/api";
import { IDetailInformation, IMessage } from "@/types/implement";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMessageByRoomId, setMessage, setOneMessage } from "@/redux/store/models/message-slice";
import { socketService } from "@/lib/socket/socket";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { Spinner } from "@heroui/spinner";
import { DisbandedGroup } from "./main-option/components/disband-group";
import { PinnedMessageBar } from "./components/pin";	
import { useReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";



export const BodyView = () => {
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const dispatch = useDispatch<AppDispatch>();

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { isLoadingRoom } = useSelector((state: RootState) => state.selectedRoom);

	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	useEffect(() => {
		socketService.emit(SocketEmit.joinRoom, {
			room_id: selectedRoom?.id,
		});

		socketService.on(SocketOn.sendMessage, async (data) => {

			const { message, behavior } = data;
			console.log(data)

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
					message.content = "Tin nhắn đã bị thu hồi";
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
		};
	}, [selectedRoom]);

	useEffect(() => {
		if (!selectedRoom) return;
		setIsLoading(true);

		if (!selectedRoom.isDisbanded) {
			const fetchMessages = async () => {
				const data = await getMessageByRoomId(selectedRoom.id || "");
				await dispatch(setMessage({ messages: data.data }));
				await dispatch(fetchMessageByRoomId(selectedRoom.id || ""));
			};

			fetchMessages();
		}
		setIsLoading(false);
	}, [selectedRoom]);

	return !isLoadingRoom ? (
		<div className="flex h-full w-full flex-col">
			<HeaderChat imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg" />
			{isLoading ? (
				<div className="flex h-full w-full items-center justify-center">
					<Spinner size="lg" />
				</div>
			) : !selectedRoom?.isDisbanded ? (
				<>
					<PinnedMessageBar />
					<BodyChat />
					<FooterChat />
				</>
				// <div>
				// 	<p>Microphone: {listening ? "on" : "off"}</p>
				// 	<button onClick={SpeechRecognition.startListening({ continuous: true, language: "vi-VN" })}>Start</button>
				// 	<button onClick={SpeechRecognition.stopListening}>Stop</button>
				// 	<button onClick={resetTranscript}>Reset</button>
				// 	<p>{transcript}</p>
				// </div>
			) : (
				<DisbandedGroup />
			)}
		</div>
	) : (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<Spinner label="Đang tải tin nhắn..." />
		</div>
	);
};
