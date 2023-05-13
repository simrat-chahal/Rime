import axios, { AxiosError } from "axios";
import { triggerFlashMessage } from "../Redux/reducers/flashMessageSlice";
import { updateLoaderStatus } from "../Redux/reducers/loadersSlice";
import {
  addUserData,
  deleteUserData,
  saveCurrentUserData,
  savePeopleList,
  selectedUserDataInterface,
  updateUserData,
} from "../Redux/reducers/usersInfoSlice";
import { store } from "../Redux/store";

const appUrl = process.env.REACT_APP_API_BASE_URL;

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
  try {
    store.dispatch(
      updateLoaderStatus({
        loaderName: "usersFetchingLoader",
        loaderAction: true,
      })
    );
    const res = await getAPI("users");
    store.dispatch(
      updateLoaderStatus({
        loaderName: "usersFetchingLoader",
        loaderAction: false,
      })
    );
    if (res.data.status) {
      store.dispatch(savePeopleList(res.data.data));
    } else {
      store.dispatch(
        triggerFlashMessage({
          message: "No data is found",
          messageType: "info",
          open: true,
        })
      );
    }
  } catch (error) {
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

export const deleteUser = async (apiData: selectedUserDataInterface) => {
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

export const updateUser = async (apiData: selectedUserDataInterface | any) => {
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
  try {
    store.dispatch(
      updateLoaderStatus({
        loaderName: "loadingSpecificUser",
        loaderAction: true,
      })
    );
    const res: any = await axios
      .get("users", { params: apiData })
      .catch((error: AxiosError) => error);
    store.dispatch(
      updateLoaderStatus({
        loaderName: "loadingSpecificUser",
        loaderAction: false,
      })
    );
    if (res.data.status) {
      store.dispatch(saveCurrentUserData(res.data.data[0]));
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
  } catch (error) {
    store.dispatch(
      triggerFlashMessage({
        message: "Something went wrong",
        messageType: "error",
        open: true,
      })
    );
  }
};
