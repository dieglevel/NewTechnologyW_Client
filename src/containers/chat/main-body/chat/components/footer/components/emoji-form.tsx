"use client";

import { EmojiIcon, SearchIcon, StickerIcon } from "@/assets/svgs";
import GiphyApi from "@/lib/giphy";
import { Input } from "@heroui/input";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface EmojiFormProps {
	onSelectEmoji: (emojiData: EmojiClickData, event: MouseEvent) => void;
}

export const EmojiForm = ({ onSelectEmoji }: EmojiFormProps) => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);
	const refIcon = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref) {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					ref.current &&
					!ref.current.contains(event.target as Node) &&
					refIcon.current &&
					!refIcon.current.contains(event.target as Node)
				) {
					setIsShow(false); 
				}
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, []);

	return (
		<div className="relative flex items-center justify-center gap-2">
			<div
				className="flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm hover:bg-background"
				onClick={() => setIsShow(!isShow)}
				ref={refIcon}
			>
				<EmojiIcon className="size-6 stroke-icon-second stroke-2" />
			</div>
			<div className={`absolute bottom-12 z-10 ${isShow ? "block" : "hidden"}`} ref={ref}>
				<EmojiPicker onEmojiClick={onSelectEmoji} />
			</div>
		</div>
	);
};

export default EmojiForm;