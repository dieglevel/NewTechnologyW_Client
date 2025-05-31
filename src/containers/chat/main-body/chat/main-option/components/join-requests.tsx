import { More } from "@/assets/svgs";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { addToast } from "@heroui/toast";
import { IDetailInformation, IJoinRequest } from "@/types/implement";
import { getProfileFromAnotherUser, handleJoinRequest } from "@/api";

export const JoinRequests = () => {
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const account_id = localStorage.getItem(LocalStorage.userId);
	const [members, setMembers] = useState<IDetailInformation[]>([]);

	useEffect(() => {
		const fetchDetail = async (accountId: IJoinRequest) => {
			// Simulate fetching user details
			// console.log("Fetching details for account ID:", accountId);
			const response = await getProfileFromAnotherUser(accountId.requestByAccount || "");
			if (response.statusCode === 200) {
				return response.data;
			} else {
				throw new Error("Failed to fetch user details");
			}
		};
		const fetchAllDetails = async () => {
			if (selectedRoom?.joinRequests) {
				const pendingMembers = selectedRoom.joinRequests.filter((member) => member.status === "PENDING");

				const details = await Promise.all(pendingMembers.map((member) => fetchDetail(member)));

				setMembers(details);
			}
		};

		fetchAllDetails().catch((error) => {
			addToast({ title: "Lỗi khi tải danh sách thành viên", color: "danger" });
			console.error("Error fetching join requests:", error);
		});
	}, [selectedRoom?.joinRequests]);

	const handleApprove = async (accountId: string) => {
		try {
			const result = await handleJoinRequest({
				chatRoomID: selectedRoom?.id || "",
				userApprovedID: accountId,
				status: "APPROVED",
			});
			addToast({ title: "Phê duyệt thành công", color: "success" });
		} catch (err) {
			addToast({ title: "Phê duyệt thất bại", color: "danger" });
		}
	};

	const handleReject = async (accountId: string) => {
		try {
			const result = await handleJoinRequest({
				chatRoomID: selectedRoom?.id || "",
				userApprovedID: accountId,
				status: "REJECTED",
			});
			addToast({ title: "Từ chối thành công", color: "warning" });
		} catch (err) {
			addToast({ title: "Từ chối thất bại", color: "danger" });
		}
	};

	return (
		<div className="flex h-full flex-col gap-3 bg-body p-3">
			{/* Tiêu đề danh sách */}
			<div className="flex items-center justify-between px-1">
				<p className="text-sm font-semibold text-gray-700">Danh sách chờ phê duyệt ({members.length})</p>
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
							<div className="relative h-12 w-12">
								<div className={`$"border-gray-300 } rounded-full border-2`}>
									<img
										src={member.avatarUrl}
										alt={member.fullName}
										className="h-11 w-11 rounded-full object-cover"
									/>
								</div>
							</div>

							<div className="flex flex-col">
								<span className="text-sm font-medium text-gray-800">{member.fullName}</span>
								{member.id === account_id && <span className="text-xs text-gray-500">Bạn</span>}
							</div>
						</div>

						{/* Nút xử lý */}
						<div className="flex gap-2">
							<button
								onClick={() => handleApprove(member.id || "")}
								className="rounded bg-green-500 px-3 py-1 text-xs text-white hover:bg-green-600"
							>
								Phê duyệt
							</button>
							<button
								onClick={() => handleReject(member.id || "")}
								className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
							>
								Từ chối
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
