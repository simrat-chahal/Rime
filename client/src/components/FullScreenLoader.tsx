import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default FullScreenLoader;
