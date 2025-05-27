import { SocketEmit, SocketOn } from "@/constants/socket";
import { store } from "@/redux/store";
import { setRoom, updateRoom } from "@/redux/store/models";
import { IRoom } from "@/types/implement";
import { normalizeRoom } from "@/utils";
import { Socket } from "socket.io-client";

export const MyListRoomSocket = (socket: Socket | null) => {
	socket?.on(SocketOn.myListRoom, async (data) => {
		const { accountOwner, room, behavior } = data;
		const newRoom = room as IRoom;

		if (accountOwner[0]?.avatar || accountOwner[0]?.avatarUrl) {
			newRoom.detailRoom = accountOwner;
		}

		console.log("rooom", newRoom);

		switch (behavior) {
			case "add":
				store.dispatch(setRoom([normalizeRoom(newRoom)]));
				break;
			case "update":
				if (newRoom?.id || data.room?.room_id || data.room?.roomId) {
					store.dispatch(updateRoom([normalizeRoom(newRoom)]));
				}
				break;
			case "delete":
				store.dispatch(setRoom([normalizeRoom(newRoom)]));
				break;
			case "disband":
				store.dispatch(updateRoom([normalizeRoom(newRoom)]));
				break;
			default:
				break;
		}
	});
};
