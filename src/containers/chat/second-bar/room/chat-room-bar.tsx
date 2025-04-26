import { getProfileFromAnotherUser } from "@/api";
import StickerMessage from "@/assets/svgs/sticker-message";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { api, ErrorResponse } from "@/lib/axios";
import { LocalStorage } from "@/lib/local-storage";
import { socketService } from "@/lib/socket/socket";
import { AppDispatch, RootState } from "@/redux/store";
import { setSelectedRoom } from "@/redux/store/ui/selected-room-slice";
import { IDetailInformation } from "@/types/implement";
import { IRoom } from "@/types/implement/room.interface";
import { caculateDuration } from "@/utils/caculate-duration";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { default_group } from "@/assets/images";
import { setRoom, updateRoom } from "@/redux/store/models";
import { normalizeRoom } from "@/utils";
import { addToast } from "@heroui/toast";

interface Props {
	room: IRoom;
}


export const ChatRoom = ({ room }: Props) => {
	const [account_id] = useState<string>(localStorage.getItem(LocalStorage.userId) || "");
	const [newAccountOwner, setNewAccountOwner] = useState<IDetailInformation>();

	const dispatch = useDispatch<AppDispatch>();

	const handleClick = () => {
		dispatch(setSelectedRoom(room));
	};

	useEffect(() => {
		socketService.on(SocketOn.getListRoom, async (data) => {
			const { accountOwner, room, behavior } = data;


			for (const owner of accountOwner as IDetailInformation[]) {
				if(!(owner.id === account_id)) {
					setNewAccountOwner(owner);
				}
			}			


			switch (behavior) {
				case "add":
					// console.log("Biet day la data khong????", room);

					await dispatch(setRoom([normalizeRoom(room)]));
					break;
				case "update":
					// addToast({
					// 	classNames: { title: "font-bold", description: "text-sm" },
					// 	variant: "solid",
					// 	title: `${room.name} vừa thêm thành viên`,
					// 	// description: "Nhóm đã được tạo thành công",
					// 	color: "success",
					// });
					await dispatch(updateRoom([normalizeRoom(room)]));
					break;
				case "delete":
					await dispatch(setRoom([normalizeRoom(room)]));
					break;
				case "disband":
					await dispatch(updateRoom([normalizeRoom(room)]));
					break;
				default:
					break;
			}
		});
	}, []);

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
						(room.type === "group"
							? default_group
							: room.detailRoom?.[0]?.id === account_id
								? room.detailRoom?.[1]?.avatar
								: room.detailRoom?.[0]?.avatar) ||
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
						{caculateDuration(new Date(room.latestMessage?.createdAt || new Date()))}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<div
						className={
							(room.latestMessage?.accountId === account_id ? "" : "font-semibold ") +
							"line-clamp-1 flex text-tiny"
						}
					>
						{room.latestMessage?.accountId === account_id ? "Bạn: " : ""}
						{room.latestMessage?.isRevoked ? (
							<span>Đã thu hồi</span>
						) : room.latestMessage?.sticker ? (
							<p className="ml-1 flex items-center">
								<StickerMessage className="h-4 w-4" />
								<span>Đã gửi Sticker</span>
							</p>
						) : (
							room.latestMessage?.hiddenWith?.includes(account_id) ? (
								<></>
							) : (
								room.latestMessage?.content || (room.latestMessage?.files?.length ?? 0) > 0 ? (
									<span className="line-clamp-1">
										{room.latestMessage?.content || ""}
										{(room.latestMessage?.files?.length ?? 0) > 0
											? ` Đã gửi ${room.latestMessage?.files?.length} tệp`
											: ""}
									</span>
								) : (
									<span className="line-clamp-1">
										Chưa có tin nhắn
									</span>
								)
							)
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
