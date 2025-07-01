import { createTheme } from "@mui/material/styles";

const theme = (mode) =>
  createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
      mode: mode,
    },
  });

export default theme;
