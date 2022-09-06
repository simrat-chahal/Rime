import axios from "axios";
import { triggerFlashMessage } from "../Redux/reducers/flashMessageSlice";
import { updateLoaderStatus } from "../Redux/reducers/loadersSlice";
import {
  addUserData,
  deleteUserData,
  saveCurrentUserData,
  savePeopleList,
  updateUserData,
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
  store.dispatch(
    updateLoaderStatus({
      loaderType: "usersFetchingLoader",
      loaderAction: true,
    })
  );
  const res = await getAPI("users");
  if (res?.data) {
    store.dispatch(
      updateLoaderStatus({
        loaderType: "usersFetchingLoader",
        loaderAction: false,
      })
    );
    if (res.data.status) {
      store.dispatch(savePeopleList(res.data.data));
    }
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
  const res = await postAPI("add-user", apiData);
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
  const res = await deleteAPI("delete-user", apiData);
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

export const deleteAllUsers = async (apiData: object) => {
  const res = await deleteAPI("delete-all", apiData);
  if (res?.data?.status) {
    store.dispatch(savePeopleList([]));
    store.dispatch(
      triggerFlashMessage({
        message: "All users are deleted successfully",
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
  const res = await putAPI("update-user-data", apiData);
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
  store.dispatch(
    updateLoaderStatus({
      loaderType: "loadingSpecificUser",
      loaderAction: true,
    })
  );
  const res = await axios.get("users", { params: apiData });
  if (res?.data) {
    store.dispatch(
      updateLoaderStatus({
        loaderType: "loadingSpecificUser",
        loaderAction: false,
      })
    );
    if (res.data.status) {
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
          message: "Given user is not found",
          messageType: "info",
          open: true,
        })
      );
    }
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
