"use client";

import { findAccount } from "@/api";
import { ChatRoom } from "@/containers/chat/second-bar/room";
import { useSidebar } from "@/hooks/sidebar";
import { ErrorResponse } from "@/lib/axios";
import { RootState, store } from "@/redux/store";
import { SideBarSelected } from "@/redux/store/ui";
import { ISearchAccount } from "@/types/implement/response";
import { Skeleton } from "@heroui/skeleton";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactBar from "./contact/contact-bar";
import AccountDetail from "./search/components/account-detail";
import { SearchComponent } from "./search/search";
import { socketService } from "@/lib/socket/socket";
import { SocketOn } from "@/constants/socket";
import { IRoom } from "@/types/implement/room.interface";
import { normalizeRoom } from "@/utils";
import { setRoom, updateRoom } from "@/redux/store/models";
import { MyListRoomSocket } from "@/lib/socket/implement/my-list-room.socket";

export const SecondBar = () => {
	const divRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();

	const { selected, setSelect } = useSidebar();
	const { room, status } = useSelector((state: RootState) => state.listRoom);

	const [search, setSearch] = useState<string>("");
	const [searchResult, setSearchResult] = useState<ISearchAccount[]>([]);

	// Search for account
	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await findAccount(search);
				if (response.statusCode === 200) {
					setSearchResult(response.data);
				}
			} catch (error) {
				const e = error as ErrorResponse;
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

	const renderContent = () => {
		if (searchResult.length > 0) {
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
							{status ? (
								room?.map((item, index) => (
									<ChatRoom
										key={index}
										room={item}
									/>
								))
							) : (
								<div className="w- flex flex-row items-center gap-3 px-3 py-3 transition-all">
									<div>
										<Skeleton className="flex h-12 w-12 rounded-full" />{" "}
									</div>
									<div className="flex w-full flex-col gap-2">
										<Skeleton className="h-3 w-3/5 rounded-lg" />{" "}
										<Skeleton className="h-3 w-3/5 rounded-lg" />
									</div>
								</div>
							)}
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
			className="flex h-lvh min-w-80 max-w-80 flex-col border-r-1 border-border bg-white"
		>
			<SearchComponent
				search={search}
				setSearchAction={setSearch}
			/>
			<div className="flex h-full w-full flex-col overflow-x-hidden overflow-y-visible">{renderContent()}</div>
		</div>
	);
};
