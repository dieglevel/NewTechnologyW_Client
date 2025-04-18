"use client";

import { ChatRoom } from "@/containers/chat/second-bar/room";
import { useSidebar } from "@/hooks/sidebar";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { findAccount } from "@/api";
import { ErrorResponse } from "@/lib/axios";
import { SideBarSelected } from "@/redux/store/ui";
import ContactBar from "./contact/contact-bar";
import { ISearchAccount } from "@/types/implement/response";
import { SearchComponent } from "./search/search";
import AccountDetail from "./search/components/account-detail";

export const SecondBar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const divRef = useRef<HTMLDivElement>(null);

	const { selected, setSelect } = useSidebar();
	const { room } = useSelector((state: RootState) => state.listRoom);

	const [search, setSearch] = useState<string>("");
	const [searchResult, setSearchResult] = useState<ISearchAccount[]>([]);

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await findAccount(search);
				if (response.statusCode === 200) {
					console.log("response: ", response.data);
					setSearchResult(response.data);
				}
			} catch (error) {
				const e = error as ErrorResponse;
				console.log("error: ", e.message);
			}
		};

		const timeoutId = setTimeout(() => {
			if (search) {
				fetch();
			} else {
				setSearchResult([]);
			}
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [search]);

	useEffect(() => {
		console.log(room);
	}, [room]);

	// hide chat when window has been resized


	const renderContent = () => {
		if (searchResult.length > 0) {
			console.log("searchResult: ", searchResult);
			return (
				<div className="flex w-full flex-col bg-body">
					{searchResult.map((item, index) => (
						<AccountDetail
							key={index}
							data={item}
						/>
					))}
				</div>
			);
		} else {
			switch (selected) {
				case SideBarSelected.Chat:
					return (
						<div className="flex flex-col gap-1">
							{
								/* { for 5 } */
								[...Array(5)].map((_, index) => (
									<ChatRoom
										key={index}
										userName="Nguyễn Văn A"
										imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
										message={{
											isReceived: true,
											text: ` ⚠ The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.`,
										}}
										timeSent={new Date()}
										type="user"
									/>
								))
							}
						</div>
					);
				case SideBarSelected.Contact:
					return <ContactBar />;
				default:
					null;
			}
		}
	};

	return (
		<div
			ref={divRef}
			className="flex h-lvh min-w-80 max-w-80 flex-col flex-wrap border-r-1 border-border bg-white"
		>
			<SearchComponent
				search={search}
				setSearchAction={setSearch}
			/>
			{renderContent()}
		</div>
	);
};
