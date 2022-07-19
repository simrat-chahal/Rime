import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";

//mui imports
import { Box } from "@mui/material";
import { RootState } from "../Redux/store";

export default function UserDetails() {
  const { selectedUserData } = useSelector(
    (state: RootState) => state.usersInfo
  );
  return (
    <>
      <Box className="user-details">
        {selectedUserData ? (
          <List>
            {Object.keys(selectedUserData).map(
              (item: string, index: number) => (
                <ListItem key={index}>
                  {/* <ListItemText
                    primary={`${item}==>${selectedUserData[item]}`}
                  ></ListItemText> */}
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
