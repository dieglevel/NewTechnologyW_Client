import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ContactBarTypes{
   Contact= "contact",
   AddFriend = "add-friend",
   Blocked = "blocked",
}

interface ContactBarState {
   selected: ContactBarTypes;
}

const initialState: ContactBarState = {
   selected: ContactBarTypes.Contact,
};

const contactBarSlice = createSlice({
   name: "contact-bar",
   initialState,
   reducers: {
      selectContactBar: (state, action: PayloadAction<ContactBarTypes>) => {
         state.selected = action.payload;
      },

   },
});

export const ContactBarReducer = contactBarSlice.reducer;

export const { selectContactBar } = contactBarSlice.actions;

