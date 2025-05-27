import { SocketEmit, SocketOn } from "@/constants/socket";
import { RootState, store } from "@/redux/store";
import { deleteRoom, setRoom, updateRoom } from "@/redux/store/models";
import { clearSelectedRoom, setSelectedRoom } from "@/redux/store/ui/selected-room-slice";
import { IRoom } from "@/types/implement";
import { normalizeRoom } from "@/utils";
import { select } from "@heroui/theme";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

export const MyListRoomSocket = (socket: Socket | null) => {


	socket?.on(SocketOn.myListRoom, async (data) => {

		const { accountOwner, room, behavior } = data;
		const newRoom = room as IRoom;
		console.log("data room", data);

		if (accountOwner[0]?.avatar || accountOwner[0]?.avatarUrl) {
			newRoom.detailRoom = accountOwner;
		}


		switch (behavior) {
			case "add":
				store.dispatch(setRoom([normalizeRoom(newRoom)]));
				setSelectedRoom(normalizeRoom(newRoom));
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
			case "leave":
				store.dispatch(deleteRoom(newRoom.id ?? ""));
				store.dispatch(clearSelectedRoom());
				break;
			default:
				break;
		}
	});
};
