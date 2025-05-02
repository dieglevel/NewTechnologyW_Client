import { deleteMessageById, revokeMessage } from "@/api";
import { avatarDefault } from "@/assets/images";
import { More } from "@/assets/svgs";
import ImageViewer from "@/components/image-preview";
import { LocalStorage } from "@/lib/local-storage";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteMessage, fetchMessageByRoomId } from "@/redux/store/models/message-slice";
import { IDetailInformation } from "@/types/implement";
import { IMessage } from "@/types/implement/message.interface";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import renderFiles from "./render-files";
import renderSticker from "./render-sticker";
import { ShareModal } from "./rooms-forward";
import { IDetailAccountRoom } from "@/types/implement/room.interface";

interface Props {
	message: IMessage;
	isSender: boolean;
}

export const Message = ({ message, isSender }: Props) => {
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);

	const [revoked, setRevoked] = useState<boolean>(message.isRevoked || false);
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [showForward, setShowForward] = useState<boolean>(false);
	const [isLoadingImage, setIsLoadingImage] = useState<boolean>();
	const [showOnTop, setShowOnTop] = useState(false);
	const [isLoadingImageAvatar, setIsLoadingImageAvatar] = useState<boolean>(true);
	const accountId = localStorage.getItem(LocalStorage.userId);
	const [detailUser, setDetailUser] = useState<IDetailAccountRoom | null>(() => {
		const user = selectedRoom?.detailRoom?.find((user) => user.id === message.accountId);
		return user || null;
	});

	
	const optionsRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (showOptions && optionsRef.current) {
			const rect = optionsRef.current.getBoundingClientRect();
			const isNearBottom = window.innerHeight - rect.bottom < 200; // dưới 100px gần đáy

			setShowOnTop(isNearBottom);
		}
	}, [showOptions]);

	const handleRevokeMessage = async () => {
		if (message._id) {
			await revokeMessage({ messageId: message._id });
		}
	};

	const handleDeleteMessage = async () => {
		if (message._id) {
			const response = await deleteMessageById({ messageId: message._id });
			if (response.status === 200) {
				await dispatch(deleteMessage(message._id));
				await dispatch(fetchMessageByRoomId(message.roomId || ""));
			}
		}
	};

	const handleForward = () => {
		setShowForward(true);
	};

	useEffect(() => {

		if(message.isRevoked)
			setRevoked(true)

		// return () => {
		// 	socketService.off(SocketOn.getRevokeMessage);
		// };
	}, [message]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
				setShowOptions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleOptions = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setShowOptions(!showOptions);
	};

	return (
		<>
			{message ? (
				<div className={`mb-2 flex ${isSender ? "justify-end" : "justify-start"} w-full`}>
					<ImageViewer
						src={
							detailUser?.avatar ||
							"https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
						}
					>
						{/* {!isSender && <Spinner className={`${isLoadingImageAvatar ? "block" : "hidden"}`} />} */}

						<Image
							onLoad={() => {
								setIsLoadingImageAvatar(false);
							}}
							loading="lazy"
							width={40}
							height={40}
							className={`mr-2 h-[40px] w-[40px] rounded-full object-cover ${isSender ? "hidden" : "block"} `}
							src={detailUser?.avatar || avatarDefault}
							alt="avatar"
						/>
					</ImageViewer>

					<div className="group relative">
						<div
							className={`flex max-w-[100%] flex-col gap-2 rounded-lg p-3 ${
								message.sticker ? "bg-none" : isSender ? "bg-blue-200" : "bg-body"
							} `}
						>
							<h1 className={`text-xs font-light text-text-seen ${isSender ? "hidden" : "block"}`}>
								{detailUser?.fullName || "Tài khoản không tồn tại"}
							</h1>

							{revoked ? (
								<p className="text-sm italic text-gray-400">Tin nhắn đã được thu hồi</p>
							) : (
								<>
									{message.sticker ? (
										<div className="flex items-center justify-center">
											{renderSticker({ url: message.sticker || "" })}
										</div>
									) : (
										<p className={`text-sm ${isSender ? "text-text-seen" : "text-text"}`}>
											{message.content}
										</p>
									)}

									{renderFiles({ message, isSender })}

									<div className="flex items-center justify-end gap-1 text-xs text-gray-500">
										{message.createdAt &&
											new Date(message.createdAt).toLocaleTimeString("vi-VN", {
												hour: "2-digit",
												minute: "2-digit",
											})}
									</div>
								</>
							)}
						</div>

						{isSender && !revoked && (
							<div className="absolute -left-6 bottom-0 opacity-0 transition-opacity group-hover:opacity-100">
								<button
									className="rounded-full p-1 hover:bg-gray-200"
									onClick={toggleOptions}
								>
									<More />
								</button>
							</div>
						)}

						{!isSender && !revoked && (
							<div className="absolute -right-6 bottom-0 group-hover:opacity-100">
								<button
									className="rounded-full p-1 hover:bg-gray-200"
									onClick={toggleOptions}
								>
									<More />
								</button>
							</div>
						)}

						{showOptions && !revoked && (
							<div
								ref={optionsRef}
								className={`absolute ${isSender ? "-left-44" : "-right-44"} ${showOnTop ? "bottom-5 mb-2" : "top-full mt-2"} z-10 w-40 rounded-md bg-white py-1 shadow-lg`}
							>
								{isSender && (
									<button
										className="flex w-full items-center px-4 py-2 text-left text-sm text-red-500 hover:bg-zinc-700"
										onClick={handleRevokeMessage}
									>
										Thu hồi
									</button>
								)}
								<button
									className="flex w-full items-center px-4 py-2 text-left text-sm text-red-500 hover:bg-zinc-700"
									onClick={() => {
										handleDeleteMessage();
									}}
								>
									Xóa tin nhắn
								</button>

								<button
									className="flex w-full items-center px-4 py-2 text-left text-sm text-red-500 hover:bg-zinc-700"
									onClick={() => {
										handleForward();
									}}
								>
									Chuyển tiếp tin nhắn
								</button>
							</div>
						)}
					</div>
					{showForward && (
						<ShareModal
							open={showForward}
							onOpenChangeAction={setShowForward}
							content={message}
						/>
					)}
				</div>
			) : (
				<Spinner />
			)}
		</>
	);
};
