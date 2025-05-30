"use client";

import { default_group } from "@/assets/images";
import { SearchIcon } from "@/assets/svgs";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { IMessage } from "@/types/implement/message.interface";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Strikethrough } from "lucide-react";
import { use, useState } from "react";
import { useSelector } from "react-redux";
import { forwardMessage } from "@/api";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Divider } from "@heroui/divider";
import { Checkbox } from "@heroui/checkbox";
import { Avatar } from "@heroui/avatar";
import { renderSticker } from "./render-sticker";
import { RenderFiles } from "./render-files";

interface ShareItem {
	id: string;
	name: string;
	avatar?: string;
	fallback: string;
}

interface ShareModalProps {
	open: boolean;
	onOpenChangeAction: (open: boolean) => void;
	onShare?: (selectedItems: string[], message: string, file?: File) => void;
	items?: ShareItem[];
	content?: IMessage;
}

export function ShareModal({ open, onOpenChangeAction, onShare, content }: ShareModalProps) {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [message, setMessage] = useState("");
	const { room, status } = useSelector((state: RootState) => state.listRoom);
	const accountId = localStorage.getItem(LocalStorage.userId);

	const toggleItem = (id: string) => {
		setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	const handleShare = async () => {
		if (content?._id && content?.roomId) {
			for (const item of selectedItems) {
				await forwardMessage({
					messageId: content?._id,
					roomId: item,
				});
			}
		}
		onOpenChangeAction(false);
	};

	return (
		<Modal
			isOpen={open}
			onOpenChange={onOpenChangeAction}
		>
			<ModalContent className="space-y-4 bg-white sm:max-w-md">
				<ModalHeader>
					<ModalBody className="mb-5">Chia sẻ</ModalBody>
					<Divider className="" />
					<Input
						placeholder="Tìm kiếm"
						startContent={
							<SearchIcon className="size-8 fill-icon-second stroke-icon-second stroke-[0.1]" />
						}
						variant="bordered"
						classNames={{
							input: "bg-background placeholder:text-second placeholder:font-semibold",
							inputWrapper: ["border", "shadow-none", "bg-body", "mt-4"],
						}}
					/>
				</ModalHeader>

				<div className="max-h-64 space-y-2 overflow-y-auto pr-2">
					{room?.map((item) => (
						<div
							key={item.id}
							className="flex items-center space-x-3"
						>
							<Checkbox
								id={item.id}
								checked={selectedItems.includes(item?.id ?? "")}
								onChange={() => toggleItem(item?.id ?? "")}
							/>

							<Avatar
								src={
									item?.avatar ||
									(item?.type === "group"
										? default_group.src
										: item?.detailRoom?.[0]?.id === accountId
											? item?.detailRoom?.[1]?.avatar
											: item?.detailRoom?.[0]?.avatar) ||
									default_group.src
								}
								alt={item.name}
							/>

							<label
								htmlFor={item.id}
								className="cursor-pointer text-sm"
							>
								{item?.type === "group"
									? item.name
									: item?.detailRoom?.length === 2
										? item.detailRoom[0]?.id === accountId
											? item.detailRoom[1]?.fullName || "-"
											: item.detailRoom[0]?.fullName || "-"
										: "-"}
							</label>
						</div>
					))}
				</div>

				{content && (
					<>
						{content.sticker ? (
							<div className="flex items-center justify-center">
								{renderSticker({ url: content.sticker || "" })}
							</div>
						) : (
							<p className={`text-sm text-text-seen`}>{content.content}</p>
						)}

						<RenderFiles
							message={content}
							isSender={false}
						/>
					</>
				)}

				<Input
					placeholder="Nhập tin nhắn..."
					value={message}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
				/>

				<ModalFooter className="sm:justify-between">
					<Button
						variant="ghost"
						onClick={() => onOpenChangeAction(false)}
					>
						Hủy
					</Button>
					<Button
						type="button"
						onClick={handleShare}
						disabled={selectedItems.length === 0}
					>
						Chia sẻ
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
