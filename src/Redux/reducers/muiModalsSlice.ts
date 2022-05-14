import { createSlice } from '@reduxjs/toolkit';

export const muiModalsSlice = createSlice({
  name: 'muiModals',
  initialState: {
    userAddModal: false,
  },
  reducers: {
    updateModalStatus:(state: any, action: any) => {
        state[action.payload] = !state[action.payload]
    }
  },
});

export const { updateModalStatus } = muiModalsSlice.actions;  //actions
export default muiModalsSlice.reducer;