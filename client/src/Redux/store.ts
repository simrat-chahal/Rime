import { configureStore } from "@reduxjs/toolkit";
import usersInfoReducer from "./reducers/usersInfoSlice";
import muiModalsReducer from "./reducers/muiModalsSlice";
import flashMessageReducer from "./reducers/flashMessageSlice";
import loadersReducer from "./reducers/loadersSlice";

export const store = configureStore({
  reducer: {
    usersInfo: usersInfoReducer,
    muiModals: muiModalsReducer,
    flashMessage: flashMessageReducer,
    loaders: loadersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
