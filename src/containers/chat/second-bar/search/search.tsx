"use client";

import { AddFriendIcon, AddGroupIcon, SearchIcon } from "@/assets/svgs";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { GroupModal } from "./components/modal-group";
import { useDisclosure } from "@heroui/modal";

interface Props {
	search: string;
	setSearchAction: (search: string) => void;
}

export const SearchComponent = ({ search, setSearchAction }: Props) => {
	
	const { isOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		console.log(showGroup, "search");
	}, [showGroup]);

	return (
		<div className="flex h-16 max-h-16 min-h-16 flex-row items-center justify-center gap-2 rounded border-b-1 bg-second p-2 py-2">
			<Input
				placeholder="Tìm kiếm"
				value={search}
				onChange={(e) => setSearchAction(e.target.value)}
				startContent={<SearchIcon className="size-8 fill-icon-second stroke-icon-second stroke-[0.1]" />}
				variant="bordered"
				classNames={{
					input: "bg-background placeholder:text-second placeholder:font-semibold",
					inputWrapper: ["border-none", "shadow-none", "bg-body"],
				}}
			/>
			<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-second hover:cursor-pointer hover:bg-[#ccc]">
				<AddFriendIcon className="size-5 stroke-1" />
			</div>
			<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-second hover:cursor-pointer hover:bg-[#ccc]" 
				onClick={() => onOpenChange()}
			>
				<AddGroupIcon className="size-5 stroke-1" />
			</div>
			{ isOpen && (
				<GroupModal open={isOpen} onOpenChange={onOpenChange} />
			)
			}
			
		</div>
	);
};
