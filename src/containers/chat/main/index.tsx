"use client";

import { BodyChat, FooterChat, HeaderChat } from "@/containers/chat/main/components";
import { useState } from "react";

export const BodyView = () => {
	const [columnRight, setColumnRight] = useState<boolean>(false);

	return (
		<div className="flex h-lvh w-full flex-col">
			<HeaderChat
				colunmRight={columnRight}
				onClickColumnRight={() => setColumnRight(!columnRight)}
				imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
			/>
			<BodyChat />
			<FooterChat />
		</div>
	);
};
