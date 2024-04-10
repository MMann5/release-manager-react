import { createSlice } from "@reduxjs/toolkit";
import { REDUCER_NAME } from "../types";
import { initialState } from "./data.state";
import ConfigReducer from "./data.reducer";

const ConfigSlice = createSlice({
  name: REDUCER_NAME.DATA,
  initialState,
  reducers: ConfigReducer,
});

export const { setData, resetData, setAllData } = ConfigSlice.actions;

export default ConfigSlice.reducer;
