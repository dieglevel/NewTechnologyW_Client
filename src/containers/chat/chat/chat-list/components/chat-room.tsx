import { getProfileFromAnotherUser } from "@/api";
import { api } from "@/lib/axios";
import { LocalStorage } from "@/lib/local-storage";
import { IDetailInformation } from "@/types/implement";
import { IRoom } from "@/types/implement/room.interface";
import { caculateDuration } from "@/utils/caculate-duration";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface Props {
	room: IRoom;
	onClick?: () => void;
}

export const ChatRoom = ({ room, onClick }: Props) => {
	const account_id = localStorage.getItem(LocalStorage.userId) as string;
	const [profile, setProfile] = useState<IDetailInformation>();

	useEffect(() => {
		const fetchDetailInformation = async () => {
			const response = await getProfileFromAnotherUser(room.messages_latest[0].accountId);
			if (response.data) {
				setProfile(response.data);
			}
		}
		fetchDetailInformation();
	}, [room]);

	return (
		<div
			className="flex cursor-pointer flex-row items-center gap-3 px-3 py-3 transition-all hover:bg-background lg:min-w-[300px]"
			onClick={onClick}
		>
			<div className="flex items-center rounded-full">
				<Image
					priority
					src={profile?.avatarUrl || "https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"}
					width={50}
					height={50}
					alt="avatar"
					className="size-[50px] max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px] rounded-full object-cover"
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex items-center justify-between">
					<p className="line-clamp-1 text-base font-semibold">{profile?.fullName === null ? "anonymous" : profile?.fullName}</p>
					<p className="text-tiny font-semibold">
						{caculateDuration(room ? new Date(room.updatedAt) : new Date())}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<p
						className={
							(room && room.messages_latest[0].accountId === account_id ? "" : "font-semibold ") +
							"line-clamp-1 text-tiny"
						}
					>
						{room && room.messages_latest[0].accountId === account_id ? "Bạn: " : ""}
						{room ? room.messages_latest[0].content : "N/A"}
					</p>

					{room &&
					room.isSeen &&
					!room.isSeen.includes(account_id) &&
					room.messages_latest[0].accountId !== account_id ? (
						<div>
							<div className="size-[8px] rounded-full bg-danger"></div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
