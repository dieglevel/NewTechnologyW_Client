import { io, Socket } from "socket.io-client";
import { LocalStorage } from "@/lib/local-storage";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { store } from "@/redux/store";
import {
	setDetailInformation,
	fetchDetailInformation,
	setRoom,
	setRequestFriend,
	fetchRoom,
	initDetailInformation,
	deleteRequestFriend,
	setMyListFriend,
	deleteMyListFriend,
	initRoom,
} from "@/redux/store/models";
import { IDetailInformation, IFriend, ISendedFriend } from "@/types/implement";
import { IRoom } from "@/types/implement/room.interface";
import { deleteSendedFriend, setSendedFriend } from "@/redux/store/models/sended-friend-slice";
import { ConnectServerSocket } from "./implement/connect-server.socket";
import { DetailInformationSocket } from "./implement/my-detail-information.socket";
import { MyListRoomSocket } from "./implement/my-list-room.socket";
import { FriendSocket } from "./implement/friend.socket";

class SocketService {
	private static instance: SocketService;
	private socket: Socket | null = null;
	private URL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

	private constructor() { }

	public static getInstance(): SocketService {
		if (!SocketService.instance) {
			SocketService.instance = new SocketService();

			SocketService.instance.connect();
		}
		return SocketService.instance;
	}

	public connect() {
		// ! IMPORTANT INITITAL DATA FROM IDB
		try {
			if (this.socket || !navigator.onLine) {
				console.warn("Already connected or offline.");
				store.dispatch(fetchDetailInformation());
				store.dispatch(fetchRoom());
				return;
			}

			const token = localStorage.getItem(LocalStorage.token);

			this.socket = io(this.URL, {
				autoConnect: true,
				extraHeaders: {
					token: `${token}`,
				},
			});

			this.registerCoreEvents();
		} catch (error) {
			console.error("Error connecting to socket:", error);
		}
	}

	private registerCoreEvents() {
		if (!this.socket) return;

		ConnectServerSocket(this.socket);

		// ---------------------------------------------------------------------------------------------------------------------------------------------

		DetailInformationSocket(this.socket)

		// ---------------------------------------------------------------------------------------------------------------------------------------------

		MyListRoomSocket(this.socket)

		// ---------------------------------------------------------------------------------------------------------------------------------------------

		FriendSocket(this.socket)
	}

	public disconnect() {
		this.socket?.disconnect();
		this.socket = null;
	}

	public getSocket(): Socket | null {
		return this.socket;
	}

	public emit(event: string, data: any) {
		this.socket?.emit(event, data);
	}

	public on(event: string, callback: (...args: any[]) => void) {
		this.socket?.on(event, callback);
	}

	public off(event: string, callback?: (...args: any[]) => void) {
		if (!this.socket) return;
		if (callback) {
			this.socket.off(event, callback);
		} else {
			this.socket.removeAllListeners(event);
		}
	}
}

export const socketService = SocketService.getInstance();
