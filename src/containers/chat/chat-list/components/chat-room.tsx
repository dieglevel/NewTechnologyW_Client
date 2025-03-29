import { caculateDuration } from "@/utils/caculate-duration";
import Image from "next/image";

interface Props {
	type: "user" | "group";
	userName: string;
	message: {
		text: string;
		isReceived: boolean;
	};
	timeSent: Date;
	imageUrl: string;
	isPin?: boolean;
	isSeen?: boolean;

	onClick?: () => void;
}

export const ChatRoom = ({
	type,
	userName,
	message,
	timeSent,
	imageUrl,
	isPin,
	isSeen,
	onClick,
}: Props) => {
	return (
		<div
			className="flex cursor-pointer flex-row items-center gap-3 px-3 py-3 transition-all hover:bg-background"
			onClick={onClick}
		>
			<div className="flex items-center rounded-full">
				<Image
					priority
					src={imageUrl}
					width={50}
					height={50}
					alt="avatar"
					className="size-[50px] min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-full object-cover"
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex items-center justify-between">
					<p className="line-clamp-1 text-base font-semibold">{userName}</p>
					<p className="text-tiny font-semibold">{caculateDuration(timeSent)}</p>
				</div>

				<div className="flex items-center justify-between">
					<p className={(message.isReceived ? "" : "font-semibold ") + "line-clamp-1 text-tiny"}>
						{message.isReceived ? "Bạn" + ":" : ""}
						{message.text}
					</p>
					<div>
						<div className="size-[8px] rounded-full bg-danger"></div>
					</div>
				</div>
			</div>
		</div>
	);
};
