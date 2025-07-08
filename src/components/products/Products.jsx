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
import Loaderr from "../loader/Loaderr";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Products() {
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
    <Box sx={{ p: 2 }}>
      {/* Search + Sort Controls */}
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
      >
        {/* Search Input */}
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearchSubmit}>
            Search
          </Button>
        </Box>

        {/* Sort Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
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

      {/* Product Grid */}
      <Grid container spacing={2}>
        {products.length === 0 ? (
          <Typography sx={{ mt: 2, mx: "auto" }}>No products found.</Typography>
        ) : (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.mainImg}
                  alt={product.name}
                  style={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography component="div" variant="h6" align="center">
                    {product.name}
                  </Typography>

                  {/* ⭐ Product Rating */}
                  <Box display="flex" justifyContent="center" mt={1}>
                    <Rating value={product.rate} precision={0.5} readOnly />
                  </Box>
                </CardContent>
                <CardActions>
                  <Box width="100%" display="flex" justifyContent="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/product/${product.id}`}
                    >
                      Details
                    </Button>
                  </Box>
                </CardActions>
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
