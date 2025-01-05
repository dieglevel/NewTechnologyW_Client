import { avatar } from "@/assets/images";
import { ChatIcon, CloudIcon, ContactIcon, SettingIcon } from "@/assets/svgs";
import Image from "next/image";

export const SideBar = () => {
	return (
		<div className="w-[60px] h-lvh bg-[#1384fd] py-1 px-2 flex flex-col justify-between">
			{/* Top side */}
			<div className="justify-center flex flex-col gap-[18px]">
				<div>
					<Image
						src={avatar}
						alt="Avatar"
						width={68}
						height={68}
					></Image>
				</div>
				<div className="hover:bg-icon-active justify-center flex p-1 rounded-[4px] ">
					<ChatIcon className="size-8 text-icon-active stroke-[3px]" />
				</div>
				<div className="hover:bg-icon-active justify-center items-center flex p-1 rounded-[4px] ">
					<ContactIcon className=" size-8 text-icon-active stroke-[3px]" />
				</div>
			</div>
			{/* Bottom side */}
			<div className="justify-center flex flex-col gap-[18px]">
				<div className=" justify-center flex  rounded-[4px]">
					<div className="w-[52px] h-[6px] bg-white rounded-[4px]"></div>
				</div>
				<div className="hover:bg-icon-active justify-center flex p-1 rounded-[4px] ">
					<CloudIcon className="size-8 text-icon-active stroke-[3px]" />
				</div>
				<div className="hover:bg-icon-active justify-center flex p-1 rounded-[4px] ">
					<SettingIcon className="size-8 text-icon-active stroke-[3px]" />
				</div>
			</div>
		</div>
	);
};
