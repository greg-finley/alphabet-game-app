import { Box, CircularProgress } from "@mui/material";
import * as React from "react";

function LoadingCircle() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "3vh" }}>
      <CircularProgress color="info" />
    </Box>
  );
}
export default LoadingCircle;
