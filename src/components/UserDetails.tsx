import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//mui imports
import { Box } from "@mui/material";
import { RootState } from "../Redux/store";
import { useEffect } from "react";
import { getSpecificUser } from "../apis/apisList";

function UserDetails() {
  const params = useParams()
  const { selectedUserData } = useSelector(
    (state: RootState) => state.usersInfo
  );

  useEffect(()=>{
    if(!selectedUserData) {
      getSpecificUser({id: params.userId})
    }
  },[selectedUserData])

  return (
    <>
      <Box className="user-details">
        {selectedUserData ? (
          <List>
            {Object.keys(selectedUserData).map(
              (item: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item}==>${(selectedUserData as any)[item]}`}
                  ></ListItemText>
                </ListItem>
              )
            )}
          </List>
        ) : (
          <Typography
            variant="h3"
            sx={{ fontSize: "1.5rem", display: "flex", alignItems: "center" }}
          >
            Sorry! Data is not found for given user id.
          </Typography>
        )}
      </Box>
    </>
  );
}

export default UserDetails
