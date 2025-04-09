"use client";

import { LocalStorageKey } from "@/lib/local-storage";
import { SocketEmitType, SocketOnType } from "@/lib/socket";
import { AppDispatch } from "@/redux/store";
import { IDetailInformation } from "@/types/implement";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { useNetworkStatus } from '../network-status';
import { fetchDetailInformation, setDetailInformation } from "@/redux/store/models";


const URL = process.env.NEXT_PUBLIC_SOCKET_URL || null;

const useSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const network = useNetworkStatus();

	const dispatch = useDispatch<AppDispatch>();

// * handle socket connection
	const connect = (socketInstance: Socket) => {
		connectDetailInformation(socketInstance);
	}

// * handle socket
	const connectDetailInformation = (socketInstance: Socket) => {
		socketInstance?.on(SocketOnType.getDetailInformation, (data: IDetailInformation) => {
			console.log("Get detail information: ", data);
			dispatch(setDetailInformation(data));
		});
	
		socketInstance?.emit(SocketEmitType.getDetailInformation, {
		});
	
		socketInstance?.on(SocketOnType.updateDetailInformation, (data: IDetailInformation) => {
			dispatch(setDetailInformation(data));
			console.log("Update detail information: ", data);
		});
	
		// TEMP: UPDATE DETAIL INFORMATION
	
	
	}


// * handle socket connection
	useEffect(() => {
		if (!navigator.onLine) {
			console.warn("Network is offline. Socket connection aborted.");
			
			// ! Get data from IndexedDB
			dispatch(fetchDetailInformation());

			return;
		}

		const token = localStorage.getItem(LocalStorageKey.TOKEN);
		const socketInstance = io(URL ? URL : "", { extraHeaders: { token: `${token}` } });

		console.log("Socket instance created: ", socketInstance);

		setSocket(socketInstance);
		connect(socketInstance);

		return () => {
			socketInstance.disconnect();
			setSocket(null);
		};
	}, []);

// * handle socket Network status
	useEffect(() => {
		if (socket) {
			if (network) {
				console.warn("Network is online. Reconnecting socket.");
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
