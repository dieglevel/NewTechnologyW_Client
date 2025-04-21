import { EmojiIcon, FileIcon, ImageIcon, SendIcon, UserChatIcon } from "@/assets/svgs";
import { Input } from "@heroui/input";
import { StickerForm } from "./components";
import { useRef, useState } from "react";
import FilePreviewer from "./components/preview-file";
import { socketService } from "@/lib/socket/socket";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { LocalStorage } from "@/lib/local-storage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setRoom } from "@/redux/store/models";
import { fetchMessageByRoomId, setMessage, setOneMessage } from "@/redux/store/models/message-slice";
import { api } from "@/lib/axios";
import { sendMessage } from "@/api";
import { normalizeMessage, normalizeRoom } from "@/utils";
import { IRoom } from "@/types/implement/room.interface";
import { X } from "lucide-react";

export const FooterChat = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<File[]>([]);
	const [message, setIMessage] = useState<string>("");
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const dispatch = useDispatch<AppDispatch>();

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleRemoveFile = (index: number) => {
		setFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setFile(Array.from(files));
			console.log("Selected files:", files);
		}
	};

	const addMessage = (message: string) => {
		if (message.trim() === "" && file.length === 0) return;
		console.log("Message:", message);
		console.log("Files:", file);
		handleSendMessage(message);
		setIMessage("");
		setFile([]);
	};

	const sendSticker = (sticker: string) => {
		if (sticker.trim() === "") return;
		console.log("Sticker:", sticker);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
			addMessage(message);
		}
	};

	const handleSendMessage = async (message: any) => {
		// socketService.connect();

		// socketService.emit(SocketEmit.sendMessage, {});

		try {
			let type: "mixed" | "sticker" | "call" = "mixed";

			// Gửi message qua API
			await sendMessage({
				accountId: localStorage.getItem(LocalStorage.userId) || "",
				roomId: selectedRoom?.id || "",
				type,
				content: message,
				files: file || undefined,
			});

			// Socket xử lý realtime
			socketService.on(SocketOn.sendMessage, async (data) => {
				const { message, room } = data;

				console.log("New message received:", message);

				socketService.emit(SocketEmit.myListRoom, {
					lastUpdatedAt: message.createdAt,
				});

				socketService.on(SocketOn.myListRoom, async (data: IRoom[]) => {
					await dispatch(setRoom(data));
				});

				await dispatch(setOneMessage(normalizeMessage(message)));
				await dispatch(fetchMessageByRoomId(selectedRoom?.id || ""));
			});
		} catch (error) {
			console.error("Lỗi gửi tin nhắn:", error);
		}
		// sendMessage({
		// 	accountId: localStorage.getItem(LocalStorage.userId) || "",
		// 	roomId: selectedRoomId || "",
		// 	content: message,
		// 	type: "text",
		// });

		// socketService.on(SocketOn.sendMessage, async (data) => {
		// 	const { message, room } = data;

		// 	console.log("data: ", data.message, data.room);
		// 	console.log("message: ", message, "room: ", room);

		// 	socketService.emit(SocketEmit.myListRoom, {
		// 		lastUpdatedAt: message.createdAt,
		// 	});

		// 	socketService.on(SocketOn.myListRoom, async (data: IRoom[]) => {
		// 		console.log("My list room updated:", data);
		// 		await dispatch(setRoom(data));
		// 	});

		// 	const normalizedMessage = normalizeMessage(message);
		// 	await dispatch(setMessage({ messages: [normalizedMessage], roomId: selectedRoomId || "" }));
		// 	await dispatch(fetchMessageByRoomId(selectedRoomId || ""));
		// });
	};

	return (
		<div className="flex w-full flex-col border-t-1 bg-body">
			<div className="flex gap-4 px-2 py-2">
				<StickerForm onSelectSticker={sendSticker} />
				<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background">
					<ImageIcon className="size-6 stroke-icon-second" />
				</div>
				<div
					onClick={handleClick}
					className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background"
				>
					<FileIcon className="size-6 stroke-icon-second" />
				</div>
				<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background">
					<UserChatIcon className="size-6 stroke-icon-second" />
				</div>
			</div>

			<div className="flex w-full items-center justify-center border-t-1">
				<Input
					placeholder="Type a message"
					className="w-full border-none"
					variant="bordered"
					onChange={(e) => setIMessage(e.target.value)}
					value={message}
					onKeyDown={handleKeyDown}
					classNames={{ input: ["bg-body"], inputWrapper: ["border-none", "shadow-none"] }}
				/>
				<div className="flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm hover:bg-background">
					<EmojiIcon className="size-6 stroke-icon-second stroke-2" />
				</div>
				<div
					onClick={() => addMessage(message)}
					className="flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm hover:bg-background"
				>
					<SendIcon className="size-6 stroke-icon-second" />
				</div>
			</div>

			<Input
				ref={inputRef}
				type="file"
				multiple
				className="hidden"
				onChange={handleChange}
			/>

			{file.length > 0 && (
				<div className="flex w-full items-center gap-3 border-t-1 px-5">
					<FilePreviewer
						files={file}
						onClear={() => setFile([])}
						onRemoveFile={handleRemoveFile}
					/>
				</div>
			)}
		</div>
	);
};
