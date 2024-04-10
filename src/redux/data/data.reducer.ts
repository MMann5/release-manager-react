export default {
  setData: (state: any, action: any) => {
    state.data = action.payload;
  },
  resetData: (state: any) => {
    state.data = [];
  },
  setAllData: (state: any, action: any) => {
    state.allData = action.payload;
  },
};
