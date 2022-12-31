import { Box, CircularProgress } from "@mui/material";
import * as React from "react";

function LoadingCircle() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="info" />
    </Box>
  );
}
export default LoadingCircle;
