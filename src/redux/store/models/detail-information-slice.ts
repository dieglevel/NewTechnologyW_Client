// idbSlice.ts
import { IDBManager } from "@/lib/idb";
import { IDetailInformation } from "@/types/implement";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";



const storeName = "detailInformation"; // Tên store trong IndexedDB
const idb = new IDBManager<IDetailInformation>(storeName);

export const fetchDetailInformation = createAsyncThunk("idb/fetchDetailInformation", async (): Promise<IDetailInformation> => {
  const detailInformations = await idb.getAll();
  // Get first message
  return detailInformations[0] || null;
});

export const addDetailInformation = createAsyncThunk("idb/addDetailInformation", async (detailInformation: IDetailInformation) => {
  const id = await idb.add(detailInformation);
  return { ...detailInformation, id };
});

export const deleteDetailInformation = createAsyncThunk("idb/deleteDetailInformation", async (id: string) => {
  await idb.delete(id);
  return id;
});

interface IDBState {
  detailInformation: IDetailInformation | null;
  loading: boolean;
}

const initialState: IDBState = {
  detailInformation: null,
  loading: false,
};

const detailInformationSlice = createSlice({
  name: "idb",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailInformation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetailInformation.fulfilled, (state, action: PayloadAction<IDetailInformation>) => {
        state.loading = false;
        state.detailInformation = action.payload;
      })
      .addCase(fetchDetailInformation.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDetailInformation.fulfilled, (state, action: PayloadAction<string>) => {
        state.detailInformation = state.detailInformation?.id !== action.payload ? state.detailInformation : null;
      });
  },
});


export const DetailInformationReducer = detailInformationSlice.reducer;

