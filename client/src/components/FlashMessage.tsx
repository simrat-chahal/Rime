import React from "react";
//mui imports
import { Alert, Snackbar } from "@mui/material";
//redux imports
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
//other imports
import { closeFlashMessage } from "../Redux/reducers/flashMessageSlice";

const FlashMessage = () => {
  const dispatch = useDispatch();
  const flashMessage = useSelector((state: RootState) => state.flashMessage);
  const handleCloser = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeFlashMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={flashMessage.open}
      autoHideDuration={3000}
      onClose={handleCloser}
    >
      <Alert
        severity={flashMessage.messageType}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {flashMessage.message}
      </Alert>
    </Snackbar>
  );
};

export default FlashMessage;
