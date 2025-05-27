import { useSelector } from "react-redux";
import { Message } from "./components/message";
import { useEffect, useRef, useState } from "react";
import { RootState } from "@/redux/store";
import { useInView } from "react-intersection-observer";
import { IMessage } from "@/types/implement/message.interface";
import { socketService } from "@/lib/socket/socket";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { LocalStorage } from "@/lib/local-storage";
import { Virtuoso, VirtuosoProps } from "react-virtuoso";

export const BodyChat = () => {
	const MESSAGES_PER_PAGE = 10;
	const [pagination, setPagination] = useState<number>(1);
	const { message } = useSelector((state: RootState) => state.message);
	const userId = localStorage.getItem(LocalStorage.userId);
	const divRef = useRef<HTMLDivElement>(null);
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);

	const { ref: topRef, inView } = useInView({
		rootMargin: "200px",
		triggerOnce: false,
	});

	useEffect(() => {
		if (inView && pagination * 10 < (message?.length ?? 0)) {
			console.log("Loading more messages...");
			setPagination((prev) => prev + 1);
		}
	}, [inView]);

	useEffect(() => {
		setPagination(1);
		const timeout = setTimeout(() => {
			divRef.current?.scrollTo({
				top: divRef.current.scrollHeight,
				behavior: "auto",
			});
		}, 0);
		return () => clearTimeout(timeout);
	}, [message, selectedRoom]);

	const renderMessage = () => {
	const total = message?.length ?? 0;
	const visibleCount = pagination * MESSAGES_PER_PAGE;
	const start = Math.max(0, total - visibleCount);
	const filteredMessages = message?.slice(start, total);

	return (
		<>
			{filteredMessages?.map((msg) => (
				<Message
					isSender={userId === msg.accountId}
					key={msg._id}
					message={msg}
				/>
			))}
		</>
	);
};


	return (
		<div
			ref={divRef}
			className="flex h-full w-full flex-col gap-3 overflow-y-auto bg-background px-3 pb-3"
		>
			<div className="flex-shrink-0 flex-grow" />
			<div ref={topRef} />
			<div className="h-fit">{renderMessage()}</div>
		</div>
	);

	// const loadMore = () => {
	// 	if (!message?.length) return;

	// 	const total = message.length;
	// 	const lengthShowed = paginatedMessages.length;

	// 	if (lengthShowed >= total) return;

	// 	const loadCount = Math.min(10, total - lengthShowed);
	// 	const start = total - lengthShowed - loadCount;
	// 	const end = total - lengthShowed;

	// 	const moreMessages = message.slice(start, end);

	// 	if (moreMessages.length > 0) {
	// 		setPaginatedMessages((prev) => [...moreMessages, ...prev]);
	// 	}
	// };

	// useEffect(() => {
	// 	if (!message?.length) {
	// 		setPaginatedMessages([]);
	// 		return;
	// 	}
	// 	const initial = message.slice(Math.max(0, message.length - 10));
	// 	setPaginatedMessages(initial);
	// }, [message]);

	// return (
	// 	<div className="h-full w-full pt-3">
	// 		<Virtuoso
	// 			className="pt-3"
	// 			data={paginatedMessages}
	// 			overscan={200}
	// 			followOutput="auto"
	// 			firstItemIndex={Math.max(0, (message?.length ?? 0) - paginatedMessages.length)}
	// 			initialTopMostItemIndex={(message?.length ?? 0) - 1}
	// 			startReached={loadMore}
	// 			itemContent={(index, msg) => (
	// 				<div className="flex h-full w-full gap-3 bg-background px-3">
	// 					<Message
	// 						key={msg._id}
	// 						isSender={userId === msg.accountId}
	// 						message={msg}
	// 					/>
	// 				</div>
	// 			)}
	// 		/>
	// 	</div>
	// );
};
