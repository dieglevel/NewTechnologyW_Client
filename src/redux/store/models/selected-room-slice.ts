import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedRoomState {
    selectedRoomId: string | null;
}

const initialState: SelectedRoomState = {
    selectedRoomId: null,
};

const selectedRoomSlice = createSlice({
    name: "selectedRoom",
    initialState,
    reducers: {
        setSelectedRoom: (state, action: PayloadAction<string>) => {
            state.selectedRoomId = action.payload;
        },
        clearSelectedRoom: (state) => {
            state.selectedRoomId = null;
        },
    },
});

export const { setSelectedRoom, clearSelectedRoom } = selectedRoomSlice.actions;
export const SelectedRoomReducer = selectedRoomSlice.reducer;
