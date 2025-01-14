import { SearchComponent } from "./search";

export const ChatView = () => {
	return (
		<div className="width-full flex h-full flex-row flex-wrap gap-2 bg-white">
			<SearchComponent />
		</div>
	);
};
