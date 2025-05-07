import { AddGroupIcon, ColumnIcon, SearchIcon, UserIcon } from "@/assets/svgs";
import ImageViewer from "@/components/image-preview";
import { useOptionView } from "@/hooks/option-view";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import { default_group } from "@/assets/images";
import { LocalStorage } from "@/lib/local-storage";
import { useEffect, useState } from "react";
import { AddMemberModal } from "./components/modal-add";
import { useDisclosure } from "@heroui/modal";
import { GroupModal } from "@/containers/chat/second-bar/search/components/modal-group";
import { AccountInfoModal } from "@/containers/chat/second-bar/search/components/modal-information";
import { ISearchAccount } from "@/types/implement/response";
import { ErrorResponse } from "@/lib/axios";
import { getProfileFromAnotherUser } from "@/api";

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

	useEffect(() => {
		const fetch = async () => {
			try {
				if (selectedRoom?.type === "single") {
					const targetId =
						selectedRoom?.detailRoom?.[0]?.id === accountId
							? selectedRoom?.detailRoom?.[1]?.id
							: selectedRoom?.detailRoom?.[0]?.id;

					if (targetId) {
						const response = await getProfileFromAnotherUser(targetId);
						if (response.statusCode === 200) {
							setFriend({ id: targetId, detailInformation: response.data });
						}
					}
				}
			} catch (error) {
				const e = error as ErrorResponse;
			}
		};
		fetch();
	}, [selectedRoom]);

	const handleModalAdd = () => {
		openGroup();
	};

	const handleToggleOptions = () => {
		setSelect(!isOptionsOpen);
	};

	const handleUserInfo = () => {
		openInfo();
	};

	return (
		<div className="flex h-16 max-h-16 min-h-16 flex-row items-center justify-between border-b-1 bg-body px-2">
			<div className="flex flex-row items-center gap-3">
				<div
					className="border-body cursor-pointer rounded-full border-2 hover:border-icon-active hover:shadow-md"
					onClick={handleUserInfo}
				>
					<Image
						priority
						src={
							selectedRoom?.avatar ||
							(selectedRoom?.type === "group"
								? default_group
								: selectedRoom?.detailRoom?.[0]?.id === accountId
									? selectedRoom?.detailRoom?.[1]?.avatar
									: selectedRoom?.detailRoom?.[0]?.avatar) ||
							default_group
						}
						width={50}
						height={50}
						alt="avatar"
						className="size-[50px] rounded-full object-cover"
					/>
				</div>

				<div>
					<p className="text-xl font-semibold">
						{selectedRoom?.type === "group"
							? selectedRoom.name
							: selectedRoom?.detailRoom?.length === 2
								? selectedRoom.detailRoom[0]?.id === accountId
									? selectedRoom.detailRoom[1]?.fullName || "-"
									: selectedRoom.detailRoom[0]?.fullName || "-"
								: "-"}
					</p>
					<div className="flex h-fit flex-row items-center gap-1">
						<UserIcon className="size-5 font-bold" />
						<p className="text-sm font-light text-gray-500">
							{selectedRoom?.detailRoom?.length} thành viên
						</p>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-2">
				<div
					className={`flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm ${selectedRoom?.type === "group" ? "block" : "hidden"}`}
					onClick={handleModalAdd}
				>
					<AddGroupIcon className={`size-5 stroke-icon-second stroke-1`} />
				</div>
				<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-[#ccc]">
					<SearchIcon className="size-5 stroke-icon-second stroke-1" />
				</div>
				<div
					className={
						(isOptionsOpen ? "bg-icon-inactive hover:bg-icon-active" : "bg-body hover:bg-[#ccc]") +
						` flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm`
					}
					onClick={handleToggleOptions}
				>
					<ColumnIcon
						className={
							isOptionsOpen ? "stroke-icon-active" : "stroke-icon-second " + ` size-5 stroke-1`
						}
					/>
				</div>

				{selectedRoom && (
					<GroupModal
						open={isGroupOpen}
						onOpenChange={changeGroup}
						selectedRoom={selectedRoom}
						isRoom={true}
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
		</div>
	);
};
