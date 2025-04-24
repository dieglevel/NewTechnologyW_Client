import { configureStore } from "@reduxjs/toolkit";
import { SideBarReducer } from "./store/ui/sidebar";
import { DetailInformationReducer } from "./store/models/detail-information-slice";
import { modalReducer } from "./store/ui/modal";
import { ContactBarReducer, OptionViewReducer } from "./store/ui";
import { MyListFriendReducer, RequestFriendReducer } from "./store/models";
import { RoomReducer } from "./store/models";
import { SendedFriendReducer } from "./store/models/sended-friend-slice";
import { SelectedRoomReducer } from "./store/ui/selected-room-slice";
import { MessageReducer } from "./store/models/message-slice";

export const store = configureStore({
	reducer: {
		sidebar: SideBarReducer, // Thêm reducer vào store
		optionView: OptionViewReducer, // Thêm reducer vào store
		modal: modalReducer,
		contactBar: ContactBarReducer, // Thêm reducer vào store
		detailInformation: DetailInformationReducer, // Thêm reducer vào store
		listRoom: RoomReducer,
		myListFriend: MyListFriendReducer,
		requestFriend: RequestFriendReducer,
		sendedFriend: SendedFriendReducer,
		selectedRoom: SelectedRoomReducer,
		message: MessageReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
