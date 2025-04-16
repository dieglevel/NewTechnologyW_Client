import { Button } from "@heroui/button";
import Image from "next/image";
const RequestFriend = () => {
	return (
		<div className="flex flex-col gap-5 rounded-lg bg-slate-50 p-3 w-[40%]">
			<div className="flex flex-row items-center justify-start gap-4">
				<div className="flex items-center justify-center rounded-full border-4 border-primary-400">
					<Image
						src={"https://i.pinimg.com/736x/e1/08/08/e10808551f8751d18fe892d88efd80d3.jpg"}
						alt="Friend Image"
						width={300}
						height={200}
						className="size-12 rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col items-start justify-center">
					<div className="text-center text-lg font-semibold">Friend Name</div>
					<div className="text-center text-sm">22/12/2003</div>
				</div>
			</div>

			<div className="flex items-center justify-start rounded-lg border-1 border-gray-300 bg-slate-200 p-2">
				<div className="text-sm text-gray-600">
					m test thử cái gửi lời mời với add friend của khứa Tú làm xem được k
				</div>
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