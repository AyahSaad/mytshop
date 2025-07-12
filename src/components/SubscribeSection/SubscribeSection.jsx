import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EllipseImage from "../../assets/img/Ellipse.png";

export default function SubscribeSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#9E97E1",
        position: "relative",
        height: "396px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Ellipse background image */}
      <Box
        component="img"
        src={EllipseImage}
        alt="Background curve"
        sx={{
          position: "absolute",
          top: -50,
          left: 0,
          width: "100%",
          height: "auto",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          px: 2,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#312d5f", mb: 2 }}
        >
          Subscribe Don't Miss a Deal
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#312d5f",
            mb: 4,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Sign up for the latest discounts, offers, and shopping trends.
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Subscribed!");
          }}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <TextField
            type="email"
            placeholder="email@example.com"
            required
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              input: {
                fontSize: "1rem",
                padding: "12px",
                color: theme.palette.text.primary,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: "bold",
              fontSize: "1rem",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0px 3px 6px rgba(63, 193, 201, 0.5)",
              "&:hover": {
                backgroundColor: "#2fa7a4",
                boxShadow: "0px 5px 10px rgba(47, 167, 164, 0.7)",
              },
            }}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
