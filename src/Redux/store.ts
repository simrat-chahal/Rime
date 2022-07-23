import { configureStore } from '@reduxjs/toolkit';
import usersInfoSlice from './reducers/usersInfoSlice'
import muiModalsSlice from './reducers/muiModalsSlice';
import flashMessageSlice from './reducers/flashMessageSlice';

export const store =  configureStore({
  reducer: {
    usersInfo: usersInfoSlice,
    muiModals: muiModalsSlice,
    flashMessage: flashMessageSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
