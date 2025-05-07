// roomSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IDBManager } from "@/lib/idb";
import { stat } from "fs";
import { IMessage } from "@/types/implement/message.interface";

// Config constants
const storeName = "message";
const thunkDB = "idb/";
const thunkName = "Message";

const thunkAction = { fetch: "fetch", set: "set", delete: "delete", setOne: "setOne", fetchByRoomId: "fetchByRoomId" };

// IDB instance
const idb = new IDBManager<IMessage>(storeName, "_id", ["createdAt", ["roomId", "createdAt"]]);

// Async thunks
export const fetchMessage = createAsyncThunk(
	`${thunkDB}${thunkAction.fetch}${thunkName}`,
	async (): Promise<IMessage[]> => {
		const messages = await idb.getAllByIndex();
		return messages || [];
	},
);

export const fetchMessageByRoomId = createAsyncThunk(
	`${thunkDB}${thunkAction.fetchByRoomId}${thunkName}`,
	async (roomId: string): Promise<IMessage[]> => {
		const messages = await idb.getMessagesByRoomId(roomId);
		return messages;
	},
);

export const setMessage = createAsyncThunk(
	`${thunkDB}${thunkAction.set}${thunkName}`,
	async ({ messages }: { messages: IMessage[] }): Promise<IMessage[]> => {
		await idb.updateMany(messages);
		return messages;
	},
);

export const setOneMessage = createAsyncThunk(
	`${thunkDB}${thunkAction.setOne}${thunkName}`,
	async (message: IMessage) => {
		try {
			await idb.update(message);
			return message;
		} catch (error) {}
	},
);

export const deleteMessage = createAsyncThunk(`${thunkDB}${thunkAction.delete}${thunkName}`, async (id: string) => {
	await idb.delete(id);
	return id;
});

// Slice state interface
interface MessageState {
	message: IMessage[] | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: MessageState = { message: null, status: "idle" };

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMessage.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchMessage.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
				state.status = "succeeded";
				state.message = action.payload;
			})
			.addCase(fetchMessage.rejected, (state) => {
				state.status = "failed";
			})
			.addCase(fetchMessageByRoomId.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchMessageByRoomId.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
				state.status = "succeeded";
				state.message = action.payload;
			})
			.addCase(fetchMessageByRoomId.rejected, (state) => {
				state.status = "failed";
			})

			.addCase(setMessage.pending, (state) => {
				state.status = "loading";
			})
			.addCase(setMessage.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
				state.status = "succeeded";

				if (action.payload) {
					if (state.message) {
						if (action.payload.length > 0) {
							console.log("first")
							action.payload.forEach((newMessage) => {
								const index = state.message!.findIndex((m) => m._id === newMessage._id);
								if (index >= 0) {
									state.message![index] = newMessage;
								} else {
									state.message!.push(newMessage);
								}
							});
						} else {
							state.message = action.payload;
						}
					} else {
						state.message = action.payload;
					}
				}
			})
			.addCase(setMessage.rejected, (state) => {
				state.status = "failed";
			})
			.addCase(setOneMessage.pending, (state) => {
				state.status = "loading";
			})
			.addCase(setOneMessage.fulfilled, (state, action: PayloadAction<IMessage | undefined>) => {
				state.status = "succeeded";

				const newMessage = action.payload;

				if (newMessage) {
					if (state.message) {
						const index = state.message.findIndex((m) => m._id === newMessage._id);
						if (index >= 0) {
							state.message![index] = newMessage;
						} else {
							state.message = [...state.message, newMessage];
						}
					} else {
						state.message = [newMessage];
					}
				}
			})
			.addCase(setOneMessage.rejected, (state) => {
				state.status = "failed";
			})

			.addCase(deleteMessage.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteMessage.fulfilled, (state, action: PayloadAction<string>) => {
				state.status = "succeeded";
				if (state.message) {
					state.message = state.message.filter((m) => m.message_id !== action.payload);
				}
			})
			.addCase(deleteMessage.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export const MessageReducer = messageSlice.reducer;
