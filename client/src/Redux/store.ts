import { configureStore } from "@reduxjs/toolkit";
import usersInfoReducer from "./reducers/usersInfoSlice";
import muiModalsReducer from "./reducers/muiModalsSlice";
import flashMessageReducer from "./reducers/flashMessageSlice";
import loadersReducer from "./reducers/loadersSlice";
import { usersApi } from "../apis/usersApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    usersInfo: usersInfoReducer,
    muiModals: muiModalsReducer,
    flashMessage: flashMessageReducer,
    loaders: loadersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
