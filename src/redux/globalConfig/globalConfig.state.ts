import { GlobalConfig } from "../../utils/models";

export type PropertyState = {
  globalConfig: GlobalConfig;
};

export const initialState: PropertyState = {
  globalConfig: {} as GlobalConfig,
};
