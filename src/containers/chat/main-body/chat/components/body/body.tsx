import { useSelector } from "react-redux";
import { Message } from "./components/message";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";

export const BodyChat = () => {
	const [messages, setMessages] = useState<any[]>([]);

	const { detailInformation, status: detailInformationStatus } = useSelector(
		(state: RootState) => state.detailInformation,
	);

	const addMessage = (newMessage: any) => {
		setMessages((prevMessages) => [...prevMessages, newMessage]);
	};

	useEffect(() => {
		if (detailInformationStatus === "succeeded") {
			setMessages((pre) => [...pre, JSON.stringify(detailInformation)]);
		}
	}, [detailInformationStatus]);

	return (
		<div className="flex h-full w-full flex-col-reverse gap-3 overflow-y-auto  px-3 pb-3 bg-background">
			{messages.map((message, index) => (
				<Message
					key={index}
					message={message}
				/>
			))}
		</div>
	);
};
