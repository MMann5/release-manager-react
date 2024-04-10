import { createSlice } from "@reduxjs/toolkit";
import { REDUCER_NAME } from "../types";
import { initialState } from "./config.state";
import ConfigReducer from "./config.reducer";

const ConfigSlice = createSlice({
  name: REDUCER_NAME.CONFIG,
  initialState,
  reducers: ConfigReducer,
});

export const { setConfig } = ConfigSlice.actions;

export default ConfigSlice.reducer;
