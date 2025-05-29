"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, ChevronDown, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IDetailInformation, IMessage } from "@/types/implement";
import { LocalStorage } from "@/lib/local-storage";
import { getProfileFromAnotherUser } from "@/api";
import PinnedMessagesDropdown from "../../main-option/components/modal-pinned";

export const PinnedMessageBar = () => {
    const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
    const { message } = useSelector((state: RootState) => state.message);

    const userId = localStorage.getItem(LocalStorage.userId);

    const [open, setOpen] = useState(false);
	const [pinnedMessages, setPinnedMessages] = useState<IMessage[]>([]);
	const [detailUser, setDetailUser] = useState<IDetailInformation[]>([]);

	useEffect(() => {
		const fetchPinnedMessages = async () => {
			const pinned = (selectedRoom?.messagePinID || [])
				.map((id) => message?.find((m) => m._id === id))
				.filter(Boolean) as IMessage[];
			setPinnedMessages(pinned);

			const fetchDetails = async () => {
				const users = selectedRoom?.detailRoom?.filter((user) => user.id !== userId) || [];

				const promises = users.map(async (user) => {
					const result = await getProfileFromAnotherUser(user.id || "");
					return {
						userId: user.id,
						...result
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
			  
			
            fetchDetails();
		};

		fetchPinnedMessages();
	}, [selectedRoom]);
	
	const handleScrollToPinned = () => {
		const lastPinned = pinnedMessages[pinnedMessages.length - 1];
		if (!lastPinned?._id) return;

		const el = document.getElementById(`message-${lastPinned._id}`);
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "center" });

			el.classList.add(
				"bg-blue-100",
				"border",
				"border-blue-400",
				"scale-[1.02]",
				"rounded-lg",
				"shadow-lg",
				"transition-all",
				"duration-500",
				"ease-in-out",
			);

			setTimeout(() => {
				el.classList.remove(
					"bg-yellow-100",
					"border",
					"border-blue-400",
					"scale-[1.02]",
					"rounded-lg",
					"shadow-lg",
				);
			}, 1000);
		}
	};

	return (
		<div className={`relative flex justify-center ${pinnedMessages.length === 0 ? "hidden" : "block"}`}>
			<div className="absolute z-10 mt-3 flex w-[98%] items-center justify-between rounded-md border-b border-gray-200 bg-white p-4">
				<button className="flex items-center gap-3" onClick={handleScrollToPinned}>
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
						<MessageCircle className="h-4 w-4 text-white" />
					</div>
					<div className="flex flex-col">
						<h2 className="self-start text-sm font-medium text-gray-900">Tin nhắn</h2>
						<p className="text-xs text-gray-600">
							{detailUser.find(
								(user) => user.userId === pinnedMessages[pinnedMessages.length - 1]?.accountId,
							)?.fullName || "Bạn"}
							: {pinnedMessages[pinnedMessages.length - 1]?.content}
						</p>
					</div>
				</button>

				<div className="flex items-center gap-2">
					<button
						className="flex items-center justify-center rounded-md border border-gray-300 p-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
						onClick={() => setOpen(true)}
					>
						+{pinnedMessages.length} ghim
						<ChevronDown className="ml-1 h-3 w-3" />
					</button>

					<button className="flex h-8 w-8 items-center justify-center rounded-full p-1 text-gray-500 hover:bg-gray-100">
						<MoreHorizontal className="h-4 w-4" />
					</button>

					{open && (
						<PinnedMessagesDropdown
							pinnedMessages={pinnedMessages}
							isOpen={open}
							onOpenChange={() => setOpen(false)}
							detailUser={detailUser}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

