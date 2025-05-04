// idbSlice.ts
import { IDBManager } from "@/lib/idb";
import { IRequestFriend } from "@/types/implement/response/request-friend.interface";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";



const storeName = "requestFriend"; // Tên store trong IndexedDB
const thunkDB = "idb/"
const thunkName = "RequestFriend";

const thunkAction = {
  fetch: "fetch",
  set: "set",
  delete: "delete",
  init: "init",
}

const idb = new IDBManager<IRequestFriend>(storeName, "sender_id");

export const fetchRequestFriend = createAsyncThunk(`${thunkDB}${thunkAction.fetch}${thunkName}`, async (): Promise<IRequestFriend[]> => {
  const requestFriends = await idb.getAll();
  return requestFriends || null;
});

export const setRequestFriend = createAsyncThunk(`${thunkDB}${thunkAction.set}${thunkName}`, async (friend: IRequestFriend[]) => {
  await idb.updateMany(friend);
  const requestFriends = await idb.getAll();
  return requestFriends;
});

export const deleteRequestFriend = createAsyncThunk(`${thunkDB}${thunkAction.delete}${thunkName}`, async (id: string) => {
  await idb.delete(id);
  return id;
});

export const initRequestFriend = createAsyncThunk(`${thunkDB}${thunkAction.init}${thunkName}`, async (friend: IRequestFriend[]) => {
  await idb.clear();
  await idb.initData(friend);
  return friend;
});

interface state {
  requestFriends: IRequestFriend[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: state = {
  requestFriends: null,
  status: "idle",
};

const requestFriendSlice = createSlice({
  name: "request-friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRequestFriend.fulfilled, (state, action: PayloadAction<IRequestFriend[]>) => {
        state.status = "succeeded";
        state.requestFriends = action.payload;
      })
      .addCase(fetchRequestFriend.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(setRequestFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setRequestFriend.fulfilled, (state, action: PayloadAction<IRequestFriend[]>) => {
        state.status = "succeeded";
        state.requestFriends = action.payload;
      })
      .addCase(setRequestFriend.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(deleteRequestFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRequestFriend.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        const index = state.requestFriends?.findIndex((friend) => friend.sender_id === action.payload);
        if (index !== undefined && index !== -1) {
          if (state.requestFriends) {
            state.requestFriends.splice(index, 1);
          }
        }
      })
      .addCase(deleteRequestFriend.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(initRequestFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initRequestFriend.fulfilled, (state, action: PayloadAction<IRequestFriend[]>) => {
        state.status = "succeeded";
        state.requestFriends = action.payload;
      })
      .addCase(initRequestFriend.rejected, (state) => {
        state.status = "failed";
      });

  },
});


export const RequestFriendReducer = requestFriendSlice.reducer;

