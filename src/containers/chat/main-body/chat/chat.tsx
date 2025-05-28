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
import { ChevronDown, MessageCircle, MoreHorizontal } from "lucide-react";
import PinnedMessagesDropdown from "./main-option/components/modal-pinned";
import { LocalStorage } from "@/lib/local-storage";

export const BodyView = () => {
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const { message } = useSelector((state: RootState) => state.message);
	const dispatch = useDispatch<AppDispatch>();

	const userId = localStorage.getItem(LocalStorage.userId);

	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [pinnedMessages, setPinnedMessages] = useState<IMessage[]>([]);
	const [detailUser, setDetailUser] = useState<IDetailInformation[]>([]);

	useEffect(() => {
		const fetchPinnedMessages = async () => {
			const pinned = (selectedRoom?.messagePinID || [])
				.map((id) => message?.find((m) => m._id === id))
				.filter(Boolean) as IMessage[];
			setPinnedMessages(pinned);

			const fetchDetails = async () => {
				const promises = selectedRoom?.detailRoom
					?.filter((user) => user.id !== userId)
					.map((user) => getProfileFromAnotherUser(user.id || ""));

				const results = await Promise.all(promises || []);
				const validUsers = results.filter((r) => r.statusCode === 200).map((r) => r.data);
				setDetailUser(validUsers);
			};
		};

		fetchPinnedMessages();
	}, [selectedRoom]);

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

	return (
		<div className="flex h-full w-full flex-col">
			<HeaderChat imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg" />
			{isLoading ? (
				<div className="flex h-full w-full items-center justify-center">
					<Spinner size="lg" />
				</div>
			) : !selectedRoom?.isDisbanded ? (
				<>
					<div className={`relative flex justify-center ${pinnedMessages.length === 0 ? "hidden" : ""}`}>
						<div className="absolute z-10 mt-3 flex w-[98%] items-center justify-between rounded-md border-b border-gray-200 bg-white p-4">
							<button className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
									<MessageCircle className="h-4 w-4 text-white" />
								</div>
								<div className="flex flex-col">
									<h2 className="self-start text-sm font-medium text-gray-900">Tin nhắn</h2>
									<p className="text-xs text-gray-600">{detailUser.find((user) => user.id === pinnedMessages[pinnedMessages.length-1]?.accountId)?.fullName || "Bạn"}: {pinnedMessages[pinnedMessages.length-1]?.content}</p>
								</div>
							</button>

							<div className="flex items-center gap-2">
								<button
									className="flex items-center justify-center rounded-md border border-gray-300 p-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
									onClick={() => setOpen(true)}
								>
									+{pinnedMessages.length} ghim
									<ChevronDown className="ml-1 h-3 w-3" />
								</button>

								<button className="flex h-8 w-8 items-center justify-center rounded-full p-1 text-gray-500 hover:bg-gray-100">
									<MoreHorizontal className="h-4 w-4" />
								</button>

								{open && (
									<PinnedMessagesDropdown
										pinnedMessages={[]}
										isOpen={open}
										onOpenChange={() => setOpen(false)}
									/>
								)}
							</div>
						</div>
					</div>

					<BodyChat />
					<FooterChat />
				</>
			) : (
				<DisbandedGroup />
			)}
		</div>
	);
};
