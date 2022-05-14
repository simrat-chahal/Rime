import { configureStore } from '@reduxjs/toolkit';
import usersInfoSlice from './reducers/usersInfoSlice'
import muiModalsSlice from './reducers/muiModalsSlice';

export default configureStore({
  reducer: {
    usersInfo: usersInfoSlice,
    muiModals: muiModalsSlice
  },
});
