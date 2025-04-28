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
import { Checkbox } from "@heroui/checkbox";
import { Avatar } from "@heroui/avatar";

interface Props {
	open: boolean;
	onOpenChangeAction: (open: boolean) => void;
	selectedRoom: IRoom;
}

export function AddMemberModal({ open, onOpenChangeAction, selectedRoom }: Props) {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [isInRoom, setIsInRoom] = useState<string[]>([]);
	const [search, setSearch] = useState<string>("");

	const { myListFriend } = useSelector((state: RootState) => state.myListFriend);

	const accountId = localStorage.getItem(LocalStorage.userId);

	const toggleItem = (id: string) => {
		if (isInRoom.includes(id)){
			return;
		}

		if (selectedItems.includes(id)) {
			setSelectedItems(selectedItems.filter((item) => item !== id));
		} else {
			setSelectedItems([...selectedItems, id]);
		}
	};

	const handleAddMember = async () => {
		// console.log(selectedItems,  "heheheheh")
		await addMember({
			roomId: selectedRoom.id || "",
			listAccount: selectedItems,
		});

		onOpenChangeAction(false);
	};

	useEffect(() => {
		let isInRoom: string[] = [];
		for (let i = 0; i < (selectedRoom.detailRoom?.length || 0); i++) {
			const id = selectedRoom.detailRoom?.[i]?.id;
			if (id) {
				isInRoom.push(id);
			}
		}
		isInRoom.push(accountId || "");

		console.log(isInRoom, "isInRoom");	
		setIsInRoom(isInRoom);
	}, [selectedRoom, open]);

	return (
		<Modal
			isOpen={open}
			onOpenChange={onOpenChangeAction}
		>
			<ModalContent>
				<ModalHeader>Thêm thành viên nhóm</ModalHeader>
				<div className="flex w-full flex-col items-center justify-center px-4 py-2">
					<Input
						placeholder="Tìm kiếm"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						startContent={
							<SearchIcon className="size-8 fill-icon-second stroke-icon-second stroke-[0.1]" />
						}
						variant="bordered"
						classNames={{
							input: "bg-background placeholder:text-second placeholder:font-semibold",
							inputWrapper: ["border", "shadow-none", "bg-body"],
						}}
					/>

					<div className="mt-2 flex w-full flex-col gap-2 overflow-y-auto">
						{myListFriend?.map((item) => (
							<div
								key={item.accountId}
								className={`border-b-border-second flex w-full cursor-pointer items-center gap-2 rounded-md border-b-1 px-4 py-2 hover:bg-background ${
									isInRoom.includes(item.accountId ?? "") ? "opacity-50" : ""}`}
								onClick={() => toggleItem(item.accountId ?? "")}
							>
								<Checkbox
									id={item.accountId}
									checked={false}
									isSelected={selectedItems.includes(item.accountId ?? "")}
									disabled={isInRoom.includes(item.accountId ?? "")}
								/>
								<Avatar src={item?.detail?.avatarUrl || avatarDefault.src}></Avatar>
								<p className="font-bold text-md">{item?.detail?.fullName || "-"}</p>
							</div>
						))}
					</div>
				</div>

				<ModalFooter>
					<Button
						variant="ghost"
						onPress={() => onOpenChangeAction(false)}
						className="mr-2"
					>
						Hủy
					</Button>
					<Button
						type="button"
						onPress={handleAddMember}
						className="bg-primary text-white hover:bg-primary/80"
						disabled={selectedItems.length === 0}
					>
						Thêm thành viên
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
