import { sendRequestFriend } from "@/api";
import { avatarDefault, defaultBackground } from "@/assets/images";
import ImageViewer from "@/components/image-preview";
import { ErrorResponse } from "@/lib/axios";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { ISearchAccount } from "@/types/implement/response";
import { changeDateToString } from "@/utils";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AccountInfoModal } from "./modal-information";

interface Props {
	data: ISearchAccount;
}

const AccountDetail = ({ data }: Props) => {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	return (
		<>
			<AccountInfoModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
				data={data}
			/>
			<div
				className="flex cursor-pointer flex-row items-center gap-3 px-3 py-3 transition-all hover:bg-background"
				onClick={onOpen}
			>
				<div className="flex items-center rounded-full border-3 border-gray-200">
					<Image
						priority
						src={data.detailInformation.avatarUrl ?? avatarDefault}
						width={50}
						height={50}
						alt="avatar"
						className="size-[50px] max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px] rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-1 flex-col">
					<div className="flex items-center justify-between">
						<p className="line-clamp-1 text-base font-semibold">
							{data.detailInformation.fullName ?? "-"}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default AccountDetail;
