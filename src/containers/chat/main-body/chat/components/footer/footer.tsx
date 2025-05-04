import { FileIcon, ImageIcon, SendIcon, UserChatIcon } from "@/assets/svgs";
import { Input } from "@heroui/input";
import { StickerForm } from "./components";
import { useRef, useState } from "react";
import FilePreviewer from "./components/preview-file";
import { LocalStorage } from "@/lib/local-storage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { sendMessage } from "@/api";
import { EmojiClickData } from "emoji-picker-react";
import { EmojiForm } from "./components/emoji-form";

export const FooterChat = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const inputImageRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<File[]>([]);
	const [message, setIMessage] = useState<string>("");

	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	// const dispatch = useDispatch<AppDispatch>();

	const handleClickFile = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	
	const handleClickImage = () => {
		if (inputImageRef.current) {
			inputImageRef.current.click();
		}
	};

	const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
		setIMessage((prev) => prev + emojiData.emoji);
	};

	const handleRemoveFile = (index: number) => {
		setFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setFile(Array.from(files));
		}
	};

	const addMessage = (message: string) => {
		if (message.trim() === "" && file.length === 0) return;
		handleSendMessage(message);
		setIMessage("");
		setFile([]);
	};

	const sendSticker = (sticker: string) => {
		if (sticker.trim() === "") return;
		handleSendMessage(sticker, "sticker");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			addMessage(message);
		}
	};

	const handleSendMessage = async (message: any, type: "mixed" | "sticker" | "call" = "mixed") => {
		try {
			if (type === "sticker") {
				await sendMessage({
					accountId: localStorage.getItem(LocalStorage.userId) || "",
					roomId: selectedRoom?.id || "",
					type,
					sticker: type === "sticker" ? message : undefined,
					files: file,
				});
			} else {
				await sendMessage({
					accountId: localStorage.getItem(LocalStorage.userId) || "",
					roomId: selectedRoom?.id || "",
					type,
					content: message,
					files: file,
				});
			}
		} catch (error) {
			// console.error("Lỗi gửi tin nhắn:", error);
		}
	};

	return (
		<div className="flex w-full flex-col border-t-1 bg-body">
			<div className="flex gap-4 px-2 py-2">
				<StickerForm onSelectSticker={sendSticker} />
				<div
					onClick={handleClickImage}
					className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background"
				>
					<ImageIcon className="size-6 stroke-icon-second" />
				</div>
				<div
					onClick={handleClickFile}
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
				<EmojiForm onSelectEmoji={onEmojiClick} />
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

			<Input
				ref={inputImageRef}
				type="file"
				multiple
				className="hidden"
				onChange={handleChange}
				accept="image/*"
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
