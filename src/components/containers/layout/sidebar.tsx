import { avatar } from "@/assets/images";
import Image from "next/image";
import { ChatIcon, CloudIcon, ContactIcon, SettingIcon } from "../../../../public/svg";

export const SideBar = () => {
	return (
		<div className="w-[60px] h-lvh bg-[#1384fd] py-2 px-3 flex flex-col justify-between">
			{/* Top side */}
			<div className="justify-center flex flex-col gap-[18px]">
				<Image
					src={avatar}
					alt="Avatar"
					width={68}
					height={68}
				></Image>
				<div className="hover:bg-icon-active justify-center flex p-1 rounded-[4px] ">
					<ChatIcon
						color="#fff"
						size={32}
						strokeWidth={3}
					/>
				</div>
				<div className="hover:bg-icon-active justify-center flex p-1 rounded-[4px] ">
					<ContactIcon
						color="#fff"
						size={32}
						strokeWidth={3}
					/>
				</div>
			</div>
			{/* Bottom side */}
			<div className="justify-center flex flex-col gap-[18px]">
				<div className=" justify-center flex  rounded-[4px]">
					<div className="w-[52px] h-[6px] bg-white rounded-[4px]"></div>
				</div>
				<div className="hover:bg-icon-active justify-center flex p-1 rounded-[4px] ">
					<CloudIcon
						color="#fff"
						size={32}
						strokeWidth={3}
					/>
				</div>
				<div className="hover:bg-icon-active justify-center flex p-1 rounded-[4px] ">
					<SettingIcon
						color="#fff"
						size={32}
						strokeWidth={3}
					/>
				</div>
			</div>
		</div>
	);
};
