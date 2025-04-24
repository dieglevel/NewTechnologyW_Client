import { getProfileFromAnotherUser } from "@/api";
import ImageViewer from "@/components/image-preview";
import { LocalStorage } from "@/lib/local-storage";
import { IDetailInformation } from "@/types/implement";
import { IMessage } from "@/types/implement/message.interface";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { socketService } from "@/lib/socket/socket";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchMessageByRoomId, setOneMessage } from "@/redux/store/models/message-slice";
import { normalizeMessage } from "@/utils";
import { setRoom } from "@/redux/store/models";
import { Spinner } from "@heroui/spinner";
import { avatarDefault } from "@/assets/images";
import Loading from "@/app/loading";
import { q } from "framer-motion/dist/types.d-B50aGbjN";

interface Props {
	message: IMessage;
	isSender: boolean;
}

export const Message = ({ message, isSender }: Props) => {
	const [profile, setProfile] = useState<IDetailInformation>();
	const [revoked, setRevoked] = useState<boolean>(message.isRevoked || false);
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [isLoadingImage, setIsLoadingImage] = useState<boolean>();

	const [isLoadingImageAvatar, setIsLoadingImageAvatar] = useState<boolean>(true);

	const optionsRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchDetailInformation = async () => {
			const response = await getProfileFromAnotherUser(message.account_id || "");
			if (response.data) {
				setProfile(response.data);
			}
		};
		fetchDetailInformation();
	}, []);

	const handleRevokeMessage = () => {
		socketService.emit(SocketEmit.revokeMessage, {
			messageId: message.message_id,
			roomId: message.room_id,
		});

		socketService.on(SocketOn.getRevokeMessage, async (data) => {
			console.log("Tin nhắn đã được thu hồi:", data);
			if (data._id === message.message_id) {
				console.log("Tin nhắn đã được thu hồi:", data);
				setRevoked(true);
				await dispatch(setOneMessage(normalizeMessage(data)));
				await dispatch(fetchMessageByRoomId(message.room_id || ""));
			}
		});
	};

	useEffect(() => {
		socketService.on(SocketOn.getRevokeMessage, async (data) => {

			console.log("Tin nhắn đã được thu hồi:", data);
			if (data._id === message.message_id) {
				console.log("Tin nhắn đã được thu hồi:", data);
				setRevoked(true);
				await dispatch(setOneMessage(normalizeMessage(data)));
				await dispatch(fetchMessageByRoomId(message.room_id || ""));
			}
		});

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

	const renderFiles = () => {
		if (!message.files || message.files.length === 0) return null;

		return (
			<div className="flex flex-wrap gap-2">
				{message.files.map((file, index) => {
					const fileType = file.data?.type || "";
					const isImage = fileType.startsWith("image/");
					if (isImage) {
						return (
							<ImageViewer
								key={index}
								src={file.url}
							>
								<Image	
									src={file.url}
									alt={file.data?.name || "image"}
									width={200}
									height={200}
									className={`max-h-[200px] rounded-lg object-cover ${isLoadingImage ? "opacity-50" : "opacity-100"}`}
									// onLoadingComplete={() => {
									// 	setIsLoadingImage(false);
									// }}
								/>
							</ImageViewer>
						);
					}

					return (
						<a
							key={index}
							href={file.url}
							target="_blank"
							rel="noopener noreferrer"
							className="break-words text-sm text-blue-600 underline"
						>
							📎 {file.data?.name || "Tệp đính kèm"}
						</a>
					);
				})}
			</div>
		);
	};

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
							profile?.avatarUrl ||
							"https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
						}
					>
						{!isSender && <Spinner className={`${isLoadingImageAvatar ? "block" : "hidden"}`} />}

						<Image
							onLoadingComplete={() => setIsLoadingImageAvatar(false)}
							loading="lazy"
							width={40}
							height={40}
							className={`mr-2 h-[40px] w-[40px] rounded-full object-cover ${isSender ? "hidden" : "block"} ${isLoadingImageAvatar ? "hidden" : "block"}`}
							src={profile?.avatarUrl || avatarDefault}
							alt="avatar"
						/>
					</ImageViewer>

					<div className="group relative">
						<div
							className={`flex max-w-[100%] flex-col gap-2 rounded-lg p-3 ${isSender ? "bg-blue-200" : "bg-body"}`}
						>
							<h1 className={`text-xs font-light text-text-seen ${isSender ? "hidden" : "block"}`}>
								{profile?.fullName}
							</h1>

							{revoked ? (
								<p className="text-sm italic text-gray-400">Tin nhắn đã được thu hồi</p>
							) : (
								<>
									<p className="break-words text-sm font-normal text-text">
										{message.type ? message.content : message.sticker}
									</p>

									{renderFiles()}

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
							<div className="absolute -left-6 top-1/2 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100">
								<button
									className="rounded-full p-1 hover:bg-gray-200"
									onClick={toggleOptions}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle
											cx="12"
											cy="12"
											r="1"
										></circle>
										<circle
											cx="19"
											cy="12"
											r="1"
										></circle>
										<circle
											cx="5"
											cy="12"
											r="1"
										></circle>
									</svg>
								</button>
							</div>
						)}

						{showOptions && isSender && !revoked && (
							<div
								ref={optionsRef}
								className="absolute right-0 top-0 z-10 w-40 rounded-md bg-zinc-800 py-1 shadow-lg"
							>
								<button
									className="flex w-full items-center px-4 py-2 text-left text-sm text-red-500 hover:bg-zinc-700"
									onClick={handleRevokeMessage}
								>
									<span className="mr-2">↩️</span> Thu hồi
								</button>
								<button
									className="flex w-full items-center px-4 py-2 text-left text-sm text-red-500 hover:bg-zinc-700"
									onClick={() => {
										/* Handle delete */
									}}
								>
									<span className="mr-2">🗑️</span> Chuyển tiếp tin nhắn
								</button>
							</div>
						)}
					</div>
				</div>
			) : (
				<Spinner />
			)}
		</>
	);
};
