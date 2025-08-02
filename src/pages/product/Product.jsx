import { useParams } from "react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Rating,
  Typography,
  Avatar,
  Link as MuiLink,
  IconButton,
  TextField,
} from "@mui/material";
import { toast, Zoom } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loaderr from "../../components/loader/Loaderr";

function Product() {
  const { id } = useParams();
  const isLoggedIn = !!localStorage.getItem("userToken");
  const currentUser = JSON.parse(localStorage.getItem("userName"));
  const [ratingValue, setRatingValue] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();

  const fetchProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BURL}products/${id}`
    );
    console.log(" Product fetched:", data);
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
      console.log("Add to cart error:", error.message);
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      console.log(" Sending review request:", reviewData);
      const response = await AxiosAut.post(
        `/products/${id}/Reviews/Create`,
        reviewData
      );
      console.log(" Review API response:", response.data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success("Review submitted successfully!");
      // Reset fields
      setRatingValue(0);
      setCommentText("");
    },
    onError: (error) => {
      console.error(" Review submission error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to submit review.");
    },
  });

  if (isError) {
    console.error("No Product:", error.response?.data || error);
    return <Typography>Error loading product</Typography>;
  }

  if (isLoading) return <Loaderr />;

  const hasReviewed = data?.reviews?.some(
    (review) => review.reviewerName === currentUser
  );
  console.log("User has already reviewed?", hasReviewed);

  const allImages = [data.mainImg, ...(data.images || [])];

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box display="flex">
            <CardMedia
              component="img"
              image={mainImage || data.mainImg}
              sx={{
                border: "2px solid #4fc4ca",
                borderRadius: 2,
                height: 400,
                width: "100%",
                objectFit: "contain",
                p: 2,
              }}
            />
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold">
            {data.name}
          </Typography>
          <Typography color="text.secondary" mb={2}>
            this is Samsung {data.name}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight="bold">Rate</Typography>
            <Rating value={data.rate} precision={0.5} readOnly />
            <Typography>({data.rate.toFixed(2)})</Typography>
          </Box>

          <Box mt={3}>
            <Typography fontWeight="bold" fontSize="18px">
              Price
            </Typography>
            <Typography fontWeight="bold" fontSize="24px" color="black">
              ${data.price}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mt={2}>
            <IconButton
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              size="small"
              sx={{ border: "1px solid #ccc" }}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              value={quantity}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: 50 }}
              readOnly
            />
            <IconButton
              onClick={() => setQuantity((q) => q + 1)}
              size="small"
              sx={{ border: "1px solid #ccc" }}
            >
              <AddIcon />
            </IconButton>

            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                ml: 2,
                backgroundColor: "#4fc4ca",
                textTransform: "none",
              }}
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error("Login to buy");
                  return;
                }
                handleAddToCartMutation.mutate(data.id);
              }}
            >
              Buy
            </Button>
          </Box>

          {/* Add Review */}
          {isLoggedIn && (
            <Box mt={6}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Add Your Review
              </Typography>
              <Rating
                value={ratingValue}
                onChange={(e, newVal) => setRatingValue(newVal)}
                precision={0.5}
              />
              <TextField
                placeholder="Your Comment"
                multiline
                fullWidth
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Button
                fullWidth
                sx={{ mt: 2, backgroundColor: "#4fc4ca", color: "#312d5f" }}
                onClick={() => {
                  if (!ratingValue || !commentText.trim()) {
                    toast.warn("Please add rating and comment");
                    return;
                  }
                  if (hasReviewed) {
                    toast.warn("You already submitted a review");
                    return;
                  }
                  const reviewData = {
                    Rate: Math.round(ratingValue),
                    Comment: commentText.trim(),
                  };
                  addReviewMutation.mutate(reviewData);
                }}
              >
                Submit Review
              </Button>
            </Box>
          )}
        </Grid>

        {/* Customer Reviews */}
        <Box sx={{ width: "100%", px: 2, mt: 6 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Customer Reviews
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* {data.reviews?.length ? (
            <Box display="flex" flexDirection="column" gap={2}>
              {data.reviews.map((review) => (
                <Card
                  key={review.id}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    boxShadow: 1,
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <Avatar>
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography fontWeight="bold">
                        {review.reviewerName}
                      </Typography>
                    </Box>

                    <Typography sx={{ mb: 1 }}>{review.comment}</Typography>

                    <Rating
                      value={review.rate}
                      readOnly
                      precision={0.5}
                      size="small"
                      sx={{ mb: 1 }}
                    />

                    <Box display="flex" justifyContent="flex-end">
                      <Typography variant="body2" color="text.secondary">
                        {new Date(review.reviewDate).toLocaleDateString(
                          "en-US"
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary">No reviews yet.</Typography>
          )}
        </Box>
      </Grid> */}
          {data.reviews?.length ? (
            <Box display="flex" flexDirection="column" gap={2}>
              {data.reviews.map((review) => (
                <Card
                  key={review.id}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    boxShadow: 1,
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <Avatar>
                        {review.reviewerName?.charAt(0).toUpperCase() || "U"}
                      </Avatar>
                      <Typography fontWeight="bold">
                        {review.reviewerName || "Anonymous"}
                      </Typography>
                    </Box>

                    <Typography sx={{ mb: 1 }}>{review.comment}</Typography>

                    <Rating
                      value={review.rate}
                      readOnly
                      precision={0.5}
                      size="small"
                      sx={{ mb: 1 }}
                    />

                    <Box display="flex" justifyContent="flex-end">
                      <Typography variant="body2" color="text.secondary">
                        {new Date(review.reviewDate).toLocaleDateString(
                          "en-US"
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary">No reviews yet.</Typography>
          )}
        </Box>
      </Grid>
    </Box>
  );
}

export default Product;
