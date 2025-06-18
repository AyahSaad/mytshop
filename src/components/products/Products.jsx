import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BURL}products`);

      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("No products:", error.response?.data || error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {products.map((product) => (
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
      ))}
    </Grid>
  );
}

export default Products;
