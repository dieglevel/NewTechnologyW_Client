import { ColumnIcon, SearchIcon, UserIcon } from "@/assets/svgs";
import ImageViewer from "@/components/image-preview";
import { useOptionView } from "@/hooks/option-view";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

interface Props {
	imageUrl: string;
}

export const HeaderChat = ({ imageUrl }: Props) => {
	const { isOpen, setSelect } = useOptionView();

	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);

	const handleToggle = () => {
		setSelect(!isOpen);
	};

	return (
		<div className="flex h-16 max-h-16 min-h-16 flex-row items-center justify-between border-b-1 bg-body px-2">
			<div className="flex flex-row items-center gap-3">
				<ImageViewer src={imageUrl}>
					<Image
						priority
						src={imageUrl}
						width={50}
						height={50}
						alt="avatar"
						className="size-[50px] rounded-full object-cover"
					/>
				</ImageViewer>
				<div>
					<p className="text-xl font-semibold">{selectedRoom?.name}</p>
					<div className="flex flex-row items-center gap-1">
						<UserIcon className="size-4 font-bold" />
						<p className="text-sm font-light text-gray-500"></p>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-2">
				<div className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-[#ccc]">
					<SearchIcon className="size-5 stroke-icon-second stroke-1" />
				</div>
				<div
					className={
						(isOpen ? "bg-icon-inactive hover:bg-icon-active" : "bg-body hover:bg-[#ccc]") +
						` flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm`
					}
					onClick={handleToggle}
				>
					<ColumnIcon
						className={isOpen ? "stroke-icon-active" : "stroke-icon-second " + ` size-5 stroke-1`}
					/>
				</div>
			</div>
		</div>
	);
};
