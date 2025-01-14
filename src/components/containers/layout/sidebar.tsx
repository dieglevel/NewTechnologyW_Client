import { avatar } from "@/assets/images";
import { ChatIcon, CloudIcon, ContactIcon, SettingIcon } from "@/assets/svgs";
import Image from "next/image";

// Tổng hợp: Chơi combo thì phải theo: flex, item-center, justity-center
// Chưa biết: hug content, full content của thẻ cha chứa nó -> trong phần layout của figma có

export const SideBar = () => {
	return (
		<div className="flex h-lvh w-[60px] flex-col justify-between bg-[#1384fd] p-1">
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="h-[52px] w-[52px]">
					<Image
						src={avatar}
						alt="Avatar"
						className="h-[52px] w-[52px] rounded-full"
					></Image>
				</div>
				<div className="item-center flex h-fit w-fit justify-center rounded-sm p-1 hover:bg-icon-active">
					<ChatIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
				<div className="flex h-fit w-fit items-center justify-center rounded-md p-1 hover:bg-icon-active">
					<ContactIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="flex justify-center">
					<div className="h-[6px] w-[52px] rounded-md bg-white"></div>
				</div>
				<div className="flex h-fit w-fit justify-center rounded-md p-1 hover:bg-icon-active">
					<CloudIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
				<div className="flex h-fit w-fit justify-center p-1 hover:bg-icon-active">
					<SettingIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
			</div>
		</div>
	);
};
