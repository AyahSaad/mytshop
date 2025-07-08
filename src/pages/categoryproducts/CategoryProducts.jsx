import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Rating,
  Box,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loaderr from "../../components/loader/Loaderr";

function CategoryProducts() {
  const { id } = useParams();

  const fetchProducts = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BURL}categories/${id}/products`
    );
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categoryProducts", id],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Loaderr />;
  if (isError)
    return (
      <Typography color="error">
        Error loading products: {error.message}
      </Typography>
    );

  return (
    <Grid container spacing={3} padding={3}>
      {data.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.mainImg}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="subtitle1" mt={1}>
                Price: ${product.price}
              </Typography>
              <Typography variant="body2">
                Discount: {product.discount}%
              </Typography>
              <Typography variant="body2">
                Quantity: {product.quantity}
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body2" mr={1}>
                  Rating:
                </Typography>
                <Rating value={product.rate} precision={0.5} readOnly />
              </Box>
              <Typography variant="body2">
                Status: {product.status ? "Available" : "Out of stock"}
              </Typography>
            </CardContent>
            <Box textAlign="center" pb={2}>
              <Button
                variant="contained"
                size="small"
                component={Link}
                to={`/product/${product.id}`}
              >
                View Product
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CategoryProducts;
