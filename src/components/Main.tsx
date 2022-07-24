import { Box, Alert } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";
import AddNewUserButton from "./Form/AddNewUserButton";
import { RootState } from "../Redux/store";
import { useEffect } from "react";
import { getUsers } from "../apis/apisList";
import FullScreenLoader from "./FullScreenLoader";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const { userList, usersFetchingLoader } = useSelector(
    (state: RootState) => state.usersInfo
  );

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (userList.length) {
      navigate("users");
    }
  }, [userList]);

  if (usersFetchingLoader) return <FullScreenLoader />;

  return (
    <>
      <Box
        className="center-element"
        mb={2}
        height="100vh"
        sx={{ backgroundColor: "#a6ab7f" }}
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
