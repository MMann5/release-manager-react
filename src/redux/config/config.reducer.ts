export default {
  setConfig: (state: any, action: any) => {
    const { name, value } = action.payload
    state.config = { ...state.config, [name]: value };
  },
};
