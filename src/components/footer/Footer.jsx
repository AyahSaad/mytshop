import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import {
  Instagram,
  Pinterest,
  Twitter,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

function Footer() {
  return (
    <Box sx={{ bgcolor: "#111", color: "#fff", pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        {/* Top Section */}
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent={{
            xs: "center",
            sm: "space-around",
            md: "space-between",
          }}
          alignItems={{ xs: "center", sm: "flex-start" }}
          spacing={4}
        >
          {/* Socials */}
          <Box
            sx={{
              minWidth: { xs: "100%", sm: "45%", md: "200px" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {[Instagram, Pinterest, Twitter, Email].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  sx={{
                    border: "1px solid #00bcd4",
                    color: "#00bcd4",
                    p: 1.2,
                    "&:hover": { bgcolor: "#222" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Box>

          {/* Products */}
          <Box
            sx={{
              minWidth: { xs: "100%", sm: "45%", md: "200px" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Our Product
            </Typography>
            <Stack spacing={1}>
              {[
                "All Products",
                "Laptops",
                "Headphones",
                "Smartphones",
                "PlayStation",
                "Smartwatch",
              ].map((item) => (
                <Typography key={item} variant="body2">
                  {item}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Links */}
          <Box
            sx={{
              minWidth: { xs: "100%", sm: "45%", md: "200px" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <Stack spacing={1}>
              {[
                "Terms & Conditions",
                "Privacy Policy",
                "Refund & Return Policy",
              ].map((item) => (
                <Typography key={item} variant="body2">
                  {item}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Site Pages */}
          <Box
            sx={{
              minWidth: { xs: "100%", sm: "45%", md: "200px" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Site Pages
            </Typography>
            <Stack spacing={1}>
              {["Homepage", "About KA Store", "Shop", "Contact Us"].map(
                (item) => (
                  <Typography key={item} variant="body2">
                    {item}
                  </Typography>
                )
              )}
            </Stack>
          </Box>
        </Stack>

        {/* Divider */}
        <Divider sx={{ bgcolor: "#333", my: 4 }} />

        {/* Bottom Row */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", sm: "center" }}
          spacing={3}
          flexWrap="wrap"
        >
          {/* Contact Info */}
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="body2">Sunday to Thursday</Typography>
            <Typography variant="body2" mb={1}>
              09 AM — 07 PM
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ xs: "center", sm: "flex-start" }}
              flexWrap="wrap"
            >
              <IconButton sx={{ color: "#fff", border: "1px solid #555" }}>
                <Phone fontSize="small" />
              </IconButton>
              <IconButton sx={{ color: "#fff", border: "1px solid #555" }}>
                <Email fontSize="small" />
              </IconButton>
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  bgcolor: "#444",
                  "&:hover": { bgcolor: "#666" },
                }}
                startIcon={<LocationOn />}
              >
                Location
              </Button>
            </Stack>
          </Box>

          {/* Copyright */}
          <Typography
            variant="body2"
            color="gray"
            sx={{
              textAlign: { xs: "center", sm: "right" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            KA Store © 2025 | All Rights Reserved
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
