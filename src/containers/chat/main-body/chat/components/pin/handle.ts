import { addPinned } from '@/redux/store/models';
// hooks/usePinnedMessages.ts

import { useEffect, useState } from "react";
import { IMessage, IDetailInformation, IRoom } from "@/types/implement";
import { getProfileFromAnotherUser } from "@/api";
import { LocalStorage } from "@/lib/local-storage";
import { addToast } from '@heroui/toast';

export const handlePinnedMessages = (selectedRoom: IRoom, message: IMessage[] | null) => {
	const [pinnedMessages, setPinnedMessages] = useState<IMessage[]>([]);
	const [detailUser, setDetailUser] = useState<IDetailInformation[]>([]);
	const userId = localStorage.getItem(LocalStorage.userId);

	useEffect(() => {
		const fetchPinnedMessages = async () => {
			if (!selectedRoom?.messagePinID) return;



			if (selectedRoom.messagePinID && message) {
				const pinned = message.filter((msg) => selectedRoom.messagePinID?.includes(msg._id || ""));
				console.log(pinned, "Pinned Messages");
				setPinnedMessages(pinned);
			} else {
				setPinnedMessages([]);
			}

			const users = selectedRoom?.detailRoom?.filter((user: any) => user.id !== userId) || [];
			const promises = users.map(async (user: any) => {
				const result = await getProfileFromAnotherUser(user.id || "");
				return {
					userId: user.id,
					...result,
				};
			});

			const results = await Promise.all(promises);

			const validUsers = results
				.filter((r) => r.statusCode === 200)
				.map((r) => ({
					...r.data,
					userId: r.userId,
				}));

			setDetailUser(validUsers);
		};

		fetchPinnedMessages();
	}, [selectedRoom, message]);

	return { pinnedMessages, detailUser };
};

