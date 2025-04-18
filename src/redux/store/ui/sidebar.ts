import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SideBarSelected {
	Chat = "chat",
	Contact = "contact",
}

interface SidebarState {
	selected: SideBarSelected;
}

const initialState: SidebarState = {
	selected: SideBarSelected.Chat,
};

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		changeSidebar: (state, action: PayloadAction<SideBarSelected>) => {
			state.selected = action.payload;
		},
	},
});

export const SideBarReducer = sidebarSlice.reducer;

export const { changeSidebar } = sidebarSlice.actions;

