import { AddGroupIcon, ColumnIcon, SearchIcon, UserIcon } from "@/assets/svgs";
import { default_group } from "@/assets/images";
import { useDisclosure } from "@heroui/modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { GroupModal } from "@/containers/chat/second-bar/search/components/modal-group";
import { AccountInfoModal } from "@/containers/chat/second-bar/search/components/modal-information";
import { getProfileFromAnotherUser } from "@/api";
import { useOptionView } from "@/hooks/option-view";
import { LocalStorage } from "@/lib/local-storage";
import { ErrorResponse } from "@/lib/axios";
import { RootState } from "@/redux/store";
import { ISearchAccount } from "@/types/implement/response";
import { getAvatarSrc, getRoomName } from "./handle";

interface Props {
	imageUrl: string;
}

export const HeaderChat = ({ imageUrl }: Props) => {
	const { isOpen: isGroupOpen, onOpen: openGroup, onOpenChange: changeGroup } = useDisclosure();
	const { isOpen: isInfoModal, onOpen: openInfo, onOpenChange: changeInfo } = useDisclosure();
	const { isOpen: isOptionsOpen, setSelect } = useOptionView();

	const accountId = localStorage.getItem(LocalStorage.userId) || "";

	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const [friend, setFriend] = useState<ISearchAccount>({} as ISearchAccount);

	const avtarSrc = getAvatarSrc({selectedRoom, accountId});
	const name = getRoomName({selectedRoom, accountId});

	useEffect(() => {
		const fetchFriendInfo = async () => {
			if (selectedRoom?.type !== "single") return;

			const [user1, user2] = selectedRoom.detailRoom || [];
			const targetId = user1?.id === accountId ? user2?.id : user1?.id;

			if (!targetId) return;

			try {
				const response = await getProfileFromAnotherUser(targetId);
				if (response.statusCode === 200) {
					setFriend({ id: targetId, detailInformation: response.data });
				}
			} catch (error) {
				const e = error as ErrorResponse;
			}
		};
		setSelect(false);

		fetchFriendInfo();
	}, [selectedRoom]);



	return (
		<div className="flex h-16 items-center justify-between border-b bg-body px-2">
			<div className="flex items-center gap-3">
				<div
					onClick={openInfo}
					className="border-body cursor-pointer rounded-full border-2 hover:border-icon-active hover:shadow-md"
				>
					<Image
						src={avtarSrc || default_group.src}
						width={50}
						height={50}
						alt="avatar"
						className="size-[50px] rounded-full object-cover"
					/>
				</div>
				<div>
					<p className="text-xl font-semibold">{name}</p>
					<div className="flex items-center gap-1">
						<UserIcon className="size-5 font-bold" />
						<p className="text-sm font-light text-gray-500">
							{selectedRoom?.detailRoom?.filter((member) => !!member.role).length || 0} thành viên
						</p>
					</div>
				</div>
			</div>

			<div className="flex gap-2">
				{selectedRoom?.type === "group" && (
					<div
						onClick={openGroup}
						className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm"
					>
						<AddGroupIcon className="size-5 stroke-icon-second stroke-1" />
					</div>
				)}

				<div className="flex h-8 w-8 items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-[#ccc]">
					<SearchIcon className="size-5 stroke-icon-second stroke-1" />
				</div>

				<div
					onClick={() => setSelect(!isOptionsOpen)}
					className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm ${
						isOptionsOpen ? "bg-icon-inactive hover:bg-icon-active" : "bg-body hover:bg-[#ccc]"
					}`}
				>
					<ColumnIcon
						className={`size-5 stroke-1 ${
							isOptionsOpen ? "stroke-icon-active" : "stroke-icon-second"
						}`}
					/>
				</div>
			</div>

			{selectedRoom && (
				<GroupModal
					open={isGroupOpen}
					onOpenChange={changeGroup}
					selectedRoom={selectedRoom}
					isRoom
					title="Chỉnh sửa nhóm"
				/>
			)}
			{selectedRoom?.type === "single" && (
				<AccountInfoModal
					isOpen={isInfoModal}
					onOpenChange={changeInfo}
					onClose={changeInfo}
					data={friend}
				/>
			)}
		</div>
	);
};
