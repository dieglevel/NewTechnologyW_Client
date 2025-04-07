"use client";
import { DetailInformationReducer } from './../../redux/store/models/detail-information-slice';

import { LocalStorageKey } from "@/lib/local-storage";
import { SocketEmitType, SocketOnType } from "@/lib/socket";
import { AppDispatch } from "@/redux/store";
import { addDetailInformation } from "@/redux/store/models/detail-information-slice";
import { IDetailInformation } from "@/types/implement";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { useNetworkStatus } from '../network-status';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || null;

const useSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const network = useNetworkStatus();

	const dispatch = useDispatch<AppDispatch>();

	const connect = (socketInstance: Socket) => {
		connectServer(socketInstance);
		connectMyListRoom(socketInstance);
		connectDetailInformation(socketInstance);
	}

	const connectDetailInformation = (socketInstance: Socket) => {
		// Detail information
		socketInstance?.on(SocketOnType.getDetailInformation, (data: IDetailInformation) => {
			console.log("Catching Detail Infomation: ", data)
			dispatch(addDetailInformation(data));
		});

		socketInstance?.emit(SocketEmitType.getDetailInformation, {
		});
	}

	const connectServer = (socketInstance: Socket) => {
		socketInstance?.emit(SocketEmitType.connectServer);

		socketInstance?.on(SocketOnType.connectServer, (data) => {
			console.log(data);
		});
	}

	const connectMyListRoom = (socketInstance: Socket) => {
		socketInstance?.emit(SocketEmitType.myListRoom);

		socketInstance?.on(SocketOnType.myListRoom, (data) => {
			console.log(data);
		});

	}

	useEffect(() => {
		if (!navigator.onLine) {
			console.warn("Network is offline. Socket connection aborted.");
			return;
		}

		const token = localStorage.getItem(LocalStorageKey.TOKEN);
		const socketInstance = io(URL ? URL : "", { extraHeaders: { token: `${token}` } });

		console.log("OK: Socket");

		setSocket(socketInstance);
		
		connect(socketInstance);


		return () => {
			socketInstance.disconnect();
			setSocket(null);
		};
	}, []);

	useEffect(() => {
		if (socket) {
			if (network) {
				console.log("Network is online. Reconnecting socket.");
				socket.connect();
			} else {
				console.warn("Network is offline. Disconnecting socket.");
				socket.disconnect();
			}
		}
	}, [network]);

	return { socket };
};

export default useSocket;
