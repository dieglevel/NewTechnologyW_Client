"use client";

import { disbandGroup, getJoinRequest, leaveGroup, setApprovedMember } from "@/api";
import { default_group } from "@/assets/images";
import { AddGroupIcon, Bin, PinIcon, SendIcon, SettingIcon } from "@/assets/svgs";
import ImageViewer from "@/components/image-preview";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ModalConfirm } from "./modal-confirm";
import { Divider } from "@heroui/divider";
import OpenDoorComponent from "@/assets/svgs/open-door";
import { GroupModal } from "@/containers/chat/second-bar/search/components/modal-group";
import { Switch } from "@heroui/switch";
import { Button } from "@heroui/button";
import { Clock } from "lucide-react";
import { IJoinRequest, IRoom } from "@/types/implement";

interface Props {
	onClick?: () => void;
	onClickJoin?: () => void;
}

export const BodyOption = ({ onClick, onClickJoin }: Props) => {
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState(false);
	const [openModalDisband, setOpenModalDisband] = useState(false);
	const [openModalLeave, setOpenModalLeave] = useState(false);
	const [isSelected, setIsSelected] = useState<boolean>(true);

	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const account_id = localStorage.getItem(LocalStorage.userId);

	const handleDisbandGroup = async () => {
		if (selectedRoom?.id) {
			await disbandGroup(selectedRoom?.id);
			addToast({
				title: "Nhóm đã bị giải tán",
				color: "success",
			});
		}
	};

	const setApproveJoinRequest = async () => {
		if (selectedRoom?.id) {
			await setApprovedMember(selectedRoom.id);
			addToast({
				title: "Đã bật phê duyệt thành viên",
				color: "success",
			});
		}
	};

	const handleLeaveGroup = async () => {
		if (selectedRoom?.id) {
			await leaveGroup({
				chatRoomID: selectedRoom.id,
			});
			addToast({
				title: "Bạn đã rời khỏi nhóm",
				color: "success",
			});
		}
	};

	return (
		<div className="flex h-full flex-col gap-3 bg-body p-3">
			<div className="flex flex-col items-center justify-center">
				<ImageViewer src={"https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"}>
					<Image
						priority
						src={
							selectedRoom?.avatar ||
							(selectedRoom?.type === "group"
								? default_group
								: selectedRoom?.detailRoom?.[0]?.id === account_id
									? selectedRoom.detailRoom[1]?.avatar
									: selectedRoom?.detailRoom?.[0]?.avatar) ||
							default_group
						}
						width={50}
						height={50}
						alt="avatar"
						className="size-[50px] max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px] rounded-full object-cover"
					/>
				</ImageViewer>
				<p className="text-xl font-bold">
					{selectedRoom?.type === "group"
						? selectedRoom.name
						: selectedRoom?.detailRoom?.length === 2
							? selectedRoom.detailRoom[0]?.id === account_id
								? selectedRoom.detailRoom[1]?.fullName || "-"
								: selectedRoom.detailRoom[0]?.fullName || "-"
							: "-"}
				</p>
			</div>
			<div className="flex flex-row items-start justify-center gap-3">
				<div className="flex max-w-20 flex-col items-center justify-center gap-1">
					<div className="flex cursor-pointer items-center justify-center rounded-sm bg-background stroke-icon-second p-2 hover:bg-icon-active hover:stroke-icon-active">
						<SendIcon className="size-5" />
					</div>
					<p className="text-center text-xs font-semibold">Bật thông báo</p>
				</div>
				<div
					className={`flex max-w-20 flex-col items-center justify-center gap-1 ${selectedRoom?.type === "group" ? "block" : "hidden"}`}
				>

					<ModalConfirm
						isOpen={openModalDisband}
						header="Bạn có chắc chắn muốn giải tán nhóm này không?"
						onOpenChange={() => setOpenModalDisband(false)}
						onConfirm={handleDisbandGroup}
					/>
				</div>
			</div>
			<div
				className={`${selectedRoom?.type !== "group" ? "hidden" : "block"} flex flex-1 flex-col justify-between`}
			>
				<div>
					{selectedRoom?.detailRoom?.find((user) => user.id === account_id)?.role === "admin" && (
						<div className="mb-3 flex flex-col justify-center gap-1">
							<p className="text-base font-semibold">Quản lý nhóm</p>
							<div className="mt-2 flex items-center justify-between">
								<p className="text-sm">Phê duyệt thành viên mới</p>
								<label className="relative inline-flex cursor-pointer items-center"></label>
								<Switch
									isSelected={isSelected}
									onChange={async (e) => {
										const checked = e.target.checked;
										setIsSelected(checked);

										if (checked) {
											try {
												await setApproveJoinRequest();
											} catch (error) {
												console.error("Lỗi khi bật phê duyệt thành viên:", error);
											}
										}
									}}
									aria-label="Tự động phê duyệt thành viên"
								/>
							</div>
							<Button
								variant="ghost"
								onClick={onClickJoin}
								className="mt-2 w-full justify-start"
								// disabled={pendingMembers.length === 0}
							>
								<Clock className="mr-2 h-4 w-4" />
								Xem danh sách chờ duyệt
								<span className="ml-auto rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
									{selectedRoom.joinRequests?.length || 0}
								</span>
							</Button>
						</div>
					)}

					<div className="flex flex-col justify-center gap-1">
						<p className="text-base font-semibold">Thành viên nhóm</p>
						<button
							className="mt-2 flex items-center gap-1"
							onClick={onClick}
						>
							<AddGroupIcon className="h-5 w-5" />
							<p className="text-xs">
								{selectedRoom?.detailRoom?.filter((member) => !!member.role).length || 0} thành viên
							</p>
						</button>
					</div>
				</div>

				<div>
					<Divider />
					<div
						className={`flex flex-col justify-center gap-1 ${selectedRoom?.detailRoom?.find((user) => user.id === account_id)?.role !== "admin" ? "hidden" : "block"}`}
					>
						<button
							className="mt-3 flex items-center gap-1"
							onClick={() => setOpenModalDisband(true)}
						>
							<Bin className="h-5 w-5 fill-red-500" />
							<p className="text-xs text-red-500">Giải tán nhóm</p>
						</button>
					</div>
					<div className={`flex flex-col justify-center gap-1`}>
						<button
							className="mt-3 flex items-center gap-1"
							onClick={() => {
								selectedRoom?.detailRoom?.find((member) => member.id === account_id)?.role ===
								"admin"
									? setOpenModalLeave(true)
									: setOpenModal(true);
							}}
						>
							<OpenDoorComponent className="h-5 w-5 fill-red-500" />
							<p className="text-xs text-red-500">Rời khỏi phòng</p>
						</button>

						<ModalConfirm
							isOpen={openModal}
							header="Bạn có chắc chắn muốn rời khỏi nhóm này không?"
							onOpenChange={() => setOpenModal(false)}
							onConfirm={handleLeaveGroup}
						/>

						<GroupModal
							open={openModalLeave}
							onOpenChange={setOpenModalLeave}
							selectedRoom={selectedRoom || undefined}
							isRoom={true}
							type="edit"
							title="Chuyển quyền nhóm trưởng cho thành viên khác"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
