import { useSelector } from "react-redux";
import { Message } from "./components/message";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";


export const BodyChat = () => {
	const [messages, setMessages] = useState<any[]>([]);
	const { message, status } = useSelector((state: RootState) => state.message);


	const addMessage = (newMessage: any) => {
		setMessages((prevMessages) => [...prevMessages, newMessage]);
	};

	useEffect(() => {
		if (status === "succeeded") {
			setMessages(message || []);
		}
	}, [status]);

	return (
		<div className="flex h-full w-full flex-col-reverse gap-3 overflow-y-auto  px-3 pb-3 bg-background">
			{messages.slice(0, 10).map((message, index) => (
				<Message
					key={index}
					message={message}
				/>
			))}
		</div>
	);
};
