import { getProfileFromAnotherUser } from "@/api";
import ImageViewer from "@/components/image-preview";
import { LocalStorage } from "@/lib/local-storage";
import { IDetailInformation } from "@/types/implement";
import { IMessage } from "@/types/implement/message.interface";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
	message: IMessage;
}

export const Message = ({ message }: Props) => {
		const account_id = localStorage.getItem(LocalStorage.userId) as string;
		const [profile, setProfile] = useState<IDetailInformation>();
	
		useEffect(() => {
			const fetchDetailInformation = async () => {
				console.log("account_id: ", message.account_id);
				const response = await getProfileFromAnotherUser(message.account_id);
				if (response.data) {
					setProfile(response.data);
				}
			}
			fetchDetailInformation();
		},[message]);
	return (
		<div className="flex w-full items-start space-x-2">
			<ImageViewer src={"https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"}>
				<Image
					priority
					width={40}
					height={40}
					className="size-[40px] max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px] rounded-full object-cover"
					src={"https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"}
					alt="avatar"
				/>
			</ImageViewer>
			<div className="flex max-w-[80%] flex-col gap-2 rounded-lg bg-body p-3">
				<div className="flex items-center">
					<h1 className="text-xs font-light text-text-seen">{profile?.fullName}</h1>
				</div>
				<p className="max-w-[80%] text-wrap break-words text-sm font-normal text-text">{message.content}</p>
				<p className="text-[10px] text-text-seen">{message.createdAt.toLocaleString()}</p>
			</div>
		</div>
	);
};
