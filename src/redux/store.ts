import { configureStore } from "@reduxjs/toolkit";
import { SideBarReducer } from "./store/ui/sidebar";
import { DetailInformationReducer } from "./store/models/detail-information-slice";
import { modalReducer } from "./store/ui/modal";
<<<<<<< Updated upstream
import { ContactBarReducer, OptionViewReducer } from "./store/ui";
import { MyListFriendReducer } from "./store/models";
=======
import { OptionViewReducer } from "./store/ui";
import { RoomReducer } from "./store/models";

export const store = configureStore({
	reducer: {
		sidebar: SideBarReducer, // Thêm reducer vào store
		optionView: OptionViewReducer, // Thêm reducer vào store
		modal: modalReducer,
		contactBar: ContactBarReducer, // Thêm reducer vào store
		detailInformation: DetailInformationReducer, // Thêm reducer vào store
		listRoom: RoomReducer,
		myListFriend: MyListFriendReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
