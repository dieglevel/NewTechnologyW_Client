import { useDispatch, useSelector } from "react-redux";
import { Message } from "./components/message";
import { useEffect, useRef, useState } from "react";
import { RootState } from "@/redux/store";
import { useInView } from "react-intersection-observer";
import { IMessage } from "@/types/implement/message.interface";
import { socketService } from "@/lib/socket/socket";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { LocalStorage } from "@/lib/local-storage";
import { Virtuoso, VirtuosoProps } from "react-virtuoso";
import { clearPinned } from "@/redux/store/models";

export const BodyChat = () => {
	const MESSAGES_PER_PAGE = 10;
	const [pagination, setPagination] = useState<number>(1);
	const { message } = useSelector((state: RootState) => state.message);
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const { pinned } = useSelector((state: RootState) => state.pinnedMessages);

	const [isScrollingToPinned, setIsScrollingToPinned] = useState(false);

	const dispatch = useDispatch();

	const userId = localStorage.getItem(LocalStorage.userId);

	const divRef = useRef<HTMLDivElement>(null);

	const { ref: topRef, inView } = useInView({
		rootMargin: "200px",
		triggerOnce: false,
	});


	useEffect(() => {
		if (inView && !isScrollingToPinned && pagination * 10 < (message?.length ?? 0)) {
			setPagination((prev) => prev + 1);
		}
	}, [inView, isScrollingToPinned]);

	useEffect(() => {
		console.log(pagination);
		if (selectedRoom?.latestMessage?.accountId === userId || pagination <= 5) {
			setPagination(1);
			const timeout = setTimeout(() => {
				divRef.current?.scrollTo({
					top: divRef.current.scrollHeight,
					behavior: "auto",
				});
			}, 0);
			return () => clearTimeout(timeout);
		}
	}, [message, selectedRoom]);

	useEffect(() => {
		console.log(pinned);
		if (pinned.length > 0) {
			scrollToPinnedMessage(pinned[0]._id || "");
			dispatch(clearPinned());
		}
	}, [pinned]);

	useEffect(() => {
		setPagination(1);
		const timeout = setTimeout(() => {
			divRef.current?.scrollTo({
				top: divRef.current.scrollHeight,
				behavior: "auto",
			});
		}, 0);
		return () => clearTimeout(timeout);
	}, []);

	const scrollToPinnedMessage = (pinnedMessageId: string) => {
		const messageIndex = message?.findIndex((msg) => msg._id === pinnedMessageId);

		if (typeof messageIndex !== "number" || messageIndex === -1 || !message) return;

		const totalMessages = message.length;
		const messagePosition = totalMessages - messageIndex;
		const requiredPagination = Math.ceil(messagePosition / MESSAGES_PER_PAGE);
		const page = Math.max(requiredPagination, pagination);

		setIsScrollingToPinned(true);
		setPagination(page);

		setTimeout(() => {
			const messageElement = document.querySelector(`[data-message-id="${pinnedMessageId}"]`);
			if (messageElement) {
				messageElement.scrollIntoView({ behavior: "smooth", block: "center" });

				setTimeout(() => {
					messageElement.classList.add(
						"bg-blue-100",
						"border",
						"border-blue-400",
						"scale-[1.02]",
						"rounded-lg",
						"shadow-lg",
						"transition-all",
						"duration-500",
						"ease-in-out",
					);

					setTimeout(() => {
						messageElement.classList.remove(
							"bg-blue-100",
							"border",
							"border-blue-400",
							"scale-[1.02]",
							"rounded-lg",
							"shadow-lg",
						);

						setIsScrollingToPinned(false);
					}, 1000);
				}, 100);
			} else {
				setIsScrollingToPinned(false);
			}
		}, 200); // Tăng timeout để đảm bảo render hoàn tất
	};

	const renderMessage = () => {
		const total = message?.length ?? 0;
		const visibleCount = pagination * MESSAGES_PER_PAGE;
		const start = Math.max(0, total - visibleCount);
		const filteredMessages = message?.slice(start, total);

		return (
			<>
				{filteredMessages?.map((msg) => (
					<Message
						key={msg._id}
						isSender={userId === msg.accountId}
						message={msg}
					/>
				))}
			</>
		);
	};

	return (
		<div
			ref={divRef}
			className="flex w-full flex-1 flex-col gap-3 overflow-y-auto bg-background px-3 pb-3"
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
