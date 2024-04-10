import { Config } from "../../utils/models";

export type PropertyState = {
  config: Config;
};

export const initialState: PropertyState = {
  config: {
    env: "prod",
    repo: "",
    columns: [],
  },
};
