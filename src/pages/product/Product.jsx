import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loaderr from "./../../components/loader/Loaderr";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import axios from "axios";
function Product() {
  const { id } = useParams("id");
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BURL}products/${id}`
      );

      console.log(response.data);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("No products:", error.response?.data || error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAddToCart = async (id) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}Carts/${id}`,
        {},
        { headers: { AUTHORIZATION: `Bearer ${userToken}` } }
      );
      console.log(response);
      alert("Added to the cart Successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data || error);
    }
  };

  if (isLoading) {
    return <Loaderr />;
  }
  return (
    <Grid container justifyContent="center" padding={4}>
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={product.mainImg}
            alt={product.name}
            style={{ objectFit: "cover" }}
          />

          <CardContent>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle2">Price:</Typography>
              <Typography variant="subtitle2">${product.price}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle2">Discount:</Typography>
              <Typography variant="subtitle2">{product.discount}%</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle2">Quantity:</Typography>
              <Typography variant="subtitle2">{product.quantity}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">Rating:</Typography>
              <Typography variant="subtitle2">{product.rate}</Typography>
            </Box>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Product;
