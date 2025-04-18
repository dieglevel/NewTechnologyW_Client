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
import { setSelectedRoom } from "@/redux/store/models/selected-room-slice";
import { socketService } from "@/lib/socket/socket";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { setMessage } from "@/redux/store/models/message-slice";

export const SecondBar = () => {
	const divRef = useRef<HTMLDivElement>(null);

	const { selected, setSelect } = useSidebar();
	const { room } = useSelector((state: RootState) => state.listRoom);

	const dispatch = useDispatch<AppDispatch>();
	const { selectedRoomId } = useSelector((state: RootState) => state.selectedRoom);

	const [search, setSearch] = useState<string>("");
	const [searchResult, setSearchResult] = useState<ISearchAccount[]>([]);

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await findAccount(search);
				if (response.statusCode === 200) {
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
							{
								room?.map((item, index) => (
									<ChatRoom
										key={index}
										room={item}
										onClick={() => {
											// setSelect(SideBarSelected.Chat);
											dispatch(setSelectedRoom(item.room_id));

											socketService.emit(SocketEmit.joinRoom, {
												roomId: item.room_id,
											});

											// socketService.on(SocketOn.joinRoom, (data) => {

											// });

											socketService.emit(SocketEmit.getMessageByChatRoom, {
												roomId: item.room_id,
											});

											socketService.on(SocketOn.getMessageByChatRoom, (data) => {
												dispatch(setMessage(data));
												// console.log(data)
											});
										}}
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
