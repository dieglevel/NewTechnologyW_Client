import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
   isOpen: boolean;
   type: "detailInformation" | "none";
}

const initialState: ModalState = {
   isOpen: false,
   type: "none",
};

const modalSlice = createSlice({
   name: "modal",
   initialState,
   reducers: {
      openModal: (state, action: { payload: ModalState }) => {
         state.isOpen = true;
         state.type = action.payload.type;
      },
      closeModal: (state) => {
         state.isOpen = false;
         state.type = "none";
      },
   },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;