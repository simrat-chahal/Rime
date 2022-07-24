import { Box } from "@mui/system";
import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUsers } from "../apis/apisList";
import { RootState } from "../Redux/store";
import AddNewUserButton from "./Form/AddNewUserButton";
import UserRecords from "./UserRecords";

const Users = () => {
  const { userList } = useSelector(
    (state: RootState) => state.usersInfo
  );

  useEffect(()=>{
    if(!userList.length) {
      getUsers();
    }
  },[])

  return (
    <>
      <Box className="container">
        <UserRecords />
        {/* <UserDetails /> */}
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <AddNewUserButton />
      </Box>
      {/* <Outlet /> */}
    </>
  );
};

export default Users;
