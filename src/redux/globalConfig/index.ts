import { createSlice } from "@reduxjs/toolkit";
import { REDUCER_NAME } from "../types";
import { initialState } from "./globalConfig.state";
import ConfigReducer from "./globalConfig.reducer";

const ConfigSlice = createSlice({
  name: REDUCER_NAME.GLOBAL_CONFIG,
  initialState,
  reducers: ConfigReducer,
});

export const { setGlobalConfig } = ConfigSlice.actions;

export default ConfigSlice.reducer;
