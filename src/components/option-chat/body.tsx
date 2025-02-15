import { AddGroupIcon, PinIcon, SendIcon, SettingIcon } from "@/assets/svgs";
import Image from "next/image";

export const BodyOption = () => {
	return (
		<div className="flex h-full flex-col bg-body p-3 gap-3">
			<div className="flex flex-col items-center justify-center">
				<Image
					priority
					src={"https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"}
					width={50}
					height={50}
					alt="avatar"
					className="size-[50px] max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px] rounded-full object-cover"
				/>
				<p className="text-xl font-bold">Group name</p>
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
		</div>
	);
};
