import { ColumnIcon, SearchIcon, UserIcon } from "@/assets/svgs";
import Image from "next/image";

interface Props {
	colunmRight: boolean;
	onClickColumnRight: () => void;

	imageUrl: string;
}

export const HeaderChat = ({ colunmRight, onClickColumnRight, imageUrl }: Props) => {
	return (
		<div className="flex h-16 max-h-16 min-h-16 flex-row items-center justify-between border-b-1 bg-body px-2">
			<div className="flex flex-row items-center gap-3">
				<Image
					src={imageUrl}
					width={50}
					height={50}
					alt="avatar"
					className="size-[50px] max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px] rounded-full object-cover"
				/>
				<div>
					<p className="text-xl font-semibold">Group name</p>
					<div className="flex flex-row items-center gap-1">
						<UserIcon className="size-4 font-bold" />
						<p className="text-sm font-light text-gray-500">5 thành viên</p>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-2">
				<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-[#ccc]">
					<SearchIcon className="size-5 stroke-1" />
				</div>
				<div
					className={
						(colunmRight ? "bg-icon-inactive hover:bg-icon-active" : "bg-body hover:bg-[#ccc]") +
						` flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm`
					}
					onClick={onClickColumnRight}
				>
					<ColumnIcon className={colunmRight ? "stroke-icon-active" : " " + ` size-5 stroke-1`} />
				</div>
			</div>
		</div>
	);
};
