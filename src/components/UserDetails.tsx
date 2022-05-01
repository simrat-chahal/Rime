import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

//mui imports
import { CircularProgress, Box } from "@mui/material";

export default function UserDetails() {
  const { selectedUserData, userList } = useSelector(
    (state: any) => state.usersInfo
  );
  return (
    <>
      <Box className="user-details">
        {selectedUserData ? (
          <List>
            {Object.keys(selectedUserData).map(
              (item: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item}==>${selectedUserData[item]}`}
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
            Data is not available
          </Typography>
        )}
      </Box>
    </>
  );
}
