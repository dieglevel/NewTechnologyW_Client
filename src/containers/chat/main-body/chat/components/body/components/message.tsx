import { getProfileFromAnotherUser } from "@/api";
import ImageViewer from "@/components/image-preview";
import { LocalStorage } from "@/lib/local-storage";
import { IDetailInformation } from "@/types/implement";
import { IMessage } from "@/types/implement/message.interface";
import { changeDateToString } from "@/utils";
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
			const response = await getProfileFromAnotherUser(message.account_id);
			if (response.data) {
				setProfile(response.data);
			}
		};
		fetchDetailInformation();
	}, []);

	const renderFiles = () => {
		if (!message.files || message.files.length === 0) return null;

		return (
			<div className="flex flex-wrap gap-2">
				{!Array.isArray(message.files) || message.files.length === 0 ? null : message.files.map((file, index) => {
					const fileType = file.data?.type || "";
					const isImage = fileType.startsWith("image/");
					if (isImage) {
						return (
							<ImageViewer
								key={index}
								src={file.url}
							>
								<img
									src={file.url}
									alt={file.data?.name || "image"}
									width={200}
									height={200}
									className="max-h-[200px] rounded-lg object-cover"
								/>
							</ImageViewer>
						);
					}

					return (
						<a
							key={index}
							href={file.url}
							target="_blank"
							rel="noopener noreferrer"
							className="break-words text-sm text-blue-600 underline"
						>
							📎 {file.data?.name || "Tệp đính kèm"}
						</a>
					);
				})}
			</div>
		);
	};

	const isSender = message.account_id === account_id;

	return (
		<div className={`mb-2 flex ${isSender ? "justify-end" : "justify-start"} w-full`}>
			{!isSender && (
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
						className="mr-2 h-[40px] w-[40px] rounded-full object-cover"
						src={
							profile?.avatarUrl ||
							"https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
						}
						alt="avatar"
					/>
				</ImageViewer>
			)}

			<div
				className={`flex max-w-[80%] flex-col gap-2 rounded-lg p-3 ${isSender ? "bg-blue-200" : "bg-body"}`}
			>
				{!isSender && <h1 className="text-xs font-light text-text-seen">{profile?.fullName}</h1>}
				{message.isRevoked ? (
					<p className="text-sm italic text-gray-400">Tin nhắn đã được thu hồi</p>
				) : (
					<>
						{message.content && (
							<p className="break-words text-sm font-normal text-text">{message.content}</p>
						)}
						{renderFiles()}
					</>
				)}
			</div>
		</div>
	);
};
