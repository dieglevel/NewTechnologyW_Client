"use client";

import { BodyOption, HeaderOption } from "@/containers/chat/main-body/chat/main-option/components";
import { useState } from "react";
import { MembersOption } from "./components/members";
import { Separator } from "@radix-ui/react-separator";

export const OptionView = () => {
	const [showMember, setShowMember] = useState(false);

	return (
		<div className="relative flex h-lvh w-4/12 flex-col overflow-hidden border-l-1">
			<HeaderOption />
			<BodyOption onClick={() => setShowMember(!showMember)} />

			<div
				className={`absolute inset-0 top-auto transition-transform duration-300 ease-in-out ${
					showMember ? "translate-x-0" : "translate-x-full"
				}`}
				style={{ height: "calc(100% - 70px)" }}
			>
				<MembersOption />
			</div>
		</div>
	);
};
