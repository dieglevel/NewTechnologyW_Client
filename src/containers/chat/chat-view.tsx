"use client"

import { ChatProfile } from "@/components/list-chat/chat-profile";
import { useEffect, useRef } from "react";
import { SearchComponent } from "../../components/list-chat/search";

export const ChatView = () => {
	const divRef = useRef<HTMLDivElement>(null);
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
		<div ref={divRef} className="flex h-lvh max-w-80 flex-col flex-wrap gap-2 border-r-1 border-border bg-white ">
			<SearchComponent />
			<div className="flex flex-col gap-1">
				{
					/* { for 5 } */
					[...Array(5)].map((_, index) => (
						<ChatProfile
							key={index}
							userName="Nguyễn Văn A"
							imageUrl="https://i.pinimg.com/236x/7e/42/81/7e42814080bab700d0b34984952d0989.jpg"
							message={{
								isReceived: true,
								text: ` ⚠ The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.`,
							}}
							timeSent={new Date()}
							type="user"
						/>
					))
				}
			</div>
		</div>
	);
};
