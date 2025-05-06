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
	const { message, status } = useSelector((state: RootState) => state.message);
	const userId = localStorage.getItem(LocalStorage.userId);
	const [paginatedMessages, setPaginatedMessages] = useState<IMessage[]>([]);

	// const { ref: topRef, inView } = useInView({
	// 	rootMargin: "100px",
	// 	triggerOnce: false,
	// });

	// // useEffect(() => {
	// // 	if (message && selectedRoom) {
	// // 		const filteredMessages = message.filter((msg) => msg.room_id === selectedRoom.id);
	// // 		setMessages(filteredMessages);
	// // 	}
	// // }, [message, selectedRoom]);

	// useEffect(() => {
	// 	if (inView) {
	// 		setPagination((prev) => prev + 1);
	// 	}
	// }, [inView]);

	// const renderMessage = () => {
	// 	const filteredMessages = message?.slice
	// 	return (
	// 		<>
	// 			{message?.map((msg) => (
	// 				<Message
	// 					isSender={userId === msg.accountId}
	// 					key={msg._id}
	// 					message={msg}

	// 				/>
	// 			))}
	// 		</>
	// 	);
	// };

	// return (
	// 	<div
	// 		ref={divRef}
	// 		className="flex h-full w-full flex-col-reverse gap-3 overflow-y-auto bg-background px-3 pb-3"
	// 	>
	// 		{renderMessage()}
	// 		<div ref={topRef} />
	// 	</div>
	// );


	const loadMore = () => {
		if (!message?.length) return;

		const total = message.length;
		const lengthShowed = paginatedMessages.length;

		if (lengthShowed >= total) return;

		const loadCount = Math.min(10, total - lengthShowed);
		const start = total - lengthShowed - loadCount;
		const end = total - lengthShowed;

		const moreMessages = message.slice(start, end);

		if (moreMessages.length > 0) {
			setPaginatedMessages((prev) => [...moreMessages, ...prev]);
		}
	};

	useEffect(() => {
		if (!message?.length) return;
		const initial = message.slice(Math.max(0, message.length - 10));
		setPaginatedMessages(initial);
		return;
	}, [message]);

	return (
		<div className="h-full w-full pt-3">
			<Virtuoso
				className="pt-3"
				data={paginatedMessages}
				overscan={200}
				followOutput="auto"
				firstItemIndex={Math.max(0, (message?.length ?? 0) - paginatedMessages.length)}
				initialTopMostItemIndex={(message?.length ?? 0) - 1}
				startReached={loadMore}
				itemContent={(index, msg) => (
					<div className="flex h-full w-full gap-3 bg-background px-3">
						<Message
							key={msg._id}
							isSender={userId === msg.accountId}
							message={msg}
						/>
					</div>
				)}
			/>
		</div>
	);
};
