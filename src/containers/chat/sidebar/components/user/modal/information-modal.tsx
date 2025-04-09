import Loading from "@/app/loading";
import { avatarDefault } from "@/assets/images";
import { EditIcon } from "@/assets/svgs";
import { RootState } from "@/redux/store";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import Image from "next/image";
import { useSelector } from "react-redux";

interface Props {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onClose: () => void;
	onOpen: () => void;
}

const InformationModal = ({ isOpen, onOpenChange, onClose, onOpen }: Props) => {
	const { detailInformation, status } = useSelector((state: RootState) => state.detailInformation);

	return (
		<>
			{status === "loading" ? (
				<Loading></Loading>
			) : (
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
				>
					<ModalContent className="divide-y-2">
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1 text-center">
									Thông tin tài khoản
								</ModalHeader>
								<ModalBody>
									<div className="relative my-4 flex flex-col gap-4">
										<div className="relative flex h-36 w-full select-none items-center justify-center rounded-lg bg-slate-100 shadow-md">
											<div className="w-full">
												<Image
													src={detailInformation?.thumbnailUrl ?? avatarDefault}
													alt="Thumbnail"
													className="h-36 w-full rounded-lg border-2 border-solid border-slate-100 object-fill shadow-md"
													width={240}
													height={60}
													priority
												/>
											</div>
											<div className="absolute left-0 top-28 flex flex-row items-center justify-center gap-2 py-4">
												<div className="relative flex items-center justify-center">
													<div className="absolute -right-0 bottom-0 flex size-6 translate-x-0 translate-y-0 items-center justify-center rounded-full bg-body shadow-md transition-all duration-300 ease-in-out hover:bg-slate-200 hover:shadow-lg">
														<EditIcon className="size-4 cursor-pointer" />
													</div>
													<Image
														src={
															detailInformation?.avatarUrl ?? avatarDefault
														}
														alt="Avatar"
														className="max-h-20 min-h-20 min-w-20 max-w-20 cursor-pointer rounded-full border-2 border-solid border-white object-cover shadow-md"
														width={60}
														height={60}
													/>
												</div>
												<p className="select-text text-xl font-bold">
													{detailInformation?.fullName ?? "-"}
												</p>
											</div>
										</div>

										<div className="mt-16 flex flex-col gap-4 rounded-lg bg-slate-100 p-4 shadow-md">
											<p className="text-lg font-bold">Thông tin cá nhân</p>
											<div className="flex flex-col gap-2">
												<div className="flex flex-row items-center gap-4">
													<p className="min-w-20 text-sm font-semibold text-text-seen">
														Họ và tên
													</p>
													<p className="text-base font-medium text-text">
														{detailInformation?.fullName ?? "-"}
													</p>
												</div>
												<div className="flex flex-row items-center gap-4">
													<p className="min-w-20 text-sm font-semibold text-text-seen">
														Ngày sinh
													</p>
													<p className="text-base font-medium text-text">
														{detailInformation?.dateOfBirth?.getDate() ?? "-"}
													</p>
												</div>
												<div className="flex flex-row items-center gap-4">
													<p className="min-w-20 text-sm font-semibold text-text-seen">
														Điện thoại
													</p>
													<p className="text-base font-medium text-text">
														{detailInformation?.fullName ?? "-"}
													</p>
												</div>
												<div className="flex flex-row items-center gap-4">
													<p className="min-w-20 text-sm font-semibold text-text-seen">
														Giới tính
													</p>
													<p className="text-base font-medium text-text">
														{detailInformation?.gender ? "Nam" : "Nữ"}
													</p>
												</div>
											</div>
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									<Button
										color="primary"
										onPress={onClose}
										className="w-full text-lg font-bold"
									>
										Cập nhật
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			)}
		</>
	);
};

export default InformationModal;
