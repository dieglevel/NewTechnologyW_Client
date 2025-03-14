"use client";

import { SearchIcon, StickerIcon } from "@/assets/svgs";
import { useIndexedDB } from "@/hooks/indexed-db";
import GiphyApi from "@/lib/giphy";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

enum ListTabs {
	STICKER = "STICKER",
	EMOJI = "EMOJI",
	GIF = "GIF",
}

const Sticker = () => {
	const [isHidden, setIsHidden] = useState<boolean>(true);
	const [selectType, setSelectType] = useState<ListTabs>(ListTabs.STICKER);
	const ref = useRef<HTMLDivElement>(null);
	const refIcon = useRef<HTMLDivElement>(null);

	const [data, setData] = useState<any[]>([]);

	const { addItem, getAllItems, getItemById, updateItem } = useIndexedDB<{ data: string; id: string }>({
		databaseName: "sticker",
		storeName: "sticker",
		databaseVersion: 1,
	});

	useEffect(() => {
		if (ref) {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					ref.current &&
					!ref.current.contains(event.target as Node) &&
					refIcon.current &&
					!refIcon.current.contains(event.target as Node)
				) {
					setIsHidden(true);
				}
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, []);

	useEffect(() => {
		const fetchGiphy = async () => {
			const data = await GiphyApi.search("happy", { limit: 12, type: "stickers" });
			setData(data.data);
		};
		fetchGiphy();
	}, []);

	return (
		<div className="relative flex items-center justify-center gap-2">
			<div
				ref={refIcon}
				className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background"
				onClick={() => {
					setIsHidden(!isHidden);
				}}
			>
				<StickerIcon className="size-6 stroke-icon-second hover:cursor-pointer" />
			</div>
			<div
				ref={ref}
				className={`absolute bottom-12 left-0 flex flex-col gap-3 rounded-md border-1 border-background bg-body p-2 transition-opacity duration-300 ${isHidden ? "pointer-events-none opacity-0" : "opacity-100"} `}
			>
				<div className="flex items-center justify-center gap-3 border-b-1 border-background pb-2">
					{Object.values(ListTabs).map((item) => (
						<div
							key={item}
							className={`${selectType === item ? "bg-icon-active" : "bg-second hover:bg-third"} min-w-36 rounded-md px-6 py-1 hover:cursor-pointer`}
							onClick={() => setSelectType(item)}
						>
							<p className={`${selectType === item ? "text-white" : ""} text-center font-bold`}>
								{item}
							</p>
						</div>
					))}
				</div>
				{/* Search */}
				<Input
					startContent={<SearchIcon className="size-6 stroke-icon-second" />}
					placeholder={`Tìm kiếm ${selectType.toLowerCase()}`}
					variant="bordered"
					className="rounded-md border-1"
					classNames={{ input: ["bg-body"], inputWrapper: ["border-none", "shadow-none"] }}
				/>
				<div className="flex max-h-[400px] w-full flex-wrap items-center justify-center gap-2 overflow-y-auto p-2">
					{data.map((item) => (
						<Image
							className="cursor-pointer p-3 hover:bg-third"
							alt="sticker"
							key={item.id}
							src={item.images.fixed_width.url}
							width={120}
							height={120}
							onClick={() => {
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sticker;
