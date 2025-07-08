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
  const [orderId, setOrderId] = useState(null);
  const theme = useTheme();

  // Fetch all orders
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

  // Fetch selected order details
  const {
    data: selectedOrderDetails,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
  } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: async () => {
      const { data } = await AxiosAut.get(`/Orders/${orderId}`);
      console.log("Order Details for ID", orderId, data);
      return data;
    },
    enabled: !!orderId,
    staleTime: 10000,
  });

  const toggleDetails = (id) => {
    setOrderId((prev) => (prev === id ? null : id));
  };

  if (isLoading) return <Loaderr />;
  if (isError) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Failed to load Orders.
      </Typography>
    );
  }

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
                      {orderId === order.id ? "Hide Details" : "Details"}
                    </Button>
                  </Grid>
                </Grid>

                {orderId === order.id && (
                  <Box
                    sx={{
                      pl: { xs: 1, sm: 2 },
                      pt: 1,
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      mt: 1,
                    }}
                  >
                    {isLoadingDetails ? (
                      <Typography>Loading details...</Typography>
                    ) : isErrorDetails ? (
                      <Typography color="error">
                        Failed to load order details.
                      </Typography>
                    ) : selectedOrderDetails ? (
                      <>
                        <Typography variant="body2" mb={1}>
                          <strong>Total Price:</strong> $
                          {selectedOrderDetails.totalPrice.toFixed(2)}
                        </Typography>

                        <Typography variant="body2" mb={1}>
                          <strong>Payment Method:</strong>{" "}
                          {selectedOrderDetails.paymentMethodType}
                        </Typography>

                        <Typography variant="body2" mb={1}>
                          <strong>Order Date:</strong>{" "}
                          {new Date(
                            selectedOrderDetails.orderDate
                          ).toLocaleString("en-US")}
                        </Typography>

                        <Typography variant="body2" mb={1}>
                          <strong>Shipped Date:</strong>{" "}
                          {selectedOrderDetails.shippedDate.startsWith("0001")
                            ? "Not shipped yet"
                            : new Date(
                                selectedOrderDetails.shippedDate
                              ).toLocaleDateString("en-US")}
                        </Typography>

                        <Typography variant="body2" mb={1}>
                          <strong>Tracking Number:</strong>{" "}
                          {selectedOrderDetails.trackingNumber || "N/A"}
                        </Typography>

                        <Typography variant="body2" mb={1}>
                          <strong>Carrier:</strong>{" "}
                          {selectedOrderDetails.carrier || "N/A"}
                        </Typography>

                        <Typography variant="body2" mt={2} fontWeight="bold">
                          Products:
                        </Typography>

                        {selectedOrderDetails.items.map((item, idx) => (
                          <Box key={idx} sx={{ ml: 2, mt: 1 }}>
                            <Typography variant="body2">
                              • {item.productName} — $
                              {item.totalPrice.toFixed(2)}
                            </Typography>
                            {item.note && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Note: {item.note}
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </>
                    ) : null}
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
