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
		<div className="flex h-fit sm:w-1/3 w-5/6 flex-col gap-5 rounded-lg bg-slate-50 p-3 ">
			<div className="flex flex-row items-center justify-start gap-4">
				<div className="flex items-center justify-center rounded-full border-4 border-primary-400">
					<Image
						src={data?.detail?.avatarUrl ?? avatarDefault}
						alt="Friend Image"
						width={300}
						height={200}
						className="size-12 rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col items-start justify-center">
					<div className="text-center text-lg font-semibold line-clamp-1">{data?.detail?.fullName}</div>
					<div className="text-center text-sm">
						{changeDateToString(data?.detail?.dateOfBirth ?? null)}
					</div>
				</div>
			</div>

			<div className="flex items-center justify-start rounded-lg border-1 border-gray-300 bg-slate-200 p-2">
				<div className="text-sm text-gray-600">{data?.message ?? "Không có giới thiệu"}</div>
			</div>

			<div className="flex flex-row items-center justify-center gap-4">
				<Button
					disabled={isSubmittingAccept || isSubmittingReject}
					isLoading={isSubmittingReject}
					className="w-full rounded-lg bg-slate-200 font-bold text-black hover:bg-slate-500"
					onPress={handleRejectFriend}
				>
					Từ chối
				</Button>
				<Button
					disabled={isSubmittingAccept || isSubmittingReject}
					isLoading={isSubmittingAccept}
					className="w-full rounded-lg bg-primary-400 font-bold text-white hover:bg-primary-500"
					onPress={handleAcceptFriend}
				>
					Đồng ý
				</Button>
			</div>
		</div>
	);
};

export default RequestFriend;
