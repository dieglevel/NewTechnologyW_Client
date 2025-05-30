import { IMessage } from "@/types/implement";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PinnedMessagesState {
	pinned: IMessage[];
}

const initialState: PinnedMessagesState = {
	pinned: [],
};

const pinnedMessagesSlice = createSlice({
	name: "pinnedMessages",
	initialState,
	reducers: {
		addPinned(state, action: PayloadAction<IMessage>) {
			const exists = state.pinned.some((msg) => msg._id === action.payload._id);
			if (!exists) {
				state.pinned.push(action.payload);
			}
		},
		clearPinned: (state) => {
			state.pinned = [];
		},
	},
});

export const { addPinned, clearPinned } = pinnedMessagesSlice.actions;
export const pinnedMessagesReducer = pinnedMessagesSlice.reducer;
