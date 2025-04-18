// idbSlice.ts
import { IDBManager } from "@/lib/idb";
import { ISendedFriend } from "@/types/implement";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";



const storeName = "sendedFriend"; // Tên store trong IndexedDB
const thunkDB = "idb/"
const thunkName = "SendedFriend";

const thunkAction = {
  fetch: "fetch",
  set: "set",
  delete: "delete",
}

const idb = new IDBManager<ISendedFriend>(storeName, "receiver_id");

export const fetchSendedFriend = createAsyncThunk(`${thunkDB}${thunkAction.fetch}${thunkName}`, async (): Promise<ISendedFriend[]> => {
  const sendedFriends = await idb.getAll();
  console.log("sendedFriends DB: ", sendedFriends);
  return sendedFriends || null;
});

export const setSendedFriend = createAsyncThunk(`${thunkDB}${thunkAction.set}${thunkName}`, async (friend: ISendedFriend[]) => {
  console.log("sendedFriends: ", friend);
  await idb.updateMany(friend);
  return friend;
});

export const deleteSendedFriend = createAsyncThunk(`${thunkDB}${thunkAction.delete}${thunkName}`, async (id: string) => {
  await idb.delete(id);
  return id;
});

interface state {
  sendedFriends: ISendedFriend[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: state = {
   sendedFriends: null,
  status: "idle",
};

const sendedFriendSlice = createSlice({
  name: "sended-friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSendedFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSendedFriend.fulfilled, (state, action: PayloadAction<ISendedFriend[]>) => {
        state.status = "succeeded";
        state.sendedFriends = action.payload;
      })
      .addCase(fetchSendedFriend.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(setSendedFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSendedFriend.fulfilled, (state, action: PayloadAction<ISendedFriend[]>) => {
        state.status = "succeeded";
        state.sendedFriends = action.payload;
      })
      .addCase(setSendedFriend.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(deleteSendedFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSendedFriend.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        const index = state.sendedFriends?.findIndex((friend) => friend.receiver_id === action.payload);
        if (index !== undefined && index !== -1) {
          if (state.sendedFriends) {
            state.sendedFriends.splice(index, 1);
          }
        }
      })
      .addCase(deleteSendedFriend.rejected, (state) => {
        state.status = "failed";
      });

  },
});


export const SendedFriendReducer = sendedFriendSlice.reducer;

