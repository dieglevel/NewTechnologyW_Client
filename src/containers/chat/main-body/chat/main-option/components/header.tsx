import { ArrowBack } from "@/assets/svgs";
import { Button } from "@heroui/button";

interface Props {
	showMember?: boolean;
	handleOptions?: () => void;
}

export const HeaderOption = ({showMember, handleOptions}: Props) => {
	return (
		<div className={`flex h-16 max-h-16 min-h-16 flex-row items-center ${showMember ? "justify-between" : "justify-center"} border-b-1 bg-body px-2`}>
			<button onClick={handleOptions} className={`${showMember ? "block" : "hidden"}`}>
				<ArrowBack className="size-7"/>
			</button>
			<div className="flex flex-row">
				<p className="text-xl font-bold">{showMember ? "Thành viên nhóm" : "Thông tin nhóm"}</p>
			</div>
			<div></div>
		</div>
	);
};
