import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const PersonAge = ({ errorStatus, data, multiInputHandler }: any) => {
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
            visibility: errorStatus.age ? "initial" : "hidden",
          }}
        >
          {errorStatus.age ? errorStatus.age : "No Error"}
        </Box>
      </Box>
      <TextField
        id="outlined-basic"
        name="age"
        label="Age"
        variant="outlined"
        margin="normal"
        value={data.age}
        error={errorStatus.age ? true : false}
        onChange={(e: any) => multiInputHandler(e)}
        sx={{ marginTop: "0px", marginBottom: "10px" }}
      />
    </>
  );
};

export default PersonAge;
