import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import ImageViewer from "@/components/image-preview";
import { changeDateToString } from "@/utils";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { addToast } from "@heroui/toast";
import { ErrorResponse } from "@/lib/axios";
import { sendRequestFriend } from "@/api";
import { LocalStorage } from "@/lib/local-storage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { avatarDefault, defaultBackground } from "@/assets/images";
import { ISearchAccount } from "@/types/implement/response";

interface AccountInfoModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: (open: boolean) => void;
	data: ISearchAccount;
}

export const AccountInfoModal = ({ isOpen, onClose, onOpenChange, data }: AccountInfoModalProps) => {
	const [message, setMessage] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const myAccountID = localStorage.getItem(LocalStorage.userId) ?? "";

	const { sendedFriends } = useSelector((state: RootState) => state.sendedFriend);
	const { myListFriend } = useSelector((state: RootState) => state.myListFriend);

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			console.log(data, "data");
			const response = await sendRequestFriend(data.id, message);
			if (response.statusCode === 201) {
				addToast({
					classNames: { title: "font-bold", description: "text-sm" },
					variant: "solid",
					title: "Gửi lời mời kết bạn thành công",
					color: "success",
				});
			}
		} catch (error) {
			const e = error as ErrorResponse;
			addToast({
				classNames: { title: "font-bold", description: "text-sm" },
				variant: "solid",
				title: "Gửi lời mời kết bạn thất bại",
				description: e.message,
				color: "danger",
			});
		} finally {
			setIsSubmitting(false);
			onClose();
		}
	};

	const checkSendedFriend = () => {
		// console.log(sendedFriends, myListFriend, data, "heheheh");
		if (sendedFriends) {
			const sendedFriend = sendedFriends.find((friend) => friend.receiver_id === data.id);
			if (sendedFriend) {
				return true;
			}
		}

		if (myListFriend) {
			const myFriend = myListFriend.find((friend) => friend.accountId === data.id);
			if (myFriend) {
				return true;
			}
		}

		return false;
	};

	return (
		<Modal
			isOpen={isOpen}
			className={isOpen ? "" : "inert"}
			aria-hidden={!isOpen}
			onOpenChange={onOpenChange}
			onClose={onClose}
		>
			<ModalContent className="divide-y-2">
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1 text-center">
							<p>Thông tin tài khoản</p>
						</ModalHeader>

						{status === "loading" ? (
							<Spinner className="h-64" />
						) : (
							<ModalBody className="py-4">
								<div className="relative my-4 flex flex-col gap-4">
									<div className="relative flex h-36 w-full select-none items-center justify-center rounded-lg bg-slate-100 shadow-md">
										<div className="h-fit w-full">
											<ImageViewer
												src={
													data.detailInformation?.thumbnailUrl ??
													defaultBackground
												}
											>
												<Image
													src={
														data.detailInformation?.thumbnailUrl ??
														defaultBackground
													}
													alt="Thumbnail"
													className="aspect-[9/4] w-full rounded-lg border-2 border-solid border-slate-100 shadow-md"
													width={240}
													height={60}
													priority
												/>
											</ImageViewer>
										</div>
										<div className="absolute left-0 top-32 flex flex-row items-center justify-center gap-2 py-4">
											<div className="relative flex items-center justify-center">
												<ImageViewer
													src={
														data.detailInformation?.avatarUrl ?? avatarDefault
													}
												>
													<Image
														src={
															data.detailInformation?.avatarUrl ??
															avatarDefault
														}
														alt="Avatar"
														className="max-h-20 min-h-20 min-w-20 max-w-20 cursor-pointer rounded-full border-4 border-solid border-blue-600 object-cover shadow-md"
														width={60}
														height={60}
													/>
												</ImageViewer>
											</div>
											<p className="select-text text-xl font-bold">
												{data.detailInformation?.fullName ?? "-"}
											</p>
										</div>
									</div>

									<div className="mt-24 flex flex-col gap-4 rounded-lg bg-slate-100 p-4 shadow-md">
										<p className="text-lg font-bold">Thông tin cá nhân</p>
										<div className="flex flex-col gap-2">
											<div className="flex flex-row items-center gap-4">
												<p className="min-w-20 text-sm font-semibold text-text-seen">
													Họ và tên
												</p>
												<p className="text-base font-medium text-text">
													{data.detailInformation?.fullName ?? "-"}
												</p>
											</div>
											<div className="flex flex-row items-center gap-4">
												<p className="min-w-20 text-sm font-semibold text-text-seen">
													Ngày sinh
												</p>
												<p className="text-base font-medium text-text">
													{changeDateToString(
														data.detailInformation?.dateOfBirth ?? null,
													)}
												</p>
											</div>
											<div className="flex flex-row items-center gap-4">
												<p className="min-w-20 text-sm font-semibold text-text-seen">
													Giới tính
												</p>
												<p className="text-base font-medium text-text">
													{data.detailInformation?.gender ? "Nam" : "Nữ"}
												</p>
											</div>
										</div>
									</div>

									{!checkSendedFriend() && myAccountID !== data.id && (
										<div className="flex flex-col gap-4 rounded-lg bg-slate-100 p-4 shadow-md">
											<Textarea
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												placeholder="Gửi giới thiệu về bạn"
												className="w-full rounded-lg border-2"
											/>
											<Button
												color="primary"
												onPress={handleSubmit}
												spinnerPlacement="end"
												isLoading={isSubmitting}
												isDisabled={isSubmitting}
												className="w-full text-lg font-bold"
											>
												Kết bạn
											</Button>
										</div>
									)}
								</div>
							</ModalBody>
						)}
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
