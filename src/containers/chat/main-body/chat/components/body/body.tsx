import { useSelector } from "react-redux";
import { Message } from "./components/message";
import { useEffect, useRef, useState } from "react";
import { RootState } from "@/redux/store";
import { useInView } from "react-intersection-observer";
import { IMessage } from "@/types/implement/message.interface";
import { socketService } from "@/lib/socket/socket";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { LocalStorage } from "@/lib/local-storage";

export const BodyChat = () => {
	const divRef = useRef<HTMLDivElement>(null);
	const [pagination, setPagination] = useState<number>(1);
	const { message, status } = useSelector((state: RootState) => state.message);
	const [loading, setLoading] = useState<boolean>(false);
	const { selectedRoomId } = useSelector((state: RootState) => state.selectedRoom);

	const { ref: topRef, inView } = useInView({
		rootMargin: "100px",
		triggerOnce: false,
	});
	const [messages, setMessages] = useState<IMessage[]>();

	useEffect(() => {
		
		if (message && selectedRoomId) {
			const filteredMessages = message.filter((msg) => msg.room_id === selectedRoomId);
			setMessages(filteredMessages);
		}
	}, [message, selectedRoomId]);

	useEffect(() => {
		if (inView) {
			setPagination((prev) => prev + 1);
		}
	}, [inView]);

	const renderMessage = () => {
		return (
			<>
				{messages?.slice(0, 10 * pagination).map((msg) => (
					<Message
						key={msg.message_id}
						message={msg}
					/>
				))}
			</>
		);
	};

	return (
		<div
			ref={divRef}
			className="flex h-full w-full flex-col-reverse gap-3 overflow-y-auto bg-background px-3 pb-3"
		>
			{renderMessage()}
			<div ref={topRef} />
		</div>
	);
};
