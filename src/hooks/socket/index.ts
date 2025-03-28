import { LocalStorageKey } from "@/lib/local-storage";
import { SOCKET_EMIT, SOCKET_ON } from "@/lib/socket";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || null;

const useSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const token = localStorage.getItem(LocalStorageKey.TOKEN);

	useEffect(() => {
		const socketInstance = io(URL ? URL : "", { extraHeaders: { token: `${token}` } });

		setSocket(socketInstance);

		socketInstance.emit(SOCKET_EMIT.CONNECT_SERVER);

		socketInstance.on(SOCKET_ON.CONNECT_SERVER, (data) => {
			console.log(data);
		});
		
		socketInstance.emit(SOCKET_EMIT.MY_LIST_ROOM);
		
		socketInstance.on(SOCKET_ON.MY_LIST_ROOM, (data) => {
			console.log(data);
		});

		return () => {
			socketInstance.disconnect();
			setSocket(null);
		};
	}, []);

	return { socket };
};

export default useSocket;
