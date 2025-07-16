import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Loaderr from "../loader/Loaderr";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AxiosAut from "../../api/AxiosAut";
import { toast, Zoom } from "react-toastify";

function ProductGrid() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("userToken");

  const fetchProducts = async () => {
    const url = `${import.meta.env.VITE_BURL}products`;
    const { data } = await axios.get(url);
    return data;
  };

  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["best-sellers"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  // Mutation for adding product to cart
  const handleAddToCartMutation = useMutation({
    mutationFn: (productId) => AxiosAut.post(`/Carts/${productId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
    },
    onError: (error) => {
      toast.error("Failed to add to cart.", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
      console.error("Add to cart error:", error.message);
    },
  });

  if (isLoading || !responseData) return <Loaderr />;
  if (isError) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Failed to load products.
      </Typography>
    );
  }

  const products = responseData.data;

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight={600}>
          Best Sellers
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate("/products")}
          sx={{ textTransform: "none", fontSize: "1.1rem", fontWeight: 600 }}
        >
          See All
        </Button>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={2}>
        {products.length === 0 ? (
          <Typography sx={{ mt: 2, mx: "auto" }}>No products found.</Typography>
        ) : (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={product.id}>
              <Card
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
              >
                {/* Hover */}
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 1,
                    "&:hover .hover-button": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.mainImg}
                    alt={product.name}
                    sx={{ objectFit: "cover", borderRadius: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className="hover-button"
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: "50%",
                      transform: "translateX(-50%) translateY(10px)",
                      opacity: 0,
                      transition: "all 0.3s ease-in-out",
                      zIndex: 2,
                    }}
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast.error(
                          "Please log in to add items to your cart.",
                          {
                            position: "top-right",
                            autoClose: 5000,
                            theme: "dark",
                            transition: Zoom,
                          }
                        );
                        return;
                      }
                      handleAddToCartMutation.mutate(product.id);
                    }}
                    disabled={handleAddToCartMutation.isPending}
                  >
                    {handleAddToCartMutation.isPending
                      ? "Adding..."
                      : "Add to Cart"}
                  </Button>
                </Box>

                {/* Product Info */}
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    noWrap
                    component={Link}
                    to={`/product/${product.id}`}
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "primary.dark",
                        textDecoration: "none",
                      },
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {product.description}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#001e6c",
                      mt: 1,
                      fontWeight: 600,
                    }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default ProductGrid;
