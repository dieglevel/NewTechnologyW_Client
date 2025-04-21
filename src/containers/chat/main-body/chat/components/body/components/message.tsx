import { getProfileFromAnotherUser } from "@/api";
import ImageViewer from "@/components/image-preview";
import { LocalStorage } from "@/lib/local-storage";
import { IDetailInformation } from "@/types/implement";
import { IMessage } from "@/types/implement/message.interface";
import { changeDateToString } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
	message: IMessage;
}

export const Message = ({ message }: Props) => {
	const [profile, setProfile] = useState<IDetailInformation>();

	const [account_id] = useState<string>(LocalStorage.userId || "");
	useEffect(() => {
		// const fetchDetailInformation = async () => {
		// 	const response = await getProfileFromAnotherUser(message.account_id);
		// 	if (response.data) {
		// 		setProfile(response.data);
		// 	}
		// };
		// fetchDetailInformation();
	}, [message]);

	return (
		<>
			{message.account_id === account_id ? (
				<div className="mb-2 flex justify-end">
					<div className="flex max-w-[80%] flex-col gap-2 rounded-lg bg-blue-200 p-3">
						<p className="break-words text-sm font-normal text-text">{message.content}</p>
						<p className="text-[10px] text-text-seen">{changeDateToString(message.createdAt)}</p>
					</div>
				</div>
			) : (
				<div className="flex w-full items-start space-x-2">
					<ImageViewer
						src={
							profile?.avatarUrl ||
							"https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
						}
					>
						<Image
							priority
							width={40}
							height={40}
							className="h-[40px] w-[40px] rounded-full object-cover"
							src={
								profile?.avatarUrl ||
								"https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
							}
							alt="avatar"
						/>
					</ImageViewer>
					<div className="flex max-w-[80%] flex-col gap-2 rounded-lg bg-body p-3">
						<h1 className="text-xs font-light text-text-seen">{message.content}</h1>
						<p className="break-words text-sm font-normal text-text">{message.content}</p>
						<p className="text-[10px] text-text-seen">{changeDateToString(message.createdAt)}</p>
					</div>
				</div>
			)}
		</>
	);
};
