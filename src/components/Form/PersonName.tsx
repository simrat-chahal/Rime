import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const PersonName = ({errorStatus, data, multiInputHandler}:any) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          component="span"
          sx={{
            color: "#d32f2f",
            visibility: errorStatus.name ? "initial" : "hidden",
          }}
        >
          {errorStatus.name ? errorStatus.name : "No Error"}
        </Box>
      </Box>
      <TextField
        id="outlined-basic"
        label="Name"
        name="userName"
        variant="outlined"
        margin="normal"
        autoFocus={true}
        value={data.name}
        error={errorStatus.name ? true : false}
        onChange={(e: any) => multiInputHandler(e)}
        sx={{ marginTop: "0px", marginBottom: "10px" }}
      />
    </>
  );
};

export default PersonName
