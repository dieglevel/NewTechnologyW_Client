// idbSlice.ts
import { IDBManager } from "@/lib/idb";
import { IFriend } from "@/types/implement";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";



const storeName = "myListFriend"; // Tên store trong IndexedDB
const thunkDB = "idb/"
const thunkName = "MyListFriend";

const thunkAction = {
  fetch: "fetch",
  set: "set",
  delete: "delete",
}

const idb = new IDBManager<IFriend>(storeName, "accountId");

export const fetchMyListFriend = createAsyncThunk(`${thunkDB}${thunkAction.fetch}${thunkName}`, async (): Promise<IFriend[]> => {
  const myListFriends = await idb.getAll();
  console.log("myListFriend DB: ", myListFriends);
  return myListFriends || null;
});

export const setMyListFriend = createAsyncThunk(`${thunkDB}${thunkAction.set}${thunkName}`, async (friend: IFriend[]) => {
  console.log("friend: ", friend);
  await idb.updateMany(friend);
  return friend;
});

export const deleteMyListFriend = createAsyncThunk(`${thunkDB}${thunkAction.delete}${thunkName}`, async (id: string) => {
  await idb.delete(id);
  return id;
});

interface state {
  myListFriend: IFriend[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: state = {
  myListFriend: null,
  status: "idle",
};

const myListFriendSlice = createSlice({
  name: "my-list-friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyListFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyListFriend.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.status = "succeeded";
        state.myListFriend = action.payload;
      })
      .addCase(fetchMyListFriend.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(setMyListFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setMyListFriend.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.status = "succeeded";
        if (state.myListFriend) {
          state.myListFriend = [...state.myListFriend, ...action.payload];
        } else {
          state.myListFriend = action.payload;
        }
      })
      .addCase(setMyListFriend.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(deleteMyListFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMyListFriend.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        const index = state.myListFriend?.findIndex((friend) => friend.id === action.payload);
        if (index !== undefined && index !== -1) {
          if (state.myListFriend) {
            state.myListFriend.splice(index, 1);
          }
        }
      })
      .addCase(deleteMyListFriend.rejected, (state) => {
        state.status = "failed";
      });

  },
});


export const MyListFriendReducer = myListFriendSlice.reducer;

