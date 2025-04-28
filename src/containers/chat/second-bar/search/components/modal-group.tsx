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
import { Modal, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Checkbox } from "@heroui/checkbox";
import { Avatar } from "@heroui/avatar";

interface ShareModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	// onShare?: (selectedItems: string[], message: string, file?: File) => void;
	// items?: ShareItem[];
	// content?: IMessage;
}

export function GroupModal({ open, onOpenChange }: ShareModalProps) {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [nameGroup, setNameGroup] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [avatar, setAvatar] = useState<File | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const { myListFriend } = useSelector((state: RootState) => state.myListFriend);

	const accountId = localStorage.getItem(LocalStorage.userId);

	const toggleItem = (id: string) => {
		setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	const handleFileSelected = (file: File) => {
		setAvatar(file);
		// TODO: upload hoặc preview
	};

	const handleCreateGroup = async () => {
		setIsLoading(true);
		if (!nameGroup) {
			addToast({
				classNames: { title: "font-bold", description: "text-sm" },
				variant: "solid",
				title: "Tạo nhóm thất bại",
				description: "Vui lòng nhập tên nhóm",
				color: "danger",
			});
			setIsLoading(false);
			return;
		}
		const dataGroup = {
			avatarUrl: avatar || default_group,
			name: nameGroup,
		};

		const data = await createRoom(dataGroup);

		if (data.statusCode === 200) {
			const room = data.data;
			addToast({
				classNames: { title: "font-bold", description: "text-sm" },
				variant: "solid",
				title: "Tạo nhóm thành công",
				description: "Nhóm đã được tạo thành công",
				color: "success",
			});

			await addMember({
				roomId: room.id || "",
				listAccount: selectedItems,
			});

			onOpenChange(false);
		}
		setIsLoading(false);
	};

	return (
		<Modal
			isOpen={open}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				<ModalHeader>Tạo nhóm</ModalHeader>
				<div className="flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden">
					<div className="flex w-full flex-col items-center justify-center gap-2 px-4">
						<div className="flex w-full flex-row items-center justify-between gap-2">
							<ImagePickerButton onFileSelected={handleFileSelected} />
							<Input
								placeholder="Nhập tên nhóm"
								value={nameGroup}
								onChange={(e) => setNameGroup(e.target.value)}
								variant="underlined"
								classNames={{
									input: "bg-background placeholder:text-second placeholder:font-semibold",
									// inputWrapper: ["border", "shadow-none", "bg-body", "mt-4"],
								}}
							/>
						</div>
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
					</div>

					<div className="mt-2 flex w-full flex-col gap-2 overflow-y-auto">
						{myListFriend?.map((item) => (
							<div
								key={item.accountId}
								className={`border-b-border-second $ flex w-full cursor-pointer items-center gap-2 rounded-md border-b-1 px-4 py-2 hover:bg-background`}
								onClick={() => toggleItem(item.accountId ?? "")}
							>
								<Checkbox
									id={item.accountId}
									checked={false}
									isSelected={selectedItems.includes(item.accountId ?? "")}
								/>
								<Avatar src={item?.detail?.avatarUrl || avatarDefault.src}></Avatar>
								<p className="text-md font-bold">{item?.detail?.fullName || "-"}</p>
							</div>
						))}
					</div>
				</div>

				<ModalFooter>
					<Button
						variant="ghost"
						onPress={() => onOpenChange(false)}
						className="mr-2"
						disabled={isLoading}
					>
						Hủy
					</Button>
					<Button
						type="button"
						onPress={handleCreateGroup}
						className="bg-primary text-white hover:bg-primary/80"
						disabled={selectedItems.length === 0 || isLoading}
						isLoading={isLoading}
					>
						Thêm thành viên
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
