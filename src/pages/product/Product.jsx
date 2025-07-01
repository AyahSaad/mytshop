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
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";
function Product() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const fetchProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BURL}products/${id}`
    );
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    staleTime: 6000,
    refetchOnWindowFocus: true,
    retry: 3,
  });

  const handleAddToCartMutation = useMutation({
    mutationFn: (productId) => {
      return AxiosAut.post(`/Carts/${productId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error) => {
      console.log(`error...`, error.message);
    },
  });

  if (isError) {
    console.error("No Product:", error.response?.data || error);
    return <Typography>Error loading product</Typography>;
  }

  if (isLoading) return <Loaderr />;
  return (
    <Grid container justifyContent="center" padding={4}>
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={data.mainImg}
            alt={data.name}
            style={{ objectFit: "cover" }}
          />

          <CardContent>
            <Typography variant="h5" gutterBottom>
              {data.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              {data.description}
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle2">Price:</Typography>
              <Typography variant="subtitle2">${data.price}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle2">Discount:</Typography>
              <Typography variant="subtitle2">{data.discount}%</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle2">Quantity:</Typography>
              <Typography variant="subtitle2">{data.quantity}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">Rating:</Typography>
              <Typography variant="subtitle2">{data.rate}</Typography>
            </Box>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleAddToCartMutation.mutate(data.id)}
            disabled={handleAddToCartMutation.isPending}
          >
            {handleAddToCartMutation.isPending ? "Adding.." : `Add to Cart`}
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Product;
