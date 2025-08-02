import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";

function About() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        pt: { xs: 4, sm: 6, md: 8 }, // responsive top padding
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        fontWeight={700}
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "3rem",
            md: "3rem",
          },
        }}
      >
        Coming Soon!
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        mb={4}
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1rem",
            md: "1rem",
          },
        }}
      >
        We're working hard to bring you something amazing. Stay tuned!
      </Typography>

      <Box
        component="img"
        src="https://cdn-icons-png.flaticon.com/512/565/565547.png"
        alt="Coming Soon"
        sx={{
          width: {
            xs: 100,
            sm: 130,
            md: 150,
          },
          mb: 4,
          opacity: 0.6,
        }}
      />

      <Button variant="contained" color="primary" href="/" size="large">
        Go Back Home
      </Button>
    </Container>
  );
}

export default About;
