import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// import { persistReducer, persistStore } from "redux-persist";
// import { reduxStorage } from "./utils/storage";
import { REDUCER_NAME } from "./redux/types";
import config from "./redux/config";
import globalConfig from "./redux/globalConfig";
import data from "./redux/data";

const reducers = combineReducers({
  [REDUCER_NAME.CONFIG]: config,
  [REDUCER_NAME.GLOBAL_CONFIG]: globalConfig,
  [REDUCER_NAME.DATA]: data,
});

const middlewares = [];

const { logger }: { logger: any } = require(`redux-logger`);
middlewares.push(logger);

const store = configureStore({
  reducer: reducers,
});
export { store };
