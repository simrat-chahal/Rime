import UserRecords from "./UserRecords";
import UserDetails from "./UserDetails";
import FormFiller from "./Form/FormFiller";
import { Box, Alert } from "@mui/material";
import { addNewUserAPI } from "../apis/apisList";
// console.log(UserRecords)

//redux imports
import { useSelector } from "react-redux";
import AddNewUserButton from "./Form/AddNewUserButton";
import { RootState } from "../Redux/store";
import { useEffect } from "react";
const Main = () => {

  const { userList } = useSelector((state: RootState) => state.usersInfo);
  console.log(Box)
  return (
    <>
      {userList.length ? (
        <>
          <Box className="container">
            <UserRecords />
            <UserDetails />
          </Box>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <AddNewUserButton />
          </Box>
        </>
      ) : (
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
      )}
      <FormFiller />
    </>
  );
};

export default Main;
