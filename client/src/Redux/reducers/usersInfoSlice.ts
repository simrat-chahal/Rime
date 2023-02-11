import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  value: number;
  userList: selectedUserDataInterface[];
  selectedUserData: null | selectedUserDataInterface;
  editMode: boolean;
}

export interface selectedUserDataInterface {
  name: string | undefined;
  age: number | undefined;
  _id: string;
}

const initialState: initialStateInterface = {
  value: 0,
  userList: [],
  selectedUserData: null,
  editMode: false,
};

export const usersInfoslice = createSlice({
  name: "usersInfo",
  initialState,
  reducers: {
    savePeopleList: (
      state,
      action: PayloadAction<selectedUserDataInterface[]>
    ) => {
      state.userList = action.payload;
    },
    addUserData: (state, action: PayloadAction<selectedUserDataInterface>) => {
      state.userList.push(action.payload);
    },
    saveCurrentUserData: (
      state,
      action: PayloadAction<selectedUserDataInterface>
    ) => {
      state.selectedUserData = action.payload;
    },
    deleteUserData: (
      state,
      action: PayloadAction<selectedUserDataInterface>
    ) => {
      const { userList } = state;
      const index = userList.findIndex(
        (item: any) => item._id === action.payload._id
      );
      state.userList.splice(index, 1);
      state.selectedUserData = null;
    },
    updateEditMode: (state) => {
      state.editMode = !state.editMode;
    },
    updateUserData: (
      state,
      action: PayloadAction<selectedUserDataInterface>
    ) => {
      const index = state.userList.findIndex(
        (item: any) => item._id === action.payload._id
      );
      state.userList[index] = action.payload;
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
} = usersInfoslice.actions; //actions
export default usersInfoslice.reducer;
