import { createSlice } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

interface iState {
  open: boolean;
  messageType: AlertColor | undefined;
  message: string;
}

const initialState: iState = {
  open: false,
  messageType: undefined,
  message: "",
};

export const flashMessageSlice = createSlice({
  name: "flashMessage",
  initialState: initialState,
  reducers: {
    triggerFlashMessage: (state: any, { payload }: any) => {
      return payload;
    },
    closeFlashMessage: (state: iState) => {
      // return initialState;
      state.open = false
    },
  },
});

export const { triggerFlashMessage, closeFlashMessage } =
  flashMessageSlice.actions; //actions
export default flashMessageSlice.reducer;
