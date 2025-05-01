"use client";

import { avatarDefault, default_group } from "@/assets/images";
import { SearchIcon } from "@/assets/svgs";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { IMessage } from "@/types/implement/message.interface";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Strikethrough } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addMember, createRoom, forwardMessage } from "@/api";
import ImagePickerButton from "@/components/ui/image-picker";
import { addToast } from "@heroui/toast";
import { IRoom } from "@/types/implement/room.interface";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Divider } from "@heroui/divider";
import { Checkbox } from "@heroui/checkbox";
import { Avatar } from "@heroui/avatar";

interface ShareModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedRoom: IRoom;
}

export function ModalAddMember({ open, onOpenChange, selectedRoom }: ShareModalProps) {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [message, setMessage] = useState("");
	const [nameGroup, setNameGroup] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [avatar, setAvatar] = useState<File | null>(null);

	const { room, status } = useSelector((state: RootState) => state.listRoom);
	const { myListFriend } = useSelector((state: RootState) => state.myListFriend);

	const accountId = localStorage.getItem(LocalStorage.userId);

	const toggleItem = (id: string) => {
		setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	const handleFileSelected = (file: File) => {
		setAvatar(file);
		// TODO: upload hoặc preview
	};

	const handleAddMember = async () => {
		await addMember({
			roomId: selectedRoom.id || "",
			listAccount: selectedItems,
		});

		onOpenChange(false);
	};

	return (
		<Modal
			isOpen={open}
			onOpenChange={onOpenChange}
		>
			<ModalContent className="rounded-lg bg-white sm:max-w-md">
				<ModalHeader className="text-center text-lg font-bold">Tạo nhóm</ModalHeader>

				<Divider />

				<ModalBody className="flex flex-col gap-4">
					<div className="flex flex-col items-center gap-3">
						<ImagePickerButton onFileSelected={handleFileSelected} />
						<Input
							placeholder="Nhập tên nhóm"
							value={nameGroup}
							onChange={(e) => setNameGroup(e.target.value)}
							variant="underlined"
							classNames={{
								input: "text-center bg-background placeholder:text-second placeholder:font-semibold",
							}}
						/>
					</div>

					<Input
						placeholder="Tìm kiếm bạn bè"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						startContent={<SearchIcon className="size-5 fill-icon-second stroke-icon-second" />}
						variant="bordered"
						classNames={{
							input: "bg-background placeholder:text-second placeholder:font-semibold",
							inputWrapper: "border shadow-none bg-body",
						}}
					/>

					<div className="ml-2 flex-1 space-y-3">
						{myListFriend?.map((item) => (
							<div
								key={item.accountId}
								className="flex items-center gap-3"
							>
								<Checkbox
									id={item.accountId}
									checked={selectedItems.includes(item.accountId || "")}
									onChange={() => toggleItem(item.accountId || "")}
									size="md"
									color="default"
									className="flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full border border-[#83828260] transition-all checked:border-primary checked:bg-primary hover:border-primary hover:bg-primary/10"
									classNames={{
										base: "w-6 h-6",
										wrapper: "w-6 h-6",
										label: "ml-2 text-base",
										icon: "w-3 h-3",
									}}
								/>

								<Avatar
									src={item?.detail?.avatarUrl || avatarDefault.src}
									alt={item?.detail?.fullName || "-"}
									className="h-8 w-8"
								/>
								<label
									htmlFor={item.accountId}
									className="cursor-pointer text-sm font-medium"
								>
									{item?.detail?.fullName || "-"}
								</label>
							</div>
						))}
					</div>
				</ModalBody>

				<ModalFooter className="flex justify-between">
					<Button
						variant="ghost"
						onClick={() => onOpenChange(false)}
					>
						Hủy
					</Button>
					<Button
						onClick={handleAddMember}
						disabled={selectedItems.length === 0}
					>
						Tạo nhóm
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
