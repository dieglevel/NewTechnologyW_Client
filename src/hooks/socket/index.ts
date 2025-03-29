"use client";

import { LocalStorageKey } from "@/lib/local-storage";
import { SocketEmitType, SocketOnType } from "@/lib/socket";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || null;

const useSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const token = localStorage.getItem(LocalStorageKey.TOKEN);

		const socketInstance = io(URL ? URL : "", { extraHeaders: { token: `${token}` } });

		setSocket(socketInstance);

		socketInstance.emit(SocketEmitType.connectServer);

		socketInstance.on(SocketOnType.connectServer, (data) => {
			console.log(data);
		});

		socketInstance.emit(SocketEmitType.myListRoom);

		socketInstance.on(SocketOnType.myListRoom, (data) => {
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
