import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Container,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";
import Loaderr from "../../components/loader/Loaderr";

const UserInfo = () => {
  const theme = useTheme();

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const { data } = await AxiosAut.get("/Account/userinfo");
      console.log("user info:", data);
      return data;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loaderr />;
  if (isError) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Failed to load user information.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card
        elevation={6}
        sx={{
          borderRadius: 3,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            User Profile
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            {[
              { label: "First Name", value: userInfo?.firstName },
              { label: "Last Name", value: userInfo?.lastName },
              { label: "Username", value: userInfo?.userName },
              { label: "Email", value: userInfo?.email },
              {
                label: "Date of Birth",
                value: userInfo?.birthOfDate
                  ? new Date(userInfo.birthOfDate).toLocaleDateString("en-US")
                  : "Not available",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="medium"
                    color="textSecondary"
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    {item.value || "Not available"}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserInfo;
