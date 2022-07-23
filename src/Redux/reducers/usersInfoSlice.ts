import { createSlice } from "@reduxjs/toolkit";

type selectedUserDataTS = {
  name: string | undefined;
  age: number | undefined;
  id: string;
};

type usersInfoSliceTypescript = {
  value: number;
  userList: object[];
  selectedUserData: null | selectedUserDataTS;
  editMode: boolean;
  usersFetchingLoader: boolean;
};

const iState: usersInfoSliceTypescript = {
  value: 0,
  userList: [],
  // userList: [{name:"rohit",age:"23",date:""},{name:"Elex",age:"14",date:""}],
  selectedUserData: null,
  editMode: false,
  usersFetchingLoader: true,
};

export const usersInfoslice = createSlice({
  name: "usersInfo",
  initialState: iState,
  reducers: {
    savePeopleList: (state: any, action: any) => {
      state.userList = action.payload;
    },
    addUserData: (state: any, action: any) => {
      state.userList.push(action.payload);
    },
    saveCurrentUserData: (state: any, action: any) => {
      state.selectedUserData = action.payload;
    },
    deleteUserData: (state: any, action: any) => {
      const { userList } = state;
      const index = userList.findIndex(
        (item: any) => item.id === action.payload.id
      );
      state.userList.splice(index, 1);
      state.selectedUserData = null;
    },
    updateEditMode: (state: any) => {
      state.editMode = !state.editMode;
    },
    updateUserData: (state: any, action: any) => {
      const index = state.userList.findIndex(
        (item: any) => item.id === action.payload.id
      );
      state.userList[index] = action.payload;
    },
    updateUsersFetchingLoader: (state: any, { payload }: any) => {
      state.usersFetchingLoader = payload;
    },
  },
});

export const {
  savePeopleList,
  addUserData,
  saveCurrentUserData,
  deleteUserData,
  updateEditMode,
  updateUserData,
  updateUsersFetchingLoader,
} = usersInfoslice.actions; //actions
export default usersInfoslice.reducer;
