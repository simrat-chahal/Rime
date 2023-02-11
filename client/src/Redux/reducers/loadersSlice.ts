import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from '@reduxjs/toolkit/query'

interface initialStateInterface {
  loadingSpecificUser: boolean;
  usersFetchingLoader: boolean;
}

interface payloadInterface {
  loaderName: string;
  loaderAction: boolean;
}

const initialState: initialStateInterface = {
  loadingSpecificUser: false,
  usersFetchingLoader: false,
};

export const loadersSlice = createSlice({
  name: "loaders",
  initialState,
  reducers: {
    updateLoaderStatus: (state, action: PayloadAction<payloadInterface>) => {
      const { payload } = action;
      (state as any)[payload.loaderName] = payload.loaderAction;
    },
  },
});

export const { updateLoaderStatus } = loadersSlice.actions; //actions
export default loadersSlice.reducer;
