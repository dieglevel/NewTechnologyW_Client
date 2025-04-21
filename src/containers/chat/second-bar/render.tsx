"use client";

import { ChatRoom } from "@/containers/chat/second-bar/room";
import { useSidebar } from "@/hooks/sidebar";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { findAccount, getMessageByRoomId } from "@/api";
import { api, ErrorResponse } from "@/lib/axios";
import { SideBarSelected } from "@/redux/store/ui";
import ContactBar from "./contact/contact-bar";
import { ISearchAccount } from "@/types/implement/response";
import { SearchComponent } from "./search/search";
import AccountDetail from "./search/components/account-detail";
import { setSelectedRoom } from "@/redux/store/models/selected-room-slice";
import { socketService } from "@/lib/socket/socket";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { fetchMessageByRoomId, setMessage } from "@/redux/store/models/message-slice";
import { Skeleton } from "@heroui/skeleton";
import { LocalStorage } from "@/lib/local-storage";
import { IRoom } from "@/types/implement/room.interface";
import { normalizeMessage } from "@/utils";

export const SecondBar = () => {
	const divRef = useRef<HTMLDivElement>(null);

	const { selected, setSelect } = useSidebar();
	const { room, status } = useSelector((state: RootState) => state.listRoom);

	const dispatch = useDispatch<AppDispatch>();
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);

	const [search, setSearch] = useState<string>("");
	const [searchResult, setSearchResult] = useState<ISearchAccount[]>([]);

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await findAccount(search);
				if (response.statusCode === 200) {
					// console.log("response: ", response.data);
					setSearchResult(response.data);
				}
			} catch (error) {
				const e = error as ErrorResponse;
				// console.log("error: ", e.message);
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
		if (!selectedRoom) return;

		const fetchMessages = async () => {
			console.log("selectedRoomId: ", selectedRoom);
			const data = await getMessageByRoomId(selectedRoom.id);
			console.log("data: ", data);
			if (data && data.data) {
				dispatch(setMessage({ messages: data.data, roomId: selectedRoom.id }));
			}

			await dispatch(fetchMessageByRoomId(selectedRoom.id));
		};

		fetchMessages();

		return () => {
			socketService.off(SocketOn.getMessageByChatRoom); // Clean up the socket listener
		};
	}, [selectedRoom, status]);

	// useEffect(() => {
	// 	console.log("Status: ", status);
	// 	if (status === "succeeded") {
	// 		console.log("Room: ", room);
	// 		if (room) {
	// 			setListRoom(room); // Assuming `id` is the string property you want
	// 			console.log(room)
	// 			console.log()
	// 		} else {
	// 			setListRoom([]);
	// 		}
	// 	}
	// }, [ status]);

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
							{room ? (
								room.map((item, index) => (
									<ChatRoom
										key={index}
										room={item}
										onClick={() => {
											// setSelect(SideBarSelected.Chat);
											dispatch(setSelectedRoom(item));
											socketService.emit(SocketEmit.joinRoom, {
												room_id: item.id,
											});
										}}
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
