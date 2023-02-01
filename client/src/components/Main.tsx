import { Box, Alert } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";
import AddNewUserButton from "./Form/AddNewUserButton";
import { RootState } from "../Redux/store";
import { useEffect } from "react";
import FullScreenLoader from "./FullScreenLoader";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../apis/usersApi";
import { useDispatch } from "react-redux";
import { savePeopleList } from "../Redux/reducers/usersInfoSlice";
import { triggerFlashMessage } from "../Redux/reducers/flashMessageSlice";

const Main = () => {
  const navigate = useNavigate();
  const { userList } = useSelector((state: RootState) => state.usersInfo);
  const dispatch = useDispatch();
  const getUsersResponse = useGetUsersQuery();

  useEffect(() => {
    if (getUsersResponse.isSuccess) {
      if (getUsersResponse.data.status) {
        dispatch(savePeopleList(getUsersResponse.data.data));
      } else {
        dispatch(
          triggerFlashMessage({
            message: "No data is found",
            messageType: "info",
            open: true,
          })
        );
      }
    }
  }, [getUsersResponse.isSuccess]);

  useEffect(() => {
    getUsersResponse.isError &&
      dispatch(
        triggerFlashMessage({
          message: "Something went wrong",
          messageType: "error",
          open: true,
        })
      );
  }, [getUsersResponse.isError]);

  useEffect(() => {
    if (userList.length) {
      navigate("users");
    }
  }, [userList]);

  if (getUsersResponse.isLoading) return <FullScreenLoader />;

  return (
    <>
      <Box
        className="center-element"
        mb={2}
        height="100vh"
        sx={{ backgroundColor: "#3b3c32" }}
      >
        <Alert variant="filled" severity="info" sx={{ marginBottom: "14px" }}>
          Sorry! No Data is found.
        </Alert>
        <AddNewUserButton />
      </Box>
    </>
  );
};

export default Main;
