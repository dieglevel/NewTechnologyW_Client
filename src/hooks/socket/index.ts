"use client";

import { LocalStorageKey } from "@/lib/local-storage";
import { SocketEmitType, SocketOnType } from "@/lib/socket";
import { AppDispatch } from "@/redux/store";
import { addDetailInformation } from "@/redux/store/models/detail-information-slice";
import { IDetailInformation } from "@/types/implement";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || null;

const useSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);

	const dispatch = useDispatch<AppDispatch>();

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

		// Detail information
		socketInstance.on(SocketOnType.getDetailInformation, (data: IDetailInformation) => {
			dispatch(addDetailInformation(data));
		});

		socketInstance.emit(SocketEmitType.getDetailInformation, {
		});

		return () => {
			socketInstance.disconnect();
			setSocket(null);
		};
	}, []);

	return { socket };
};

export default useSocket;
