import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'usersInfo',
  initialState: {
    value: 0,
    // userList: [],
    userList: [{name:"rohit",age:"23",date:""},{name:"Elex",age:"14",date:""}],
    selectedUserData: null
  },
  reducers: {
    addUserData: (state:any,action:any) => {
      state.userList.push(action.payload)
    },
    saveCurrentUserData: (state:any, action: any) => {
      state.selectedUserData = action.payload
    },
    deleteUserData: (state: any) => {
      const { userList, selectedUserData } = state
      state.userList = userList.filter((item:object)=>JSON.stringify(item)!==JSON.stringify(selectedUserData))
      state.selectedUserData = null
    }
  },
});

export const { addUserData, saveCurrentUserData, deleteUserData } = slice.actions;  //actions
export default slice.reducer;
