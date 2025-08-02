import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Add, Remove, Delete, FavoriteBorder } from "@mui/icons-material";
import Loaderr from "../../components/loader/Loaderr";
import { Link } from "react-router-dom";
import AxiosAut from "../../api/AxiosAut";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function Cart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const { data } = await AxiosAut.get("/Carts");
      return data;
    },
    staleTime: 6000,
    refetchOnWindowFocus: true,
  });

  const increaseQty = useMutation({
    mutationFn: (id) => AxiosAut.patch(`/Carts/increaseCount/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["cartItems"]),
  });

  const decreaseQty = useMutation({
    mutationFn: (id) => AxiosAut.patch(`/Carts/decreaseCount/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["cartItems"]),
  });

  const deleteItem = useMutation({
    mutationFn: (id) => AxiosAut.delete(`/Carts/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["cartItems"]),
  });

  const clearCart = useMutation({
    mutationFn: () => AxiosAut.delete("/Carts/clearCart"),
    onSuccess: () => queryClient.invalidateQueries(["cartItems"]),
  });

  if (isError) {
    console.error("Cart Load Error:", error.response?.data || error);
    return <Typography>Error loading cart</Typography>;
  }

  if (isLoading) return <Loaderr />;

  const products = data.cartResponse || [];
  const subtotal = products.reduce(
    (sum, item) => sum + item.count * item.price,
    0
  );
  const delivery = 20;
  const vat = 10;
  const discount = -100;
  const total = subtotal + delivery + vat + discount;

  return (
    <Box p={isMobile ? 2 : 4}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        color="text.primary"
      >
        Cart
      </Typography>

      <Grid container spacing={4} direction={isMobile ? "column" : "row"}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {products.length === 0 ? (
            <Box textAlign="center" mt={5}>
              <Typography variant="h6" color="text.secondary" fontWeight="bold">
                <span style={{ fontSize: "2rem" }}>🛒</span> Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1}>
                Looks like you haven’t added anything yet. Let’s Shop now!
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": { backgroundColor: "#3dbfc7" },
                }}
                component={Link}
                to="/"
              >
                SHOP NOW
              </Button>
            </Box>
          ) : (
            <>
              {products.map((product) => (
                <Card
                  key={product.id}
                  sx={{
                    display: "flex",
                    mb: 2,
                    p: 2,
                    flexDirection: isMobile ? "column" : "row",
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://placehold.co/200x150"
                    alt={product.name}
                    sx={{
                      width: isMobile ? "100%" : 140,
                      height: isMobile ? 140 : "auto",
                      borderRadius: 2,
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      mt={1}
                      color="text.primary"
                    >
                      ${product.price}
                    </Typography>
                  </CardContent>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    justifyContent="center"
                    flexWrap="wrap"
                    p={1}
                  >
                    <IconButton
                      onClick={() => decreaseQty.mutate(product.id)}
                      color="primary"
                    >
                      <Remove />
                    </IconButton>
                    <Typography color="text.primary">
                      {product.count}
                    </Typography>
                    <IconButton
                      onClick={() => increaseQty.mutate(product.id)}
                      color="primary"
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteItem.mutate(product.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                    <IconButton>
                      <FavoriteBorder
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </IconButton>
                  </Box>
                </Card>
              ))}

              <Button
                variant="contained"
                color="info"
                sx={{
                  mt: 2,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": { backgroundColor: "#3dbfc7" },
                }}
                onClick={clearCart.mutate}
              >
                CLEAR ALL
              </Button>
            </>
          )}
        </Grid>

        {/*  Order Summary */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              p: 3,
              boxShadow: 1,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: products.length === 0 ? "center" : "flex-start",
              alignItems: "center",
            }}
          >
            {products.length === 0 ? (
              <Typography variant="h6" color="text.secondary" fontWeight="bold">
                Your Summary is empty
              </Typography>
            ) : (
              <>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  alignSelf="flex-start"
                  mb={2}
                  color="text.primary"
                >
                  Order Summary
                </Typography>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  mb={1}
                >
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography color="text.primary">
                    {subtotal.toFixed(2).replace(".", ",")}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  mb={1}
                >
                  <Typography color="text.secondary">
                    Delivery Charges
                  </Typography>
                  <Typography color="text.primary">
                    {delivery.toFixed(2).replace(".", ",")}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  mb={1}
                >
                  <Typography color="text.secondary">V.A.T</Typography>
                  <Typography color="text.primary">
                    {vat.toFixed(2).replace(".", ",")}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  mb={1}
                >
                  <Typography color="text.secondary">Discount</Typography>
                  <Typography color="error">
                    {discount.toFixed(2).replace(".", ",")}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2, width: "100%" }} />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  mb={2}
                >
                  <Typography variant="h6" color="text.primary">
                    Total
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {total.toFixed(0)}$
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  component={Link}
                  to="/checkout"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": { backgroundColor: "#3dbfc7" },
                  }}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
