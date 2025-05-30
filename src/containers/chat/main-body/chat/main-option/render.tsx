"use client";

import { BodyOption, HeaderOption } from "@/containers/chat/main-body/chat/main-option/components";
import { useState } from "react";
import { MembersOption } from "./components/members";
import { JoinRequests } from "./components/join-requests";

export const OptionView = () => {
	const [showMember, setShowMember] = useState(false);
	const [showMemberJoin, setShowMemberJoin] = useState(false);

	return (
		<div className="relative flex h-lvh w-4/12 flex-col overflow-hidden border-l-1">
			<HeaderOption
				showMember={showMember}
				showMemberJoin={showMemberJoin}
				handleOptions={() => (showMember ? setShowMember(false) : setShowMemberJoin(false))}
			/>
			<BodyOption
				onClick={() => setShowMember(!showMember)}
				onClickJoin={() => setShowMemberJoin(!showMemberJoin)}
			/>

			<div
				className={`absolute inset-0 top-auto transition-transform duration-300 ease-in-out ${
					showMember ? "translate-x-0" : "translate-x-full"
				}`}
				style={{ height: "calc(100% - 70px)" }}
			>
				<MembersOption />
			</div>

			<div
				className={`absolute inset-0 top-auto transition-transform duration-300 ease-in-out ${
					showMemberJoin ? "translate-x-0" : "translate-x-full"
				}`}
				style={{ height: "calc(100% - 70px)" }}
			>
				<JoinRequests />
			</div>
		</div>
	);
};
