import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  userAddModal: boolean;
}

type modalNameType = "userAddModal";

const initialState: initialStateInterface = {
  userAddModal: false,
};

export const muiModalsSlice = createSlice({
  name: "muiModals",
  initialState,
  reducers: {
    updateModalStatus: (state: any, action: PayloadAction<modalNameType>) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { updateModalStatus } = muiModalsSlice.actions; //actions
export default muiModalsSlice.reducer;
