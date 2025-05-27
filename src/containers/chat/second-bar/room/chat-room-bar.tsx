import { getMessageByRoomId, getProfileFromAnotherUser } from "@/api";
import StickerMessage from "@/assets/svgs/sticker-message";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { api, ErrorResponse } from "@/lib/axios";
import { LocalStorage } from "@/lib/local-storage";
import { socketService } from "@/lib/socket/socket";
import { AppDispatch, RootState } from "@/redux/store";
import { setSelectedRoom } from "@/redux/store/ui/selected-room-slice";
import { IDetailInformation, IMessage } from "@/types/implement";
import { IDetailAccountRoom, IRoom } from "@/types/implement/room.interface";
import { caculateDuration } from "@/utils/caculate-duration";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { default_group } from "@/assets/images";
import { setRoom, updateRoom } from "@/redux/store/models";
import { normalizeRoom } from "@/utils";
import { addToast } from "@heroui/toast";
import { fetchMessageByRoomId } from "@/redux/store/models/message-slice";

interface Props {
	room: IRoom;
}

export const ChatRoom = ({ room }: Props) => {
	const [account_id] = useState<string>(localStorage.getItem(LocalStorage.userId) || "");
	const [lastVisibleMessage, setLastVisibleMessage] = useState<IMessage>();

	const dispatch = useDispatch<AppDispatch>();
	const { message } = useSelector((state: RootState) => state.message);

	const handleClick = () => {
		dispatch(setSelectedRoom(room));
	};

	const renderMessage = (message: any) => {
		const latest = room.latestMessage;
	
		if (!latest) {
			return <span className="line-clamp-1">Chưa có tin nhắn</span>;
		}
	
		if (latest.isRevoked) {
			return <span>Đã thu hồi</span>;
		}
	
		if (message?.type === "sticker") {
			if (latest.sticker) {
				return (
					<p className="ml-1 flex items-center">
						<StickerMessage className="h-4 w-4" />
						<span>Đã gửi Sticker</span>
					</p>
				);
			}
		}
	
		if (latest.content || (latest.files?.length ?? 0) > 0) {
			return (
				<span className="line-clamp-1">
					{latest.content || ""}
					{(latest.files?.length ?? 0) > 0
						? ` Đã gửi ${latest.files?.length} tệp`
						: ""}
				</span>
			);
		}
	
		return <span className="line-clamp-1">Chưa có tin nhắn</span>;
	};

	useEffect(() => {
		const fetchLastMessage = async () => {
			if (room.latestMessage?.hiddenWith?.includes(account_id)) {
				const msg = await findLastMessage(room.id || "");
				setLastVisibleMessage(msg);
			} else {
				setLastVisibleMessage(room.latestMessage);
			}
		};

		fetchLastMessage();
	}, [room, account_id]);
	  

	const findLastMessage = async (roomId: string) => {
		await dispatch(fetchMessageByRoomId(roomId));
		try {
			const subMessages = [...(message || [])];
			console.log(subMessages)
			const lastMessage = subMessages.find(
				(msg) => msg.roomId === roomId && msg.hiddenWith?.includes(account_id)
			  );
			return lastMessage;
		} catch (error) {
			const e = error as ErrorResponse;
			console.log(e)
		}
	}


	return (
		<div
			className="flex cursor-pointer flex-row items-center gap-3 px-3 py-3 transition-all hover:bg-background lg:min-w-[300px]"
			onClick={handleClick}
		>
			<div className="flex items-center rounded-full">
				<Image
					loading="lazy"
					src={
						room.avatar ||
						room.avatarUrl ||
						(room.type === "group"
							? default_group
							: room.detailRoom?.[0]?.id === account_id
								? room.detailRoom?.[1]?.avatar || room.detailRoom?.[1]?.avatarUrl
								: room.detailRoom?.[0]?.avatar || room.detailRoom?.[0]?.avatarUrl) ||
						default_group
					}
					width={50}
					height={50}
					alt="avatar"
					className="size-[50px] max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px] rounded-full object-cover"
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex items-center justify-between">
					<p className="line-clamp-1 text-base font-semibold">
						{room.type === "group"
							? room.name
							: room.detailRoom?.length === 2
								? room.detailRoom[0]?.id === account_id
									? room.detailRoom[1]?.fullName || "-"
									: room.detailRoom[0]?.fullName || "-"
								: "-"}
					</p>
					<p className="text-tiny font-semibold">
						{caculateDuration(new Date(room.updatedAt || new Date()))}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<div
						className={
							(room.latestMessage?.accountId === account_id ? "" : "font-semibold ") +
							"line-clamp-1 flex text-tiny"
						}
					>
						{room.isDisbanded ? (
							"Đã giải tán"
						) : (
							<div className="flex w-[230px]">
								{room.latestMessage?.accountId === account_id ? "Bạn: " : ""}
								{room.latestMessage?.hiddenWith?.includes(account_id) ? (
									renderMessage(lastVisibleMessage)
								) : (
									renderMessage(room.latestMessage)
								)}
							</div>
						)}
					</div>

					{/* {room &&
					room.isSeen &&
					!room.isSeen.includes(account_id) &&
					room.lastMessage.account_id !== account_id ? (
						<div>
							<div className="size-[8px] rounded-full bg-danger"></div>
						</div>
					) : null} */}
				</div>
			</div>
		</div>
	);
};
