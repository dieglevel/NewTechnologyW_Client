"use client";
import { avatar } from "@/assets/images";
import { ChatIcon, CloudIcon, ContactIcon, SettingIcon } from "@/assets/svgs";
import Image from "next/image";
import { useState } from "react";

export const SideBar = () => {
	const [selected, setSelected] = useState<"chat" | "contact">("chat");

	return (
		<div className="flex h-lvh w-[60px] flex-col justify-between bg-[#1384fd] p-1">
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="h-[52px] w-[52px]">
					<Image
					priority
						src={avatar}
						alt="Avatar"
						className="h-[52px] w-[52px] rounded-full"
					></Image>
				</div>
				<div className={"item-center flex h-fit w-fit justify-center rounded-sm p-2 hover:bg-icon-active" + (selected === "chat" ? " bg-icon-active" : "")}>
					<ChatIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
				<div className="flex h-fit w-fit items-center justify-center rounded-md p-2 hover:bg-icon-active">
					<ContactIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="flex justify-center">
					<div className="h-[6px] w-[52px] rounded-md bg-white"></div>
				</div>
				<div className="flex h-fit w-fit justify-center rounded-md p-2 hover:bg-icon-active">
					<CloudIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
				<div className="flex h-fit w-fit justify-center p-2 hover:bg-icon-active">
					<SettingIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
			</div>
		</div>
	);
};
