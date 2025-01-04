import { avatar } from "@/assets/images";
import Image from "next/image";
import { ChatIcon, CloudIcon, ContactIcon, SettingIcon } from "../../../../public/svg";

export const SideBar = () => {
	return (
		<div className="w-[92px] h-lvh bg-[#1384fd] py-2 px-3 flex flex-col justify-between">
			{/* Top side */}
			<div className="justify-center flex flex-col gap-[18px]">
				<Image
					src={avatar}
					alt="Avatar"
					width={68}
					height={68}
				></Image>
				<div className="hover:bg-icon-active justify-center flex p-3 rounded-[8px] ">
					<ChatIcon
						color="#fff"
						size={36}
						strokeWidth={5}
					/>
				</div>
				<div className="hover:bg-icon-active justify-center flex p-3 rounded-[8px] ">
					<ContactIcon
						color="#fff"
						size={36}
						strokeWidth={5}
					/>
				</div>
			</div>
			{/* Bottom side */}
			<div className="justify-center flex flex-col gap-[18px]">
				<div className=" justify-center flex  rounded-[8px]">
					<div className="w-[52px] h-[6px] bg-white rounded-[8px]"></div>
				</div>
				<div className="hover:bg-icon-active justify-center flex p-3 rounded-[8px] ">
					<CloudIcon
						color="#fff"
						size={36}
						strokeWidth={5}
					/>
				</div>
				<div className="hover:bg-icon-active justify-center flex p-3 rounded-[8px] ">
					<SettingIcon
						color="#fff"
						size={36}
						strokeWidth={5}
					/>
				</div>
			</div>
		</div>
	);
};
