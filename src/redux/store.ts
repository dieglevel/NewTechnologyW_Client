import { configureStore } from "@reduxjs/toolkit";
import { SideBarReducer } from "./store/ui/sidebar";
import { DetailInformationReducer } from "./store/models/detail-information-slice";
import { modalReducer } from "./store/ui/modal";
import { OptionViewReducer } from "./store/ui";

export const store = configureStore({
	reducer: {
		sidebar: SideBarReducer, // Thêm reducer vào store
		optionView: OptionViewReducer, // Thêm reducer vào store
		modal: modalReducer,
		detailInformation: DetailInformationReducer, // Thêm reducer vào store
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
