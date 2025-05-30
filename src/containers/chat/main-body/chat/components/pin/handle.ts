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

			const pinned = selectedRoom.messagePinID
				.map((id: string) => message?.find((m) => m._id === id))
				.filter(Boolean) as IMessage[];

			setPinnedMessages((prev) => {
				const prevIds = new Set(prev.map((msg) => msg._id));
				const newIds = new Set(pinned.map((msg) => msg._id));
				const isSame = prev.length === pinned.length && [...prevIds].every((id) => newIds.has(id));
                
				if (isSame) return prev;
                if( pinned.length < prev.length ) return pinned;
				return [...prev, ...pinned];
			});

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

