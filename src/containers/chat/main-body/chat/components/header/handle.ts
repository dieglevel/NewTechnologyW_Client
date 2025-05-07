import { default_group } from "@/assets/images";
import { IRoom } from "@/types/implement"

interface Props {
    selectedRoom: IRoom | null,
    accountId: string,
}

export const getAvatarSrc = ({ selectedRoom, accountId }: Props) => {
    if (!selectedRoom) return default_group.src;

	if (selectedRoom?.avatar) return selectedRoom.avatar;

	if (selectedRoom?.type === "group") return default_group.src;

	const [user1, user2] = selectedRoom?.detailRoom || [];
	if (!user1 || !user2) return default_group.src;

	return user1.id === accountId ? user2.avatar : user1.avatar;
};

export const getRoomName = ({ selectedRoom, accountId }: Props) => {
    if (!selectedRoom) return default_group.src;

	if (selectedRoom?.type === "group") return selectedRoom.name;

	const [user1, user2] = selectedRoom?.detailRoom || [];
	if (!user1 || !user2) return "-";

	return user1.id === accountId ? user2.fullName || "-" : user1.fullName || "-";
};
