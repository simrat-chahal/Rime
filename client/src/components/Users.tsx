import { useEffect } from "react";
//mui imports
import { Box } from "@mui/system";
import { Button } from "@mui/material";
//redux imports
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
//other imports
import NoUsersData from "./NoUsersData";
import UserRecords from "./UserRecords";
import AddNewUserButton from "./Form/AddNewUserButton";
import FullScreenLoader from "./FullScreenLoader";
import { deleteAllUsers, getUsers } from "../apis/apisList";

const Users = () => {
  const { userList } = useSelector((state: RootState) => state.usersInfo);

  const usersFetchingLoader = useSelector(
    (state: RootState) => state.loaders.usersFetchingLoader
  );

  useEffect(() => {
    getUsers();
  }, []);

  if (usersFetchingLoader) return <FullScreenLoader />;
  if (!userList.length) return <NoUsersData />;

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
          onClick={() => deleteAllUsers({})}
        >
          Delete All
        </Button>
      </Box>
    </>
  );
};

export default Users;
