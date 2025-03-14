import { LocalStorageKey } from "@/lib/local-storage";
import { SOCKET_ON } from "@/lib/socket";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || null;

const useSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const token = localStorage.getItem(LocalStorageKey.TOKEN);

	useEffect(() => {
		const socketInstance = io(URL ? URL : "", { extraHeaders: { token: `${token}` } });

		socketInstance.on(SOCKET_ON.CONNECT_SERVER, () => {
			console.log("Connected to server");
		});

		socketInstance.on(SOCKET_ON.MY_LIST_TROOM, (data: any) => {
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
