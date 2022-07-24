import axios from "axios";
import { triggerFlashMessage } from "../Redux/reducers/flashMessageSlice";
import {
  addUserData,
  deleteUserData,
  saveCurrentUserData,
  savePeopleList,
  updateUserData,
  updateUsersFetchingLoader,
} from "../Redux/reducers/usersInfoSlice";
import { store } from "../Redux/store";

const appUrl = "http://localhost:5000/";

const getAPI = (apiUrl: string) => {
  return axios
    .get(`${appUrl}${apiUrl}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

const postAPI = (apiUrl: string, apiData: object) => {
  return axios
    .post(`${appUrl}${apiUrl}`, apiData)
    .then((res) => res)
    .catch((err) => err);
};

const deleteAPI = (apiUrl: string, apiData: object) => {
  return axios
    .delete(`${appUrl}${apiUrl}`, { data: apiData })
    .then((res) => res)
    .catch((res) => res);
};

const putAPI = (apiUrl: string, apiData: object) => {
  return axios
    .put(`${appUrl}${apiUrl}`, apiData)
    .then((res) => res)
    .catch((error) => error);
};

export const getUsers = async () => {
  const res = await getAPI("users");
  if (res?.data?.status) {
    store.dispatch(savePeopleList(res.data.data));
    store.dispatch(updateUsersFetchingLoader(false))
  } else {
    store.dispatch(
      triggerFlashMessage({
        message: "Something went wrong",
        messageType: "error",
        open: true,
      })
    );
  }
};

export const addNewUser = async (apiData: object) => {
  const res = await postAPI("addUser", apiData);
  if (res?.data?.status) {
    store.dispatch(addUserData(res.data.data));
    store.dispatch(
      triggerFlashMessage({
        message: "User is added successfully",
        messageType: "success",
        open: true,
      })
    );
  } else {
    store.dispatch(
      triggerFlashMessage({
        message: "Something went wrong",
        messageType: "error",
        open: true,
      })
    );
  }
};

export const deleteUser = async (apiData: object) => {
  const res = await deleteAPI("removeUser", apiData);
  if (res?.data?.status) {
    store.dispatch(deleteUserData(apiData));
    store.dispatch(
      triggerFlashMessage({
        message: "User is deleted successfully",
        messageType: "success",
        open: true,
      })
    );
  } else {
    store.dispatch(
      triggerFlashMessage({
        message: "Something went wrong",
        messageType: "error",
        open: true,
      })
    );
  }
};

export const updateUser = async (apiData: object) => {
  const res = await putAPI("updateUserData", apiData);
  if (res?.data?.status) {
    store.dispatch(updateUserData(apiData));
    store.dispatch(
      triggerFlashMessage({
        message: "User is updated successfully",
        messageType: "success",
        open: true,
      })
    );
  } else {
    store.dispatch(
      triggerFlashMessage({
        message: "Something went wrong",
        messageType: "error",
        open: true,
      })
    );
  }
};

export const getSpecificUser = async (apiData: object) => {
  // const res = await postAPI("users", apiData);
  const res = await axios.get('users', { params: apiData });
  if (res?.data?.status) {
    console.log("api response",res)
    store.dispatch(saveCurrentUserData(res.data.data));
    store.dispatch(
      triggerFlashMessage({
        message: "Got specific user",
        messageType: "success",
        open: true,
      })
    );
  } else {
    store.dispatch(
      triggerFlashMessage({
        message: "Something went wrong",
        messageType: "error",
        open: true,
      })
    );
  }
};
