// components/PinnedMessageBar.tsx

"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, ChevronDown, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addPinned } from "@/redux/store/models";
import PinnedMessagesDropdown from "../../main-option/components/modal-pinned";
import { IDetailInformation } from "@/types/implement";
import { handlePinnedMessages } from "./handle";

export const PinnedMessageBar = () => {
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const { message } = useSelector((state: RootState) => state.message);
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const { pinnedMessages, detailUser } = selectedRoom
		? handlePinnedMessages(selectedRoom, message ?? [])
		: { pinnedMessages: [], detailUser: [] };

	const lastPinned = pinnedMessages[pinnedMessages.length - 1];

	useEffect(() => {
		console.log("Selected Room:", selectedRoom);
	}, [selectedRoom]);

	return (
		<div className={`relative flex justify-center ${pinnedMessages.length === 0 ? "hidden" : "block"}`}>
			<div className="absolute z-10 mt-3 flex w-[98%] items-center justify-between rounded-md border-b border-gray-200 bg-white p-4">
				<button
					className="flex items-center gap-3"
					onClick={() => dispatch(addPinned(lastPinned))}
				>
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
						<MessageCircle className="h-4 w-4 text-white" />
					</div>
					<div className="flex flex-col">
						<h2 className="self-start text-sm font-medium text-gray-900">Tin nhắn</h2>
						<p className="text-xs text-gray-600">
							{detailUser.find((user: IDetailInformation) => user.userId === lastPinned?.accountId)?.fullName || "Bạn"}
							: {lastPinned?.content}
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
