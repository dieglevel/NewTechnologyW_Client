"use client";

import { useState } from "react";
import { BodyChat, FooterChat, HeaderChat } from "./components";

interface Props {
	roomId: string;
}

export const BodyView = () => {
	return (
		<div className="flex h-lvh w-full flex-col">
			<HeaderChat imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg" />
			<BodyChat />
			<FooterChat />
		</div>
	);
};
