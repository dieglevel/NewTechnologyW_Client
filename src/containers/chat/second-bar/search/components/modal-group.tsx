"use client";

import { avatarDefault } from "@/assets/images";
import { SearchIcon } from "@/assets/svgs";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { createRoom, addMember, leaveGroup } from "@/api";
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
import { on } from "events";

interface ShareModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	selectedRoom?: IRoom;
	isRoom?: boolean;
	type?: "add" | "edit";
}

export function GroupModal({ open, onOpenChange, selectedRoom, isRoom, type, title }: ShareModalProps) {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [nameGroup, setNameGroup] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [avatar, setAvatar] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { myListFriend } = useSelector((state: RootState) => state.myListFriend);

	const user = localStorage.getItem(LocalStorage.userId) || "";

	const toggleItem = (id: string) => {
		if (type === "edit") {
			setSelectedItems([id]);
		} else {
			setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
		}
	};

	const handleFileSelected = (file: File) => {
		setAvatar(file);
	};

	const filteredFriends = useMemo(() => {
		return filterFriend(myListFriend || [], search);
	}, [myListFriend, search]);

	const handleCreateGroup = async () => {
		setIsLoading(true);
		if (!selectedRoom) {
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
		} else {
			if (selectedItems.length === 0) {
				addToast({
					variant: "solid",
					color: "danger",
					title: "Thêm thành viên thất bại",
					description: "Vui lòng chọn thành viên để thêm vào nhóm",
				});
				setIsLoading(false);
				return;
			}

			if(selectedRoom.detailRoom?.find(member => member.id === user)?.role === "noob") {

				setIsLoading(false);
				return;
			
			}

			const data = await addMember({
				roomId: selectedRoom.id || "",
				listAccount: selectedItems,
			});

			if (data.statusCode === 200) {
				addToast({
					variant: "solid",
					color: "success",
					title: "Thêm thành viên thành công",
					description: "Thành viên đã được thêm vào nhóm thành công",
				});

				onOpenChange(false);
			}
		}

		setIsLoading(false);
	};

	const handleLeaveGroup = async () => {
		if (selectedRoom?.id) {
			await leaveGroup({
				chatRoomID: selectedRoom.id,
				newLeaderUserID: selectedItems[0],
			});
			addToast({
				title: "Bạn đã rời khỏi nhóm",
				color: "success",
			});
			onOpenChange(false);
		}
	};

	return (
		<Modal
			isOpen={open}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<div className="flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden">
					<div className="flex w-full flex-col items-center justify-center gap-2 px-4">
						<div
							className={`flex w-full flex-row items-center justify-between gap-2 ${selectedRoom ? "hidden" : ""}`}
						>
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
						{type !== "edit"
							? filteredFriends?.map((item) => {
									const isFriendInRoom = selectedRoom?.detailRoom?.find(
										(member) => member.id === item.accountId,
									);
									return (
										<div
											key={item.accountId}
											className={`border-b-border-second flex w-full cursor-pointer items-center gap-2 rounded-md border-b-1 px-4 py-2 hover:bg-background`}
											onClick={() => isFriendInRoom ?? toggleItem(item.accountId ?? "")}
											
										>
											{isFriendInRoom && isRoom ? (
												<Checkbox
													id={item.accountId}
													defaultSelected
													isDisabled
												/>
											) : (
												<Checkbox
													id={item.accountId}
													onChange={() => toggleItem(item.accountId || "")}
													isSelected={selectedItems.includes(
														item.accountId ?? "",
													)}
												/>
											)}
											<Avatar
												src={item?.detail?.avatarUrl || avatarDefault.src}
											></Avatar>
											<p className="text-md font-bold">
												{item?.detail?.fullName || "-"}
											</p>
										</div>
									);
								})
							: selectedRoom?.detailRoom?.map((member) => (
									<div
										key={member.id}
										className={`border-b-border-second flex w-full cursor-pointer items-center gap-2 rounded-md border-b-1 px-4 py-2 hover:bg-background ${member.id === user ? "hidden" : ""}`}
										onClick={() => toggleItem(member.id ?? "")}
									>
										<Checkbox
											id={member.id}
											isSelected={selectedItems.includes(member.id ?? "")}
											onChange={() => toggleItem(member.id || "")}
										/>
										<Avatar src={member.avatar || avatarDefault.src}></Avatar>
										<p className="text-md font-bold">{member.fullName || "-"}</p>
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
						spinnerPlacement="end"
					>
						Hủy
					</Button>
					<Button
						type="button"
						onPress={type === "edit" ? handleLeaveGroup : handleCreateGroup}
						className="bg-primary text-white hover:bg-primary/80"
						isDisabled={
							(selectedRoom?.detailRoom?.length ?? 0) + selectedItems.length <= 1 ||
							selectedItems.length === 0
						}
						isLoading={isLoading}
						spinnerPlacement="end"
					>
						{isLoading ? <></> : (
							type === "edit" ? "Rời nhóm" : isRoom ? "Thêm thành viên" : "Tạo nhóm"
						)}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
