"use client";

import { useEffect, useState } from "react";
import { BodyChat, FooterChat, HeaderChat } from "./components";
import { getProfileFromAnotherUser } from "@/api";
import { IDetailInformation } from "@/types/implement";

// interface Props {
// 	account_id: string;
// }

export const BodyView = () => {

	// const [profile, setProfile] = useState<IDetailInformation>({} as IDetailInformation);
	// useEffect(() => {
	// 	const fetchDetailInformation = async () => {
	// 		const 
	// 		const response = await getProfileFromAnotherUser(account_id);
	// 		if (response.data) {
	// 			setProfile(response.data);
	// 		}
	// 	};
	// 	fetchDetailInformation();
	// }, [account_id]);

	return (
		<div className="flex h-lvh w-full flex-col">
			<HeaderChat imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg" />
			<BodyChat />
			<FooterChat />
		</div>
	);
};
