"use client";
import { avatar } from "@/assets/images";
import { ChatIcon, CloudIcon, ContactIcon, SettingIcon } from "@/assets/svgs";
import { SVGButton } from "@/components/ui";
import { useSidebar } from "@/hooks/sidebar";
import { AppDispatch, RootState } from "@/redux/store";
import { SideBarSelected } from "@/redux/store/sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "./components/user";
import Setting from "./components/setting/setting";

export const Sidebar = () => {
	const { selected, setSelect } = useSidebar();

	return (
		<div className="flex h-lvh min-w-[70px] max-w-[70px] flex-col justify-between bg-[#1384fd] p-1">
			<div className="flex flex-col items-center justify-center gap-4">
				<User />
				<SVGButton
					className={selected === SideBarSelected.Chat ? "bg-icon-active" : ""}
					onClick={() => {
						setSelect(SideBarSelected.Chat);
					}}
				>
					<ChatIcon className="size-8 stroke-[3px] text-icon-active" />
				</SVGButton>

				<SVGButton
					className={selected === SideBarSelected.Contact ? "bg-icon-active" : ""}
					onClick={() => {
						setSelect(SideBarSelected.Contact);
					}}
				>
					<ContactIcon className="size-8 stroke-[3px] text-icon-active" />
				</SVGButton>
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="flex justify-center">
					<div className="h-[6px] w-[52px] rounded-md bg-white"></div>
				</div>

				<SVGButton>
					<CloudIcon className="size-8 stroke-[3px] text-icon-active" />
				</SVGButton>

				<Setting />
			</div>
		</div>
	);
};
