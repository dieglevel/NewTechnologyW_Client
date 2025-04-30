import Loading from "@/app/loading";
import { avatarDefault, defaultBackground } from "@/assets/images";
import { EditIcon } from "@/assets/svgs";
import ImageViewer from "@/components/image-preview";
import { AppDispatch, RootState } from "@/redux/store";
import { closeModal } from "@/redux/store/ui";
import { changeDateToString } from "@/utils";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const InformationModal = ({}: Props) => {
	const router = useRouter();
	const { detailInformation, status } = useSelector((state: RootState) => state.detailInformation);

	const { isOpen: isOpenModal, type } = useSelector((state: RootState) => state.modal);
	const dispatch = useDispatch<AppDispatch>();

	const { onOpenChange, onClose } = useDisclosure();

	const handleCloseModal = () => {
		dispatch(closeModal());
	};

	return (
		<>
			<Modal
				isOpen={isOpenModal && type === "detailInformation"}
				className={isOpenModal ? "" : "inert"}
				aria-hidden={!isOpenModal}
				onClose={handleCloseModal}
			>
				<ModalContent className="divide-y-2">
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-center">
								<p>Thông tin tài khoản</p>
							</ModalHeader>
							{(status === "loading") ? (
								<Spinner className="h-64" />
							) : (
								<>
									<ModalBody className="py-4">
										<div className="relative my-4 flex flex-col gap-4">
											<div className="relative flex h-36 w-full select-none items-center justify-center rounded-lg bg-slate-100 shadow-md">
												<div className="w-full h-fit">
													<ImageViewer src={detailInformation?.thumbnailUrl ?? defaultBackground}>
														<Image
															src={
																detailInformation?.thumbnailUrl ??
																defaultBackground
															}
															alt="Thumbnail"
															className="w-full rounded-lg border-2 border-solid border-slate-100 aspect-[9/4] shadow-md"
															width={240}
															height={60}
															priority
														/>
													</ImageViewer>
												</div>
												<div className="absolute left-0 top-32 flex flex-row items-center justify-center gap-2 py-4">
													<div className="relative flex items-center justify-center">
														<ImageViewer src={detailInformation?.avatarUrl ?? avatarDefault}>
														<Image
															src={
																detailInformation?.avatarUrl ??
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
														{detailInformation?.fullName ?? "-"}
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
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default InformationModal;
