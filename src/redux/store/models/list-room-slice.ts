// roomSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IDBManager } from "@/lib/idb";
import { IRoom } from "@/types/implement/room.interface";
import { stat } from "fs";
import { init } from "next/dist/compiled/webpack/webpack";

// Config constants
const storeName = "room";
const thunkDB = "idb/";
const thunkName = "Room";

const thunkAction = { fetch: "fetch", set: "set", delete: "delete", init: "init" };

// IDB instance
const idb = new IDBManager<IRoom>(storeName, "id", ["latestMessage.createdAt"]);

// Async thunks
export const fetchRoom = createAsyncThunk(`${thunkDB}${thunkAction.fetch}${thunkName}`, async (): Promise<IRoom[]> => {
	const rooms = await idb.getAllByIndex();
	// console.log("Room DB: ", rooms);
	return rooms || [];
});

export const setRoom = createAsyncThunk(`${thunkDB}${thunkAction.set}${thunkName}`, async (rooms: IRoom[]) => {

	for (const room of rooms) {
		await idb.update(room);
	}

	const updatedRooms = await idb.getAllByIndex();
	return updatedRooms;
});

export const deleteRoom = createAsyncThunk(`${thunkDB}${thunkAction.delete}${thunkName}`, async (id: string) => {
	await idb.delete(id);
	return id;
});

export const initRoom = createAsyncThunk(`${thunkDB}${thunkAction.init}${thunkName}`, async (rooms: IRoom[]): Promise<IRoom[]> => {
	await idb.clear();
	// console.log("aaa", rooms);
	await idb.updateMany(rooms);
	const room = await idb.getAll()
	// console.log("room: ", room);
	return room;
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
						const index = state.room!.findIndex((r) => r.id === newRoom.id);
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
			})
			.addCase(initRoom.pending, (state) => {
				state.status = "loading";
			})
			.addCase(initRoom.fulfilled, (state, action: PayloadAction<IRoom[]>) => {
				state.status = "succeeded";
				console.log("action.payload: ", action.payload);	
				state.room = action.payload;
			})
			.addCase(initRoom.rejected, (state) => {
				state.status = "failed";
			})

	},
});

export const RoomReducer = roomSlice.reducer;
