import { IRoom } from "@/types/implement/room.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedRoomState {
	selectedRoom: IRoom | null;
	isLoadingRoom: boolean;
}

const initialState: SelectedRoomState = {
	selectedRoom: null,
	isLoadingRoom: false,
};

const selectedRoomSlice = createSlice({
	name: "selectedRoom",
	initialState,
	reducers: {
		setSelectedRoom: (state, action: PayloadAction<IRoom>) => {
			console.log("Setting selected room:", action.payload);
			state.selectedRoom = action.payload;
		},
		clearSelectedRoom: (state) => {
			state.selectedRoom = null;
		},
		setLoadingRoom: (state, action: PayloadAction<boolean>) => {
			state.isLoadingRoom = action.payload;
		},
	},
});

export const { setSelectedRoom, clearSelectedRoom, setLoadingRoom } = selectedRoomSlice.actions;
export const SelectedRoomReducer = selectedRoomSlice.reducer;
