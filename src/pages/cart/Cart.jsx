import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import Loaderr from "../../components/loader/Loaderr";
import { Link } from "react-router-dom";
import AxiosAut from "../../api/AxiosAut";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function Cart() {
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
  const totalItems = products.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = products.reduce(
    (sum, item) => sum + item.count * item.price,
    0
  );
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 8 }}>
          {data.cartResponse.map((product) => (
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                p: 2,
                mb: 2,
              }}
              key={product.id}
            >
              <CardMedia
                component="img"
                image="https://placehold.co/100"
                alt=""
                sx={{ borderRadius: 2, width: 200 }}
              />
              <CardContent>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="h5" color="primary">
                  {product.price}$
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => decreaseQty.mutate(product.id)}>
                  <Remove />
                </IconButton>
                <Typography>{product.count}</Typography>
                <IconButton onClick={() => increaseQty.mutate(product.id)}>
                  <Add />
                </IconButton>
                <IconButton
                  onClick={() => deleteItem.mutate(product.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}

          {products.length > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={clearCart.mutate}
            >
              Clear Cart
            </Button>
          )}
        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Order Summary
            </Typography>
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography variant="body1" color="primary">
                Total Items:
              </Typography>
              <Typography variant="body1" color="primary">
                {totalItems}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography variant="body1" color="primary">
                Total Price:
              </Typography>
              <Typography variant="body1" color="primary">
                ${totalPrice}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={totalItems === 0}
              component={Link}
              to="/checkout"
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
