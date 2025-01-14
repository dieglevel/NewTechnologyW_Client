"use client";
import { AddFriendIcon, AddGroupIcon, SearchIcon } from "@/assets/svgs";
import { Input } from "@nextui-org/input";
import { useRef } from "react";
export const SearchComponent = () => {
	const searchBtn = useRef<HTMLInputElement>(null);

	const searchEvent = () => {
		console.log("search");
		searchBtn.current?.focus();
	};
	return (
		<div className="flex h-12 items-center justify-center gap-2 rounded bg-[#f8f8f8] p-2">
			<Input
				ref={searchBtn}
				labelPlacement="outside"
				placeholder="Tìm kiếm"
				startContent={
					<SearchIcon
						onClick={searchEvent}
						className="size-8 stroke-1 hover:cursor-pointer hover:opacity-60"
					/>
				}
				className="rounded-md"
			/>
			<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-white hover:cursor-pointer hover:bg-[#ccc]">
				<AddFriendIcon className="size-5 stroke-1" />
			</div>
			<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-white hover:cursor-pointer hover:bg-[#ccc]">
				<AddGroupIcon className="size-5 stroke-1" />
			</div>
		</div>
	);
};
