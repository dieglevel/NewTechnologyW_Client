import { avatar } from "@/assets/images";
import { ChatIcon, CloudIcon, ContactIcon, SettingIcon } from "@/assets/svgs";
import Image from "next/image";

// Tổng hợp: Chơi combo thì phải theo: flex, item-center, justity-center
// Chưa biết: hug content, full content của thẻ cha chứa nó -> trong phần layout của figma có

export const SideBar = () => {
	return (
		//                               bg-sidebar item-center
		<div className="flex h-lvh w-[60px] flex-col justify-between bg-[#1384fd] px-2 py-1">
			{/* Top side */}
			{/* 														item-center */}
			<div className="flex flex-col justify-center gap-4">
				<div>
					{/* 
						Image ???????
						Xử lý: 
						Bộc image bằng 1 div, Border
							Đặt image vào trong div
							Chỉnh image có width và height là hình vuông
							Chỉnh cắt ảnh lấy ở giữa
							ảnh được load từ server -> hiện tại hiển thị default avatar
					*/}

					<Image
						src={avatar}
						alt="Avatar"
						width={68}
						height={68}
					></Image>
				</div>

				{/*                         item-center   w-fit h-fit                                  rounded-md         */}
				<div className="flex h-fit w-fit justify-center rounded-[4px] p-1 hover:bg-icon-active">
					<ChatIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
				{/*                         item-center   w-fit h-fit                                  rounded-md         */}
				<div className="flex items-center justify-center rounded-[4px] p-1 hover:bg-icon-active">
					<ContactIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
			</div>
			{/* Bottom side */}
			<div className="flex flex-col justify-center gap-4">
				<div className="flex justify-center rounded-[4px]">
					<div className="h-[6px] w-[52px] rounded-[4px] bg-white"></div>
				</div>
				{/*                         item-center   w-fit h-fit                                  rounded-md         */}
				<div className="flex justify-center rounded-[4px] p-1 hover:bg-icon-active">
					<CloudIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
				{/*                         item-center   w-fit h-fit                                  rounded-md         */}
				<div className="flex justify-center rounded-[4px] p-1 hover:bg-icon-active">
					<SettingIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
			</div>
		</div>
	);
};
