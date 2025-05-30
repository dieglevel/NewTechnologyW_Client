"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { ChevronDown, ChevronUp, MessageCircle, MoreHorizontal, ArrowRight } from "lucide-react";
import { Modal, ModalContent } from "@heroui/modal";
import { IDetailInformation, IMessage } from "@/types/implement";
import { removePinnedMessage } from "@/api";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoom } from "@/redux/store/ui/selected-room-slice";


interface PinnedMessagesDropdownProps {
	pinnedMessages: IMessage[];
	detailUser: IDetailInformation[];
	isOpen: boolean;
	onOpenChange: () => void;
}

export default function PinnedMessagesDropdown({ pinnedMessages, isOpen, onOpenChange, detailUser }: PinnedMessagesDropdownProps) {

	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);

	const dispatch = useDispatch();

	const handleUnpinMessage = async (messageId: string) => {
		try {
			if (!selectedRoom?.id) return;

			const result = await removePinnedMessage(selectedRoom.id, messageId);

			if (result.statusCode === 200) {
				dispatch(
					setSelectedRoom({
						...selectedRoom,
						messagePinID: selectedRoom?.messagePinID?.filter((id) => id !== messageId),
					}),
				);
				onOpenChange();
			}
		} catch (err) {
			console.error("Failed to unpin message:", err);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			hideCloseButton
		>
			<ModalContent className="max-w-md gap-0 p-0">
				{/* Modal Header */}
				<div className="flex items-center justify-between border-b border-gray-200 p-4">
					<h3 className="text-sm font-medium text-gray-900">Danh sách ghim ({pinnedMessages.length})</h3>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => onOpenChange()}
						className="text-xs text-gray-600 hover:bg-gray-100"
					>
						Thu gọn
						<ChevronUp className="ml-1 h-3 w-3" />
					</Button>
				</div>

				{/* Pinned Messages List */}
				<div className="py-2">
					{pinnedMessages.map((message) => (
						<div
							key={message._id}
							className="flex items-center justify-between p-3 hover:bg-gray-50"
						>
							<div className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
									<MessageCircle className="h-4 w-4 text-white" />
								</div>
								<div className="flex flex-col">
									<h4 className="text-sm font-medium text-gray-900">
										{detailUser.find((user) => user.userId === message.accountId)
											?.fullName || "Bạn"}
									</h4>
									<p className="text-xs text-gray-600">{message.content}</p>
								</div>
							</div>

							<button
								className="mr-4 rounded-md border border-red-500 px-3 py-1 text-xs text-red-500 hover:bg-red-100"
								onClick={() => handleUnpinMessage(message._id || "")}
							>
								Bỏ ghim
							</button>
						</div>
					))}
				</div>
			</ModalContent>
		</Modal>
	);
}
