import { disbandGroup } from "@/api";
import { default_group } from "@/assets/images";
import { AddGroupIcon, Bin, PinIcon, SendIcon, SettingIcon } from "@/assets/svgs";
import ImageViewer from "@/components/image-preview";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ModalConfirm } from "./modal-confirm";
import { Divider } from "@heroui/divider";

interface Props {
	onClick?: () => void;
}

export const BodyOption = ({ onClick }: Props) => {
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState(false);

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
				<div className="flex max-w-20 flex-col items-center justify-center gap-1">
					<div className="flex cursor-pointer items-center justify-center rounded-sm bg-background stroke-icon-second p-2 hover:bg-icon-active hover:stroke-icon-active">
						<PinIcon className="size-5" />
					</div>
					<p className="text-center text-xs font-semibold">Ghim hội thoại</p>
				</div>
				<div className="flex max-w-20 flex-col items-center justify-center gap-1">
					<div className="flex cursor-pointer items-center justify-center rounded-sm bg-background stroke-icon-second p-2 hover:bg-icon-active hover:stroke-icon-active">
						<AddGroupIcon className="size-5" />
					</div>
					<p className="text-center text-xs font-semibold">Tạo nhóm trò chuyện</p>
				</div>

				<div
					className={`flex max-w-20 flex-col items-center justify-center gap-1 ${selectedRoom?.leader_account_id !== account_id ? "hidden" : "block"}`}
				>
					<div
						className="flex cursor-pointer items-center justify-center rounded-sm bg-background stroke-icon-second p-2 hover:bg-icon-active hover:stroke-icon-active"
						onClick={() => setOpenMenu(!openMenu)}
					>
						<SettingIcon className="size-5" />
					</div>
					<p className="text-center text-xs font-semibold">Quản lý nhóm</p>
					{openMenu && (
						<div className="absolute right-8 z-10 w-32 translate-y-9 rounded-md border bg-white shadow-lg">
							<button
								onClick={() => {
									setOpenModal(true);
								}}
								className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
							>
								Giải tán nhóm
							</button>
						</div>
					)}

					<ModalConfirm
						isOpen={openModal}
						header="Bạn có chắc chắn muốn giải tán nhóm này không?"
						onOpenChange={() => setOpenModal(false)}
						onConfirm={handleDisbandGroup}
					/>
				</div>
			</div>
			<div className={`${selectedRoom?.type !== 'group' ? "hidden" : "block"}`}>
				<div className="flex flex-col justify-center gap-1">
					<p className="text-base font-semibold">Thành viên nhóm</p>
					<button
						className="mt-3 flex items-center gap-1"
						onClick={onClick}
					>
						<AddGroupIcon className="h-5 w-5" />
						<p className="text-xs">{selectedRoom?.detailRoom?.length} thành viên</p>
					</button>
				</div>
				<Divider />
				<div className={`flex flex-col justify-center gap-1`}>
					{/* <p className="text-base font-semibold">Thành viên nhóm</p> */}
					<button
						className="mt-3 flex items-center gap-1"
						onClick={() => setOpenModal(true)}
					>
						<Bin className="h-5 w-5 fill-red-500" />
						<p className="text-xs text-red-500">Giải tán nhóm</p>
					</button>
				</div>
			</div>
		</div>
	);
};
