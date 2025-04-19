import { unFriend } from "@/api";
import { avatarDefault } from "@/assets/images";
import { ErrorResponse } from "@/lib/axios";
import { IFriend } from "@/types/implement";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import Image from "next/image";

interface Props {
	data: IFriend;
}

const Friend = ({ data }: Props) => {
	const handleUnFriend = async () => {
		try {
			const response = await unFriend(data.friendId ?? "");
			if (response?.statusCode === 200) {
				addToast({
					title: "Thành công",
					description: "Hủy kết bạn thành công",
					color: "success",
				});
			}
		} catch (error) {
			const e = error as ErrorResponse;

			addToast({
				title: "Thất bại",
				description: e.message,
				color: "danger",
			});
		}
	};

	return (
		<div className="flex w-full flex-col gap-5 border-b-1 border-gray-300 p-4 transition duration-75 ease-in-out hover:bg-primary-100">
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
					<div className="text-center text-lg font-semibold">{data?.detail?.fullName ?? "-"}</div>
				</div>
			</div>
			<div>
				<Button onPress={handleUnFriend}>Delete</Button>
			</div>
		</div>
	);
};

export default Friend;
