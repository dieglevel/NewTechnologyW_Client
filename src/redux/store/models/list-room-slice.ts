// roomSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IDBManager } from "@/lib/idb";
import { IRoom } from "@/types/implement/room.interface";
import { stat } from "fs";

// Config constants
const storeName = "room";
const thunkDB = "idb/";
const thunkName = "Room";

const thunkAction = { fetch: "fetch", set: "set", delete: "delete" };

// IDB instance
const idb = new IDBManager<IRoom>(storeName, "room_id", "updatedAt");

// Async thunks
export const fetchRoom = createAsyncThunk(`${thunkDB}${thunkAction.fetch}${thunkName}`, async (): Promise<IRoom[]> => {
	const rooms = await idb.getAllByIndex();
	// console.log("Room DB: ", rooms);
	return rooms || [];
});

export const setRoom = createAsyncThunk(`${thunkDB}${thunkAction.set}${thunkName}`, async (rooms: IRoom[]) => {

	await idb.updateMany(rooms);
	const updatedRooms = await idb.getAllByIndex();
	return updatedRooms;
});

export const deleteRoom = createAsyncThunk(`${thunkDB}${thunkAction.delete}${thunkName}`, async (id: string) => {
	await idb.delete(id);
	return id;
});

// Slice state interface
interface RoomState {
	room: IRoom[] | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RoomState = { room: null, status: "idle" };

const roomSlice = createSlice({
	name: "room",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRoom.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchRoom.fulfilled, (state, action: PayloadAction<IRoom[]>) => {
				state.status = "succeeded";
				state.room = action.payload;
			})
			.addCase(fetchRoom.rejected, (state) => {
				state.status = "failed";
			})

			.addCase(setRoom.pending, (state) => {
				state.status = "loading";
			})
			.addCase(setRoom.fulfilled, (state, action: PayloadAction<IRoom[]>) => {
				state.status = "succeeded";

				if (state.room) {
					action.payload.forEach((newRoom) => {
						const index = state.room!.findIndex((r) => r.room_id === newRoom.room_id);
						if (index >= 0) {
							state.room![index] = newRoom;
						} else {
							state.room!.push(newRoom);
						}
					});
				} else {
					state.room = action.payload;
				}
			})
			.addCase(setRoom.rejected, (state) => {
				state.status = "failed";
			})

			.addCase(deleteRoom.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteRoom.fulfilled, (state, action: PayloadAction<string>) => {
				state.status = "succeeded";
				if (state.room) {
					state.room = state.room.filter((r) => r.id !== action.payload);
				}
			})
			.addCase(deleteRoom.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export const RoomReducer = roomSlice.reducer;
