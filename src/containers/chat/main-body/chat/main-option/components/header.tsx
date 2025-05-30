import { ArrowBack } from "@/assets/svgs";
import { Button } from "@heroui/button";

interface Props {
	showMember?: boolean;
	showMemberJoin?: boolean;
	handleOptions?: () => void;
}

export const HeaderOption = ({showMember, showMemberJoin, handleOptions}: Props) => {
	return (
		<div
			className={`flex h-16 max-h-16 min-h-16 flex-row items-center ${showMember || showMemberJoin ? "justify-between" : "justify-center"} border-b-1 bg-body px-2`}
		>
			<button
				onClick={handleOptions}
				className={`${showMember || showMemberJoin ? "block" : "hidden"}`}
			>
				<ArrowBack className="size-7" />
			</button>
			<div className="flex flex-row">
				<p className="text-xl font-bold">{showMember ? "Thành viên nhóm" : "Thông tin nhóm"}</p>
			</div>
			<div></div>
		</div>
	);
};
