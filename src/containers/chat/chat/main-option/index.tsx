import { BodyOption, HeaderOption } from "@/containers/chat/chat/main-option/components";

export const OptionView = () => {
	return (
		<div className="flex h-lvh w-4/12 flex-col border-l-1">
			<HeaderOption />
         <BodyOption />
		</div>
	);
};
