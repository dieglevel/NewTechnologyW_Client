import { default_group } from "@/assets/images";
import { AddGroupIcon, PinIcon, SendIcon, SettingIcon } from "@/assets/svgs";
import ImageViewer from "@/components/image-preview";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export const BodyOption = () => {
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const account_id = localStorage.getItem(LocalStorage.userId);

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

				<div className="flex max-w-20 flex-col items-center justify-center gap-1">
					<div className="flex cursor-pointer items-center justify-center rounded-sm bg-background stroke-icon-second p-2 hover:bg-icon-active hover:stroke-icon-active">
						<SettingIcon className="size-5" />
					</div>
					<p className="text-center text-xs font-semibold">Quản lý nhóm</p>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-1">
					<AddGroupIcon/>
					<p className="text-center text-xs font-semibold">Thành viên nhóm</p>
				</div>
			</div>
		</div>
	);
};
