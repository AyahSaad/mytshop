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
import { Link } from "react-router";
import Loaderr from "../loader/Loaderr";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Products() {
  const fetchProducts = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BURL}products`);
    return data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 6 * 60 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 3,
  });
  if (isError)
    return console.error("No Products:", error.response?.data || error);
  if (isLoading) return <Loaderr />;

  return (
    <Grid container spacing={2} padding={2}>
      {data.map((product) => (
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
                  viewTransition
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
