import { Box } from "@mui/system";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteAllUsers, getUsers } from "../apis/apisList";
import { RootState } from "../Redux/store";
import AddNewUserButton from "./Form/AddNewUserButton";
import FullScreenLoader from "./FullScreenLoader";
import UserRecords from "./UserRecords";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Users = () => {
  const { userList } = useSelector((state: RootState) => state.usersInfo);
  const navigate = useNavigate();

  const usersFetchingLoader = useSelector(
    (state: RootState) => state.loaders.usersFetchingLoader
  );

  useEffect(() => {
    if (!userList.length) {
      getUsers();
    }
  }, []);

  useEffect(() => {
    if (!userList.length) {
      navigate("/");
    }
  }, [userList]);

  if (usersFetchingLoader) return <FullScreenLoader />;

  return (
    <>
      <Box className="container">
        <UserRecords />
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <AddNewUserButton />
        <Button
          color="error"
          sx={{ marginLeft: "10px" }}
          variant="contained"
          onClick={()=>deleteAllUsers({})}
        >
          Delete All
        </Button>
      </Box>
    </>
  );
};

export default Users;
