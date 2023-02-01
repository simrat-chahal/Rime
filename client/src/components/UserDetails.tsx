import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useEffect } from "react";
import FullScreenLoader from "./FullScreenLoader";
import { useNavigate, useParams } from "react-router-dom";

//mui imports
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useGetSpecificUserQuery } from "../apis/usersApi";
import { triggerFlashMessage } from "../Redux/reducers/flashMessageSlice";
import { saveCurrentUserData } from "../Redux/reducers/usersInfoSlice";
import { useDispatch } from "react-redux";

function UserDetails() {
  const params = useParams();
  const getSpecificUserResponse = useGetSpecificUserQuery({ _id: params.userId });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedUserData = useSelector(
    (state: RootState) => state.usersInfo.selectedUserData
  );

  useEffect(() => {
    if (getSpecificUserResponse.isSuccess) {
      if (getSpecificUserResponse.data.status) {
        dispatch(saveCurrentUserData(getSpecificUserResponse.data.data[0]));
        dispatch(
          triggerFlashMessage({
            message: "Got specific user",
            messageType: "success",
            open: true,
          })
        );
      } else {
        dispatch(
          triggerFlashMessage({
            message: "Given user is not found",
            messageType: "info",
            open: true,
          })
        );
      }
    }
  }, [getSpecificUserResponse.isSuccess]);

  if (getSpecificUserResponse.isLoading) {
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
