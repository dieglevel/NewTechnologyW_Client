// idbSlice.ts
import { IDBManager } from "@/lib/idb";
import { IDetailInformation } from "@/types/implement";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";



const storeName = "myDetailInformation"; // Tên store trong IndexedDB
const thunkDB = "idb/"
const thunkName = "DetailInformation";

const thunkAction = {
  fetch: "fetch",
  set: "set",
  delete: "delete",
  init: "init",
}

const idb = new IDBManager<IDetailInformation>(storeName);


export const fetchDetailInformation = createAsyncThunk(`${thunkDB}${thunkAction.fetch}${thunkName}`, async (): Promise<IDetailInformation> => {
  const detailInformations = await idb.getAll();
  console.log("DetailInformation DB: ", detailInformations);
  return detailInformations[0] || null;
});

export const setDetailInformation = createAsyncThunk(`${thunkDB}${thunkAction.set}${thunkName}`, async (detailInformation: IDetailInformation) => {
  await idb.update(detailInformation);
  return detailInformation;
});

export const deleteDetailInformation = createAsyncThunk(`${thunkDB}${thunkAction.delete}${thunkName}`, async (id: string) => {
  await idb.delete(id);
  return id;
});

export const initDetailInformation = createAsyncThunk(`${thunkDB}${thunkAction.init}${thunkName}`, async (detailInformation: IDetailInformation) => {
  const data: IDetailInformation[] = [
    detailInformation
  ]
  await idb.initData(data);
  return detailInformation;
});

interface state {
  detailInformation: IDetailInformation | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: state = {
  detailInformation: null,
  status: "idle",
};

const detailInformationSlice = createSlice({
  name: "detail-information",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailInformation.fulfilled, (state, action: PayloadAction<IDetailInformation>) => {
        state.status = "succeeded";
        state.detailInformation = action.payload;
      })
      .addCase(fetchDetailInformation.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(setDetailInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setDetailInformation.fulfilled, (state, action: PayloadAction<IDetailInformation>) => {
        state.status = "succeeded";
        state.detailInformation = action.payload;
      })
      .addCase(setDetailInformation.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(deleteDetailInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDetailInformation.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        if (state.detailInformation && state.detailInformation.id === action.payload) {
          state.detailInformation = null;
        }
      })
      .addCase(deleteDetailInformation.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(initDetailInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initDetailInformation.fulfilled, (state, action: PayloadAction<IDetailInformation>) => {
        state.status = "succeeded";
        state.detailInformation = action.payload;
      })
      .addCase(initDetailInformation.rejected, (state) => {
        state.status = "failed";
      });


  },
});


export const DetailInformationReducer = detailInformationSlice.reducer;

