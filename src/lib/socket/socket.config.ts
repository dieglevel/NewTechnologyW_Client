import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketConfig {
	url: string;
	token: string;
}

const useSocket = ({ url, token }: SocketConfig) => {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socketInstance = io(url, { extraHeaders: { token: `${token}` } });
		setSocket(socketInstance);

		socketInstance.on("connect", () => {
			setIsConnected(true);
			console.log("Socket.IO connected");
		});

		socketInstance.on("disconnect", () => {
			setIsConnected(false);
			console.log("Socket.IO disconnected");
		});

		return () => {
			socketInstance.disconnect();
		};
	}, [url]);

	const emitEvent = <T>(event: string, data?: T) => {
		if (socket) {
			socket.emit(event, data);
		} else {
			console.warn("Socket.IO is not connected");
		}
	};

	const onEvent = <T>(event: string, callback: (data: T) => void) => {
		if (socket) {
			socket.on(event, callback);
		} else {
			console.warn("Socket.IO is not connected");
		}
	};

	return { isConnected, emitEvent, onEvent };
};

export default useSocket;
