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
import { IRoom } from "@/types/implement/room.interface";

interface ShareModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedRoom: IRoom;
}

export function AddMemberModal({ open, onOpenChange, selectedRoom }: ShareModalProps) {
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


    const handleAddMember = async () => {
		// console.log(selectedItems,  "heheheheh")
        await addMember({
			roomId: selectedRoom.id,
			listAccount: selectedItems,
		});

		onOpenChange(false);

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
					<DialogTitle className="mb-5">Thêm thành viên nhóm</DialogTitle>
					<Separator className="" />
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
					{myListFriend?.map((item) => {
                        const isInRoom = selectedRoom?.detailRoom?.some((member) => member.id === item.accountId);
                        return (
						<div
							key={item.accountId}
							className="flex items-center space-x-3"
						>
							<Checkbox
								id={item.accountId}
								checked={isInRoom || selectedItems.includes(item.accountId ?? "")}
								disabled={isInRoom}
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
					);})}
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
						onClick={handleAddMember}
						disabled={selectedItems.length === 0}
					>
						Thêm thành viên
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
    );
}
