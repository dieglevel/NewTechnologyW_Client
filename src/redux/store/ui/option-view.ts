import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OptionViewState {
   isOpen: boolean;
}

const initialState: OptionViewState = {
   isOpen: true
};

const optionViewSlice = createSlice({
   name: "optionView",
   initialState,
   reducers: {
      toggleOptionView: (state, action: PayloadAction<boolean>) => {
         state.isOpen = action.payload;
      },
   },
});

export const OptionViewReducer = optionViewSlice.reducer;

export const { toggleOptionView } = optionViewSlice.actions;

