"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { ChevronDown, ChevronUp, MessageCircle, MoreHorizontal, ArrowRight } from "lucide-react";
import { Modal, ModalContent } from "@heroui/modal";

interface PinnedMessage {
	id: string;
	title: string;
	preview: string;
}

interface PinnedMessagesDropdownProps {
	pinnedMessages: PinnedMessage[];
	isOpen: boolean;
	onOpenChange: () => void;
}

export default function PinnedMessagesDropdown({ pinnedMessages, isOpen, onOpenChange }: PinnedMessagesDropdownProps) {

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
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
							key={message.id}
							className="flex items-center justify-between p-3 hover:bg-gray-50"
						>
							<div className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
									<MessageCircle className="h-4 w-4 text-white" />
								</div>
								<div className="flex flex-col">
									<h4 className="text-sm font-medium text-gray-900">{message.title}</h4>
									<p className="text-xs text-gray-600">{message.preview}</p>
								</div>
							</div>
							<button
								className="h-8 w-8 p-1 mr-4 text-gray-500 hover:bg-gray-300 rounded-full flex items-center justify-center"
							>
								<MoreHorizontal className="h-4 w-4" />
							</button>
						</div>
					))}
				</div>
			</ModalContent>
		</Modal>
	);
}
