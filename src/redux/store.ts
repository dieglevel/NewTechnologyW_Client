import { configureStore } from "@reduxjs/toolkit";
import { SideBarReducer } from "./store/sidebar";
import { DetailInformationReducer } from "./store/models/detail-information-slice";

export const store = configureStore({
	reducer: {
		sidebar: SideBarReducer, // Thêm reducer vào store
		detailInformation: DetailInformationReducer, // Thêm reducer vào store
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
