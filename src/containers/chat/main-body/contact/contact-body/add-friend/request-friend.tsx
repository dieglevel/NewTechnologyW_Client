import { avatarDefault } from "@/assets/images";
import { IRequestFriend } from "@/types/implement";
import { changeDateToString } from "@/utils";
import { Button } from "@heroui/button";
import Image from "next/image";

interface Props {
	data: IRequestFriend;
}

const RequestFriend = ({ data }: Props) => {
	const handleAcceptFriend = () => {};

	const handleRejectFriend = () => {};

	return (
		<div className="flex h-fit w-[40%] flex-col gap-5 rounded-lg bg-slate-50 p-3">
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
					<div className="text-center text-lg font-semibold">{data?.detail?.fullName}</div>
					<div className="text-center text-sm">
						{changeDateToString(data?.detail?.dateOfBirth ?? null)}
					</div>
				</div>
			</div>

			<div className="flex items-center justify-start rounded-lg border-1 border-gray-300 bg-slate-200 p-2">
				<div className="text-sm text-gray-600">{data?.message ?? "Không có giới thiệu"}</div>
			</div>

			<div className="flex flex-row items-center justify-center gap-4">
				<Button className="w-full rounded-lg bg-slate-200 font-bold text-black hover:bg-slate-500">
					Từ chối
				</Button>
				<Button className="w-full rounded-lg bg-primary-400 font-bold text-white hover:bg-primary-500">
					Đồng ý
				</Button>
			</div>
		</div>
	);
};

export default RequestFriend;
