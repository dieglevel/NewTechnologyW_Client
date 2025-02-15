import { EmojiIcon, FileIcon, ImageIcon, SendIcon, StickerIcon, UserChatIcon } from "@/assets/svgs";
import { Input } from "@nextui-org/input";

export const FooterChat = () => {
	return (
		<div className="flex w-full flex-col border-t-1 bg-body">
			<div className="flex gap-4 px-2 py-2">
				<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background">
					<StickerIcon className="size-6 stroke-icon-second" />
				</div>
				<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background">
					<ImageIcon className="size-6 stroke-icon-second" />
				</div>
				<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background">
					<FileIcon className="size-6 stroke-icon-second" />
				</div>
				<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background">
					<UserChatIcon className="size-6 stroke-icon-second" />
				</div>
			</div>
			<div className="flex w-full items-center justify-center border-t-1">
				<Input
					placeholder="Type a message"
					className="w-full border-none"
					variant="bordered"
					isClearable
					classNames={{ input: ["bg-body"], inputWrapper: ["border-none", "shadow-none"] }}
				/>
				<div className="flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm hover:bg-background">
					<EmojiIcon className="size-6 stroke-icon-second stroke-2" />
				</div>
				<div className="flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm hover:bg-background">
					<SendIcon className="size-6 stroke-icon-second" />
				</div>
			</div>
		</div>
	);
};
