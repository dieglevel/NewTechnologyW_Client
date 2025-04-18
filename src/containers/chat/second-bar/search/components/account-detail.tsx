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

interface Props {
	data: ISearchAccount;
}

const AccountDetail = ({ data }: Props) => {
	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
	const myAccountID = localStorage.getItem(LocalStorage.userId) ?? "";

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const {sendedFriends} = useSelector((state: RootState) => state.sendedFriend);

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
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
		if (sendedFriends) {
			const sendedFriend = sendedFriends.find((friend) => friend.receiver_id === data.id);
			if (sendedFriend) {
				console.log("Sended friend: ", sendedFriend, "ID: ", data.id);
				return true;
			}
		}
		return false;
	};
		


	return (
		<>
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
								<>
									<ModalBody>
										<div className="relative my-4 flex flex-col gap-4">
											<div className="relative flex h-36 w-full select-none items-center justify-center rounded-lg bg-slate-100 shadow-md">
												<div className="w-full">
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
															className="h-full w-full rounded-lg border-2 border-solid border-slate-100 object-fill shadow-md"
															width={240}
															height={60}
															priority
														/>
													</ImageViewer>
												</div>
												<div className="absolute left-0 top-36 flex flex-row items-center justify-center gap-2 py-4">
													<div className="relative flex items-center justify-center">
														<ImageViewer
															src={
																data.detailInformation?.avatarUrl ??
																avatarDefault
															}
														>
															<Image
																src={
																	data.detailInformation
																		?.avatarUrl ?? avatarDefault
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
																data.detailInformation?.dateOfBirth ??
																	null,
															)}
														</p>
													</div>
													<div className="flex flex-row items-center gap-4">
														<p className="min-w-20 text-sm font-semibold text-text-seen">
															Giới tính
														</p>
														<p className="text-base font-medium text-text">
															{data.detailInformation?.gender
																? "Nam"
																: "Nữ"}
														</p>
													</div>
												</div>
											</div>
											{!checkSendedFriend() && (myAccountID !== data.id) && (
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
														isLoading={isSubmitting}
														isDisabled={isSubmitting }
														className="w-full text-lg font-bold"
													>
														Kết bạn
													</Button>
												</div>
											)}
										</div>
									</ModalBody>
								</>
							)}
						</>
					)}
				</ModalContent>
			</Modal>

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
