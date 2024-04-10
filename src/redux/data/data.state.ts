import { Data } from "../../utils/models";

export type PropertyState = {
  data: Data[];
  allData: any;
};

export const initialState: PropertyState = {
  data: [] as Data[],
  allData: {},
};
