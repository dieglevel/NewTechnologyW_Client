"use client";

import { ChatRoom, SearchComponent } from "@/containers/chat/chat/chat-list/components";
import { useSidebar } from "@/hooks/sidebar";
import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { socketService } from "@/lib/socket/socket";
import { Skeleton } from "@heroui/skeleton";

export const ChatList = () => {
	const divRef = useRef<HTMLDivElement>(null);

	const { selected, setSelect } = useSidebar();
	const { room, status } = useSelector((state: RootState) => state.listRoom);

	// hide chat when window has been resized
	useEffect(() => {

		const handleResize = () => {
			if (window.innerWidth > 1024) {
				divRef.current?.classList.remove("hidden");
			} else {
				divRef.current?.classList.add("hidden");
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div
			ref={divRef}
			className="flex h-lvh max-w-80 flex-col flex-wrap gap-2 border-r-1 border-border bg-white"
		>
			<SearchComponent />
			<div className="flex flex-col gap-1">
				{status === 'succeeded' && room !== null ? (
					room.map((roomItem, index) => (
						<ChatRoom
							key={roomItem.room_id}
							room={roomItem}
						/>
					))
				) : (
					<div className="w- flex flex-row items-center gap-3 px-3 py-3 transition-all">
						<div>
							<Skeleton className="flex h-12 w-12 rounded-full" />
						</div>
						<div className="flex w-full flex-col gap-2">
							<Skeleton className="h-3 w-3/5 rounded-lg" />
							<Skeleton className="h-3 w-4/5 rounded-lg" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
