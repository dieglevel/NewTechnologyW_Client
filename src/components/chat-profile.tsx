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

export const ChatProfile: React.FC<Props> = ({ type, userName, message, timeSent, imageUrl, isPin, isSeen, onClick }) => {
	return (
		<div className="flex flex-row items-center gap-3 px-3 py-1" onClick={onClick}>
			<div className="flex items-center rounded-full">
				<Image
					src={imageUrl}
					width={50}
					height={50}
					alt="avatar"
					className="size-[50px] rounded-full object-cover"
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex items-center justify-between">
					<p className="text-base font-semibold line-clamp-1">{userName}</p>
					<p className="text-tiny font-semibold">{caculateDuration(timeSent)}</p>
				</div>

				<div className="flex items-center justify-between">
					<p className={(message.isReceived ? "": "font-semibold ") + "text-tiny line-clamp-1"}>
						{message.isReceived ? "Bạn" + ":" : ""}
						{message.text}
					</p>
					<div>
                  <div className="size-[8px] bg-danger rounded-full"></div>
               </div>
				</div>
			</div>
		</div>
	);
};
