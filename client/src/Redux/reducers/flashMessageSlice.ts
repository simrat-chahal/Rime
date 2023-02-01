import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

interface initialStateInterface {
  open: boolean;
  messageType: AlertColor | undefined;
  message: string;
}

const initialState: initialStateInterface = {
  open: false,
  messageType: undefined,
  message: "",
};

export const flashMessageSlice = createSlice({
  name: "flashMessage",
  initialState,
  reducers: {
    triggerFlashMessage: (state, action: PayloadAction<initialStateInterface>) => {
      return action.payload;
    },
    closeFlashMessage: (state) => {
      // return initialState;
      state.open = false;
    },
  },
});

export const { triggerFlashMessage, closeFlashMessage } =
  flashMessageSlice.actions; //actions
export default flashMessageSlice.reducer;
