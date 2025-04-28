import { AddGroupIcon, More } from "@/assets/svgs";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AddMemberModal } from "../../components/header/components/modal-add";
import { ModalConfirm } from "./modal-confirm";
import { deleteMember } from "@/api";
import { addToast } from "@heroui/toast";
import { ModalAddMember } from "./modal-add";

export const MembersOption = () => {
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const account_id = localStorage.getItem(LocalStorage.userId);

	const [isShowAdd, setShowAdd] = useState<boolean>(false);
	const [openMenuId, setOpenMenuId] = useState<string | null>(null);
	const [openModal, setOpenModal] = useState(false);
	const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

	const members = selectedRoom?.detailRoom || [];

	const handleModalAdd = () => {
		setShowAdd(!isShowAdd);
	};

	const handleDeleteClick = (memberId: string) => {
		setSelectedMemberId(memberId);
		setOpenModal(true);
	};

	const handleConfirmDelete = async () => {
		const roomId = selectedRoom?.id || "";
		if (roomId && selectedMemberId) {
			const data = await deleteMember({ roomId, removeUserID: selectedMemberId });
			if (data.statusCode === 200) {
				addToast({
					classNames: { title: "font-bold", description: "text-sm" },
					variant: "solid",
					title: "Thành viên đã bị xóa khỏi nhóm",
					color: "success",
				});
				setSelectedMemberId(null);
				setOpenModal(false);
			} else {
				// Handle error if needed
				console.error("Error deleting member:", data.message);
			}
		}
	};

	return (
		<div className="flex h-full flex-col gap-3 bg-body p-3">
			{/* Button thêm thành viên */}
			<button
				className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 py-2 text-sm font-semibold hover:bg-gray-200"
				onClick={handleModalAdd}
			>
				<AddGroupIcon className="size-5" />
				Thêm thành viên
			</button>

			{/* Tiêu đề danh sách */}
			<div className="flex items-center justify-between px-1">
				<p className="text-sm font-semibold text-gray-700">Danh sách thành viên ({members.length})</p>
				<button className="text-gray-500 hover:text-gray-700">•••</button>
			</div>

			{/* Danh sách thành viên */}
			<div className="flex flex-1 flex-col gap-3 overflow-y-auto">
				{members.map((member) => (
					<div
						key={member.id}
						className="group relative flex items-center justify-between rounded-md px-1 py-2 hover:bg-gray-100"
					>
						{/* Thông tin member */}
						<div className="flex items-center gap-2">
							<img
								src={member.avatar}
								alt={member.fullName}
								className="h-9 w-9 rounded-full object-cover"
							/>
							<div className="flex flex-col">
								<span className="text-sm font-medium text-gray-800">{member.fullName}</span>
								{member.id === account_id && <span className="text-xs text-gray-500">Bạn</span>}
							</div>
						</div>

						<button
							onClick={() => setOpenMenuId(openMenuId === member.id ? null : (member.id ?? null))}
							className="hidden text-gray-600 hover:text-gray-800 group-hover:block"
						>
							<More />
						</button>

						{openMenuId === member.id && (
							<div className="absolute right-8 top-1/2 z-10 w-32 -translate-y-1/2 rounded-md border bg-white shadow-lg">
								{selectedRoom?.leader_account_id !== member.id &&
									selectedRoom?.leader_account_id === account_id && (
										<>
											<button
												onClick={() => {
													// Xử lý cấp quyền
													setOpenMenuId(null);
												}}
												className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100`}
											>
												Thêm phó nhóm
											</button>
											<button
												onClick={() => handleDeleteClick(member.id || "")}
												className={`} w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-gray-100`}
											>
												Xóa khỏi nhóm
											</button>
										</>
									)}

								{member.id === account_id && (
									<button
										onClick={() => handleDeleteClick(member.id || "")}
										className={`w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-gray-100`}
									>
										Rời nhóm
									</button>
								)}
							</div>
						)}
					</div>
				))}
			</div>
			{selectedRoom && (
				<ModalAddMember
					open={isShowAdd}
					onOpenChange={setShowAdd}
					selectedRoom={selectedRoom}
				/>
			)}
			{account_id === selectedMemberId ? (
				<ModalConfirm
					isOpen={openModal}
					header="Bạn có chắc chắn muốn xóa thành viên này không?"
					onOpenChange={() => setOpenModal(false)}
					onConfirm={handleConfirmDelete}
				/>
			) : (
				<ModalConfirm
					isOpen={openModal}
					header="Bạn có chắc chắn muốn rời nhóm không?"
					onOpenChange={() => setOpenModal(false)}
					onConfirm={handleConfirmDelete}
				/>
			)}
		</div>
	);
};
