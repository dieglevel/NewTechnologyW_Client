import Loading from "@/app/loading";
import { avatarDefault, defaultBackground } from "@/assets/images";
import { EditIcon } from "@/assets/svgs";
import { RootState } from "@/redux/store";
import { changeDateToString } from "@/utils";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onClose: () => void;
	onOpen: () => void;
}

const InformationModal = ({ isOpen, onOpenChange, onClose, onOpen }: Props) => {
	const router = useRouter();
	const { detailInformation, status } = useSelector((state: RootState) => state.detailInformation);

	return (
		<>
			{status === "loading" ? (
				<Loading></Loading>
			) : (
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					className={isOpen ? "" : "inert"}
					aria-hidden={!isOpen}
				>
					<ModalContent className="divide-y-2">
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1 text-center">
									<p>Thông tin tài khoản</p>
								</ModalHeader>
								<ModalBody>
									<div className="relative my-4 flex flex-col gap-4">
										<div className="relative flex h-36 w-full select-none items-center justify-center rounded-lg bg-slate-100 shadow-md">
											<div className="w-full">
												<Image
													src={
														detailInformation?.thumbnailUrl ??
														defaultBackground
													}
													alt="Thumbnail"
													className="h-52 w-full rounded-lg border-2 border-solid border-slate-100 object-fill shadow-md"
													width={240}
													height={60}
													priority
												/>
											</div>
											<div className="absolute left-0 top-36 flex flex-row items-center justify-center gap-2 py-4">
												<div className="relative flex items-center justify-center">
													<Image
														src={
															detailInformation?.avatarUrl ?? avatarDefault
														}
														alt="Avatar"
														className="max-h-20 min-h-20 min-w-20 max-w-20 cursor-pointer rounded-full border-4 border-solid border-blue-600 object-cover shadow-md"
														width={60}
														height={60}
													/>
												</div>
												<p className="select-text text-xl font-bold">
													{detailInformation?.fullName ?? "-"}
												</p>
											</div>
										</div>

										<div className="mt-24 flex flex-col gap-4 rounded-lg bg-slate-100 p-4 shadow-md ">
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
														{changeDateToString(
															detailInformation?.dateOfBirth ?? null,
														)}
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
										onPress={() => {
											router.push("/update-profile");
										}}
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
