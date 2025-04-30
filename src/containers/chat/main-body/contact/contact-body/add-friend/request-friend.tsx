import { acceptRequestFriend, rejectRequestFriend } from "@/api";
import { avatarDefault } from "@/assets/images";
import { ErrorResponse } from "@/lib/axios";
import { IRequestFriend } from "@/types/implement/response/request-friend";
import { changeDateToString } from "@/utils";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import { useState } from "react";

interface Props {
	data: IRequestFriend;
}

const RequestFriend = ({ data }: Props) => {
	const [isSubmittingAccept, setIsSubmittingAccept] = useState<boolean>(false);
	const [isSubmittingReject, setIsSumbmittingReject ] = useState<boolean>(false)

	const handleAcceptFriend = async () => {
		setIsSubmittingAccept(true);
		try {
			const response = await acceptRequestFriend(data.requestId ?? "");
			if (response.statusCode === 200) {
				addToast({
					color: "success",
					title: "Chấp nhận lời mời kết bạn thành công",
				});
			}
		} catch (error) {
			const err = error as ErrorResponse;
			addToast({
				color: "danger",
				title: "Có lỗi xảy ra khi chấp nhận lời mời kết bạn",
			});
		} finally {
			setIsSubmittingAccept(false);
		}
	};

	const handleRejectFriend = async () => {
		setIsSumbmittingReject(true);
		try {
			const response = await rejectRequestFriend(data.requestId ?? "");
			if (response.statusCode === 200) {
				addToast({
					color: "success",
					title: "Từ chối lời mời kết bạn thành công",
				});
			}
		} catch (error) {
			const err = error as ErrorResponse;
			addToast({
				color: "danger",
				title: "Có lỗi xảy ra khi từ chối lời mời kết bạn",
			});
		} finally {
			setIsSumbmittingReject(false);
		}
	};

	return (
		<div className="w-full max-w-md rounded-lg bg-slate-50 p-3 shadow-sm transition-all sm:p-4 md:p-5 lg:p-6">
			<div className="flex flex-row items-center justify-start gap-3 sm:gap-4">
				<div className="flex items-center justify-center rounded-full border-2 border-primary-400 sm:border-4">
					<Image
						src={data?.detail?.avatarUrl ?? avatarDefault}
						alt="Friend Image"
						width={300}
						height={300}
						className="size-10 rounded-full object-cover sm:size-12"
					/>
				</div>
				<div className="flex flex-col items-start justify-center">
					<div className="line-clamp-1 text-base font-semibold sm:text-lg">
						{data?.detail?.fullName || "Người dùng"}
					</div>
					<div className="text-xs text-gray-600 sm:text-sm">
						{changeDateToString(data?.detail?.dateOfBirth ?? null)}
					</div>
				</div>
			</div>

			<div className="mt-3 flex min-h-[60px] justify-start rounded-lg border border-gray-300 bg-slate-200 p-2 sm:mt-4 sm:min-h-[76px] md:mt-5">
				<div className="break-all text-xs text-gray-600 sm:text-sm">
					{data?.message || "Không có giới thiệu"}
				</div>
			</div>

			<div className="flex-row mt-3 flex items-center justify-center gap-2 sm:mt-4 sm:gap-4">
				<Button
					disabled={isSubmittingAccept || isSubmittingReject}
					className="w-full rounded-lg bg-slate-200 py-1.5 text-sm font-bold text-black transition-all duration-200 hover:bg-slate-300 sm:py-2 sm:text-base"
					onClick={handleRejectFriend}
				>
					{isSubmittingReject ? (
						<span className="flex items-center justify-center">
							<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></span>
							Đang xử lý
						</span>
					) : (
						"Từ chối"
					)}
				</Button>
				<Button
					disabled={isSubmittingAccept || isSubmittingReject}
					className="w-full rounded-lg bg-primary-400 py-1.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary-500 sm:py-2 sm:text-base"
					onClick={handleAcceptFriend}
				>
					{isSubmittingAccept ? (
						<span className="flex items-center justify-center">
							<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
							Đang xử lý
						</span>
					) : (
						"Đồng ý"
					)}
				</Button>
			</div>
		</div>
	);
};

export default RequestFriend;
