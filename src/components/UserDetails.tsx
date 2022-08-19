import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSpecificUser } from "../apis/apisList";
import { RootState } from "../Redux/store";
import { useEffect } from "react";
import FullScreenLoader from "./FullScreenLoader";

//mui imports
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function UserDetails() {
  const params = useParams();
  const { selectedUserData } = useSelector(
    (state: RootState) => state.usersInfo
  );
  const loadingSpecificUser = useSelector(
    (state: RootState) => state.loaders.loadingSpecificUser
  );

  useEffect(() => {
    if (!selectedUserData) {
      getSpecificUser({ _id: params.userId });
    }
  }, [selectedUserData]);

  if (loadingSpecificUser) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <Box>
        <Link to="/users" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
            Users
          </Button>
        </Link>
        <Box style={{ width: "fit-content", margin: "auto" }}>
          {selectedUserData ? (
            <>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Name: ${selectedUserData.name}`}
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Age: ${selectedUserData.age}`}
                  ></ListItemText>
                </ListItem>
              </List>
            </>
          ) : (
            <Typography
              variant="h3"
              sx={{ fontSize: "1.5rem", display: "flex", alignItems: "center" }}
            >
              Sorry! No data is found for given user id.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default UserDetails;
