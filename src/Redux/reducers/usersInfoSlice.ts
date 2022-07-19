import { createSlice } from "@reduxjs/toolkit";

type selectedUserDataTS = {
  name: string;
  age: number;
  date: string;
}

type usersInfoSliceTypescript = {
  value: number,
  userList: object[],
  selectedUserData: null | selectedUserDataTS
}

const iState: usersInfoSliceTypescript = {
  value: 0,
  userList: [],
  // userList: [{name:"rohit",age:"23",date:""},{name:"Elex",age:"14",date:""}],
  selectedUserData: null,
}

export const usersInfoslice = createSlice({
  name: "usersInfo",
  initialState: iState,
  reducers: {
    addUserData: (state: any, action: any) => {
      state.userList.push(action.payload);
    },
    saveCurrentUserData: (state: any, action: any) => {
      state.selectedUserData = action.payload;
    },
    deleteUserData: (state: any) => {
      const { userList, selectedUserData } = state;
      state.userList = userList.filter(
        (item: object) =>
          JSON.stringify(item) !== JSON.stringify(selectedUserData)
      );
      state.selectedUserData = null;
    },
  },
});

export const { addUserData, saveCurrentUserData, deleteUserData } =
  usersInfoslice.actions; //actions
export default usersInfoslice.reducer;
