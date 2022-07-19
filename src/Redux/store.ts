import { configureStore } from '@reduxjs/toolkit';
import usersInfoSlice from './reducers/usersInfoSlice'
import muiModalsSlice from './reducers/muiModalsSlice';

export const store =  configureStore({
  reducer: {
    usersInfo: usersInfoSlice,
    muiModals: muiModalsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
