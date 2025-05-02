"use client";

import { avatarDefault } from "@/assets/images";
import { SearchIcon } from "@/assets/svgs";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { createRoom, addMember } from "@/api";
import { useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { Checkbox } from "@heroui/checkbox";
import { Avatar } from "@heroui/avatar";
import ImagePickerButton from "@/components/ui/image-picker";
import { addToast } from "@heroui/toast";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { filterFriend } from "./handle";
import { Spinner } from "@heroui/spinner";
import { IRoom } from "@/types/implement/room.interface";

interface ShareModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedRoom?: IRoom;
	isRoom?: boolean;
}

export function GroupModal({ open, onOpenChange, selectedRoom, isRoom }: ShareModalProps) {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [nameGroup, setNameGroup] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [avatar, setAvatar] = useState<File | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const { myListFriend } = useSelector((state: RootState) => state.myListFriend);

	const toggleItem = (id: string) => {
		setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	const handleFileSelected = (file: File) => {
		setAvatar(file);
	};

	const filteredFriends = useMemo(() => {
		return filterFriend(myListFriend || [], search);
	}, [myListFriend, search]);

	const handleCreateGroup = async () => {
		setIsLoading(true);
		if (!nameGroup) {
			addToast({
				variant: "solid",
				color: "danger",
				title: "Tạo nhóm thất bại",
				description: "Vui lòng nhập tên nhóm",
			});
			setIsLoading(false);
			return;
		}
		const dataGroup = {
			avatarUrl: avatar,
			name: nameGroup,
		};

		const data = await createRoom({ name: nameGroup, avatarUrl: avatar || undefined });

		if (data.statusCode === 200) {
			const room = data.data;
			await addMember({
				roomId: room.id || "",
				listAccount: selectedItems,
			});

			addToast({
				variant: "solid",
				color: "success",
				title: "Tạo nhóm thành công",
				description: "Nhóm đã được tạo thành công",
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
						{filteredFriends?.map((item) => (
							<div
								key={item.accountId}
								className={`border-b-border-second flex w-full cursor-pointer items-center gap-2 rounded-md border-b-1 px-4 py-2 hover:bg-background`}
								onClick={() => toggleItem(item.accountId ?? "")}
							>
								{selectedRoom?.detailRoom?.find((member) => member.id === item.accountId) &&
								isRoom ? (
									<Checkbox
										id={item.accountId}
										defaultSelected
										isDisabled
									/>
								) : (
									<Checkbox
										id={item.accountId}
										onChange={() => toggleItem(item.accountId || "")}
										isSelected={selectedItems.includes(item.accountId ?? "")}
									/>
								)}
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
						isDisabled={selectedItems.length < 2 || isLoading}
						// isLoading={isLoading}
					>
						{isLoading ? (
							<Spinner
								color="white"
								size="sm"
							/>
						) : (
							"Thêm thành viên"
						)}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
