import UserRecords from "./UserRecords";
import UserDetails from "./UserDetails";
import FormFiller from "./Form/FormFiller";
import { Box, Alert } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";
import AddNewUserButton from "./Form/AddNewUserButton";
const Main = () => {
  const { userList } = useSelector((state: any) => state.usersInfo);
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
