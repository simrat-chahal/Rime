import { useEffect } from "react";
//mui imports
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
//redux imports
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
//other imports
import { getSpecificUser } from "../apis/apisList";
import FullScreenLoader from "./FullScreenLoader";
import { useNavigate, useParams } from "react-router-dom";

function UserDetails() {
  const params = useParams();
  const navigate = useNavigate();
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
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => navigate("/users")}
        >
          Users
        </Button>
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