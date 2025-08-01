import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  CardMedia,
  Box,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Rating,
} from "@mui/material";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import Loaderr from "../loader/Loaderr";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";
import { toast, Zoom } from "react-toastify";

function Products() {
  const queryClient = useQueryClient();
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async ({ queryKey }) => {
    const [_key, page, sortBy, order, query] = queryKey;
    const url = `${
      import.meta.env.VITE_BURL
    }products?page=${page}&limit=2&sortBy=${sortBy}&order=${order}&query=${query}`;
    const { data } = await axios.get(url);
    return data;
  };

  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", page, sortBy, order, searchQuery],
    queryFn: fetchProducts,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (e) => {
    const [newSortBy, newOrder] = e.target.value.split("-");
    setSortBy(newSortBy);
    setOrder(newOrder);
    setPage(1);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchTerm);
    setPage(1);
  };

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
  const totalPages = responseData.totalPages;

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header: Title + Search + Sort */}
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight={600}>
          Products
        </Typography>

        {/* Search + Sort */}
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <TextField
            size="small"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchSubmit}
            sx={{ height: 40 }}
          >
            Search
          </Button>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={`${sortBy}-${order}`}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="name-asc">Name (A-Z)</MenuItem>
              <MenuItem value="name-desc">Name (Z-A)</MenuItem>
              <MenuItem value="price-asc">Price (Low to High)</MenuItem>
              <MenuItem value="price-desc">Price (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Box>
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

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}

export default Products;
