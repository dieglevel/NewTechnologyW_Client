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
import { IDetailInformation, IFriend, IRequestFriend, ISendedFriend } from "@/types/implement";
import { IRoom } from "@/types/implement/room.interface";
import { deleteSendedFriend, setSendedFriend } from "@/redux/store/models/sended-friend-slice";

class SocketService {
	private static instance: SocketService;
	private socket: Socket | null = null;
	private URL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

	private constructor() { }

	public static getInstance(): SocketService {
		if (!SocketService.instance) {
			SocketService.instance = new SocketService();
		}
		return SocketService.instance;
	}

	public connect() {
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

		this.socket.emit(SocketEmit.connectServer, {});
		this.socket.on(SocketOn.connectServer, (data) => {
			
			console.log("Connected to server:", data);
		});

		// ---------------------------------------------------------------------------------------------------------------------------------------------

		this.socket.emit(SocketEmit.detailInformation, {});
		this.socket.on(SocketOn.updateUserDetailInformation, (data: IDetailInformation) => {
			store.dispatch(initDetailInformation(data));
		});
		
		// ---------------------------------------------------------------------------------------------------------------------------------------------

		this.socket.emit(SocketEmit.myListRoom, {
			lastUpdatedAt: "2025-04-10T06:14:28.148+00:00",
		});
		this.socket.on(SocketOn.myListRoom, (data: IRoom[]) => {
			console.log("My list room updated:", data);
			store.dispatch(initRoom(data));
		});

		// ---------------------------------------------------------------------------------------------------------------------------------------------

		this.socket.on(SocketOn.requestFriend, (data: {
			behavior: string, data: IRequestFriend
		}) => {
			console.log("Socket REQUESTFRIEND request event:", data);
			if (data.behavior === "add") {
				// console.log("Friend request received:", data.data);
				const friendRequest: IRequestFriend[] = [
					data.data
				]
				const myAccountId = localStorage.getItem(LocalStorage.userId) ?? "";
				if (data.data.sender_id !== myAccountId) {



					store.dispatch(setRequestFriend(friendRequest));
				}
				const sendedFriend: ISendedFriend = data.data as ISendedFriend;
				const sendedFriends = [sendedFriend]
				store.dispatch(setSendedFriend(sendedFriends));
				socketService.emit(SocketEmit.myListRoom, {
					lastUpdatedAt: "2025-04-10T06:14:28.148+00:00",
				});

			} 
			else if (data.behavior === "remove") {
				// console.log("Friend request deleted:", data.data);
				store.dispatch(deleteRequestFriend(data.data.sender_id ?? ""));
				store.dispatch(deleteSendedFriend(data.data.receiver_id ?? ""));
			}
		});

		this.socket.on(SocketOn.friend, (data: {
			behavior: string, friend: {
				accountId: string,
				friendId: string,
			}
			detail_friend: IDetailInformation,
			accountOwner: string
		}) => {
			console.log("Socket FRIENDq event:", data);

			if (data.behavior === "add") {
				// console.log("Friend added:", data);
				const friend: IFriend[] = [{
					accountId: data.friend.accountId,
					friendId: data.friend.friendId,
					detail: data.detail_friend,
				}]
				store.dispatch(deleteRequestFriend(data.friend.accountId));
				store.dispatch(deleteSendedFriend(data.friend.accountId));
				store.dispatch(setMyListFriend(friend));
			} else if (data.behavior === "remove") {
				// console.log("Friend deleted:", data.friend);
				store.dispatch(deleteRequestFriend(data.friend.accountId));
				store.dispatch(deleteMyListFriend(data.friend.friendId));
			}

		});
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
