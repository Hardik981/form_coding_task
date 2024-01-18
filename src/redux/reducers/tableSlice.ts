import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: any=[];

export const tableSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<any>) => {
        state.push(action.payload);
    }
  },
});

// Action creators are generated for each case reducer function
export const { addData } = tableSlice.actions;

export default tableSlice.reducer;