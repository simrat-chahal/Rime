import { createSlice } from "@reduxjs/toolkit";

type selectedUserDataTS = {
  name: string | undefined;
  age: number | undefined;
  _id: string;
};

type usersInfoSliceTypescript = {
  value: number;
  userList: selectedUserDataTS[];
  selectedUserData: null | selectedUserDataTS;
  editMode: boolean;
};

const iState: usersInfoSliceTypescript = {
  value: 0,
  userList: [],
  selectedUserData: null,
  editMode: false,
};

export const usersInfoslice = createSlice({
  name: "usersInfo",
  initialState: iState,
  reducers: {
    savePeopleList: (state: usersInfoSliceTypescript, action: any) => {
      state.userList = action.payload;
    },
    addUserData: (state: usersInfoSliceTypescript, action: any) => {
      state.userList.push(action.payload);
    },
    saveCurrentUserData: (state: usersInfoSliceTypescript, action: any) => {
      state.selectedUserData = action.payload;
    },
    deleteUserData: (state: usersInfoSliceTypescript, action: any) => {
      const { userList } = state;
      const index = userList.findIndex(
        (item: any) => item._id === action.payload._id
      );
      state.userList.splice(index, 1);
      state.selectedUserData = null;
    },
    updateEditMode: (state: usersInfoSliceTypescript) => {
      state.editMode = !state.editMode;
    },
    updateUserData: (state: usersInfoSliceTypescript, action: any) => {
      const index = state.userList.findIndex(
        (item: any) => item._id === action.payload._id
      );
      state.userList[index] = action.payload;
    }
  },
});

export const {
  savePeopleList,
  addUserData,
  saveCurrentUserData,
  deleteUserData,
  updateEditMode,
  updateUserData,
} = usersInfoslice.actions; //actions
export default usersInfoslice.reducer;
