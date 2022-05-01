import { configureStore } from '@reduxjs/toolkit';
import usersInfoReducer from './reducers/usersInfoSlice'

export default configureStore({
  reducer: {
    usersInfo: usersInfoReducer,
  },
});
