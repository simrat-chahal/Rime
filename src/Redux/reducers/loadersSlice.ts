import { createSlice } from "@reduxjs/toolkit";

interface iState {
  loadingSpecificUser: boolean;
  usersFetchingLoader: boolean;
}

type payloadTypes = {
  loaderType: string;
  loaderAction: boolean;
};

interface action {
  payload: payloadTypes;
}

const initialState: iState = {
  loadingSpecificUser: false,
  usersFetchingLoader: false,
};

export const loadersSlice = createSlice({
  name: "loaders",
  initialState: initialState,
  reducers: {
    updateLoaderStatus: (state: iState, action: action) => {
      const { payload } = action;
      (state as any)[payload.loaderType] = payload.loaderAction;
    }
  },
});

export const { updateLoaderStatus } = loadersSlice.actions; //actions
export default loadersSlice.reducer;
