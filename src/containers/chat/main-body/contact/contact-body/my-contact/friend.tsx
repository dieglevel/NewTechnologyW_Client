import { avatarDefault } from "@/assets/images";
import { IFriend } from "@/types/implement";
import Image from "next/image";

interface Props {
	data: IFriend;
}

const Friend = ({ data }: Props) => {
	return (
		<div className="flex w-full flex-col gap-5 border-b-1 border-gray-300 p-4 transition duration-75 ease-in-out hover:bg-primary-100">
			<div className="flex flex-row items-center justify-start gap-4">
				<div className="flex items-center justify-center rounded-full border-4 border-primary-400">
					<Image
						src={data?.avatarUrl ?? avatarDefault}
						alt="Friend Image"
						width={300}
						height={200}
						className="size-12 rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col items-start justify-center">
					<div className="text-center text-lg font-semibold">{data?.fullName ?? "-"}</div>
				</div>
			</div>
		</div>
	);
};

export default Friend;
