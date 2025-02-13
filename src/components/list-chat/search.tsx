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
		<div className="flex h-16 max-h-16 min-h-16 flex-row items-center justify-center gap-2 rounded border-b-1 bg-second p-2 py-2">
			<Input
				ref={searchBtn}
				labelPlacement="outside"
				placeholder="Tìm kiếm"
				startContent={
					<SearchIcon
						onClick={searchEvent}
						className="size-8 stroke-1"
					/>
				}
			/>
			<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-second hover:cursor-pointer hover:bg-[#ccc]">
				<AddFriendIcon className="size-5 stroke-1" />
			</div>
			<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-second hover:cursor-pointer hover:bg-[#ccc]">
				<AddGroupIcon className="size-5 stroke-1" />
			</div>
		</div>
	);
};
