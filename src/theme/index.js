import { createTheme } from "@mui/material/styles";

const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#4fc4ca",
        contrastText: mode === "dark" ? "#fff" : "#312d5f",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",
        paper: mode === "dark" ? "#1e1e1e" : "#fff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
        secondary: mode === "dark" ? "#bbbbbb" : "#555555",
      },
    },
  });

export default theme;
