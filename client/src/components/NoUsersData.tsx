//mui imports
import { Alert } from "@mui/material";
import { Box } from "@mui/system";
//other imports
import AddNewUserButton from "./Form/AddNewUserButton";

const NoUsersData = () => {
  return (
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
  );
};

export default NoUsersData;
