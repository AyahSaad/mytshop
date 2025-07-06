import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Container,
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card
        elevation={3}
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            User Information
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="bold">
                Email:
              </Typography>
              <Typography variant="body2">
                {userInfo?.email || "Not available"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserInfo;
