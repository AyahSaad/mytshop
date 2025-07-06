import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";
import Loaderr from "../../components/loader/Loaderr";

const UserOrders = () => {
  const [OrderId, setOrderId] = useState(null);
  const theme = useTheme();

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const { data } = await AxiosAut.get("/Orders");
      return data;
    },
    retry: 2,
    staleTime: 10000,
  });

  if (isLoading) return <Loaderr />;
  if (isError) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Failed to load Orders.
      </Typography>
    );
  }

  const toggleDetails = (id) => {
    setOrderId(OrderId === id ? null : id);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 4 } }}>
      <Card
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            Orders
          </Typography>

          <Divider sx={{ my: 2 }} />

          {orders.length === 0 ? (
            <Typography>No orders found.</Typography>
          ) : (
            orders.map((order) => (
              <Box key={order.id} sx={{ mb: 3 }}>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Order #{order.id}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="body2"
                      color={theme.palette.text.secondary}
                    >
                      {new Date(order.orderDate).toLocaleDateString("en-US")}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="body2"
                      color={theme.palette.text.secondary}
                    >
                      Status: {order.orderStatus}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => toggleDetails(order.id)}
                      sx={{
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        ":hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      {OrderId === order.id ? "Hide Details" : "Details"}
                    </Button>
                  </Grid>
                </Grid>

                {OrderId === order.id && (
                  <Box
                    sx={{
                      pl: { xs: 1, sm: 2 },
                      pt: 1,
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      mt: 1,
                    }}
                  >
                    <Typography variant="body2" mb={1}>
                      Total Price: ${order.totalPrice.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={theme.palette.text.secondary}
                    >
                      Shipped Date:{" "}
                      {new Date(order.shippedDate).toLocaleDateString("en-US")}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserOrders;
