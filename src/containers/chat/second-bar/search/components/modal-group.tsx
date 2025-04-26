"use client";

import { avatarDefault, default_group } from "@/assets/images";
import { SearchIcon } from "@/assets/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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

interface ShareModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	// onShare?: (selectedItems: string[], message: string, file?: File) => void;
	// items?: ShareItem[];
	// content?: IMessage;
}

export function GroupModal({ open, onOpenChange }: ShareModalProps) {
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
		console.log("File đã chọn:", file);
		setAvatar(file);
		// TODO: upload hoặc preview
	};

	const handleCreateGroup = async () => {
		if (!nameGroup) {
			addToast({
				classNames: { title: "font-bold", description: "text-sm" },
				variant: "solid",
				title: "Tạo nhóm thất bại",
				description: "Vui lòng nhập tên nhóm",
				color: "danger",
			});
			return;
		}
		const dataGroup = {
			// avatarUrl: avatar || default_group,
			name: nameGroup,
		};

		const data = await createRoom(dataGroup);

		console.log(data, "data group ne troi");

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
				roomId: room.id,
				listAccount: selectedItems,
			});

			onOpenChange(false);
		}

		// const data =

		console.log("Selected items: ", selectedItems);

		console.log("Data group: ", data);
	};

	// useEffect(() => {
	// 	console.log("Name group: ", nameGroup);
	// }, [nameGroup]);

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className="space-y-4 bg-white sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="mb-5">Tạo nhóm</DialogTitle>
					<Separator className="" />
					<div className="flex items-center justify-center space-x-5 space-y-2">
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
							inputWrapper: ["border", "shadow-none", "bg-body", "mt-4"],
						}}
					/>
				</DialogHeader>

				<div className="max-h-64 space-y-2 overflow-y-auto pr-2">
					{myListFriend?.map((item) => (
						<div
							key={item.accountId}
							className="flex items-center space-x-3"
						>
							<Checkbox
								id={item.accountId}
								checked={selectedItems.includes(item?.accountId ?? "")}
								onCheckedChange={() => toggleItem(item?.accountId ?? "")}
							/>
							<Avatar>
								{
									<AvatarImage
										src={item?.detail?.avatarUrl || avatarDefault.src}
										alt={item.detail?.fullName || "-"}
									/>
								}
							</Avatar>
							<label
								htmlFor={item.accountId}
								className="cursor-pointer text-sm"
							>
								{item?.detail?.fullName || "-"}
							</label>
						</div>
					))}
				</div>

				<DialogFooter className="sm:justify-between">
					<Button
						variant="ghost"
						onClick={() => onOpenChange(false)}
					>
						Hủy
					</Button>
					<Button
						type="button"
						onClick={handleCreateGroup}
						disabled={selectedItems.length === 0}
					>
						Tạo nhóm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
