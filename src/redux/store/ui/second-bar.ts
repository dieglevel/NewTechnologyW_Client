import { SecondBar } from '@/containers/chat';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SecondBarState {
	isOpenSecondBar: boolean;
	isAutoControlled: boolean;
}

const initialState: SecondBarState = {
	isOpenSecondBar: true,
	isAutoControlled: true,
};

const secondBarSlice = createSlice({
	name: "secondBar",
	initialState,
	reducers: {
		toggleSecondBar: (state, action: PayloadAction<boolean>) => {
			state.isOpenSecondBar = action.payload;
			state.isAutoControlled = false;
		},
		setSecondBarAuto: (state, action: PayloadAction<boolean>) => {
			state.isOpenSecondBar = action.payload;
			state.isAutoControlled = true; // auto điều khiển lại
		},
	},
});

export const SecondBarReducer = secondBarSlice.reducer;

export const { toggleSecondBar, setSecondBarAuto } = secondBarSlice.actions;
