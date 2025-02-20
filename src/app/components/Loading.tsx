import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      component="div"
      width="100vw"
      height="100vh"
      display="flex"
      position="fixed"
      top="0"
      right="0"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="success" />
    </Box>
  );
}
