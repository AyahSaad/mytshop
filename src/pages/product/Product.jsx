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
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { toast, Zoom } from "react-toastify";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";
import { useState } from "react";
function Product() {
  const { id } = useParams();
  const isLoggedIn = !!localStorage.getItem("userToken");
  const currentUser = JSON.parse(localStorage.getItem("userName"));

  const [ratingValue, setRatingValue] = useState(0);
  const [commentText, setCommentText] = useState("");
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
      console.log("📤 Sending review request:", reviewData);
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

  return (
    <Grid container justifyContent="center" padding={4} spacing={4}>
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

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">Rating:</Typography>
              <Rating value={data.rate} precision={0.5} readOnly />
            </Box>
          </CardContent>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              if (!isLoggedIn) {
                toast.error("Please log in to add items to your cart.", {
                  position: "top-right",
                  autoClose: 5000,
                  theme: "dark",
                  transition: Zoom,
                });
                return;
              }
              handleAddToCartMutation.mutate(data.id);
            }}
            disabled={handleAddToCartMutation.isPending}
          >
            {handleAddToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </Card>
      </Grid>

      {/* Reviews Section */}
      <Grid item xs={12} sm={10} md={8}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            User Reviews
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {isLoggedIn && (
            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom>
                Add Your Review
              </Typography>

              <Rating
                name="user-rating"
                value={ratingValue}
                onChange={(e, newValue) => setRatingValue(newValue)}
                precision={0.5}
              />

              <Box mt={2}>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  placeholder="Write your comment..."
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    resize: "none",
                  }}
                />
              </Box>

              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => {
                  if (!ratingValue || !commentText.trim()) {
                    toast.warn("Please add rating and comment");
                    return;
                  }

                  if (hasReviewed) {
                    toast.warn(
                      "You have already submitted a review for this product."
                    );
                    console.log(" Review blocked: user already reviewed");
                    return;
                  }
                  const reviewData = {
                    Rate: ratingValue,
                    Comment: commentText.trim(),
                  };

                  addReviewMutation.mutate(reviewData);
                }}
              >
                Submit Review
              </Button>
            </Box>
          )}

          {data.reviews?.length === 0 ? (
            <Typography color="text.secondary">No reviews yet.</Typography>
          ) : (
            <List>
              {data.reviews.map((review) => (
                <ListItem key={review.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      {review.reviewerName?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography fontWeight="bold" component="span">
                          {review.reviewerName || "Anonymous"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="span"
                        >
                          –{" "}
                          {new Date(review.reviewDate).toLocaleDateString(
                            "en-US"
                          )}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Rating
                          value={review.rate}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                        <Typography
                          variant="body1"
                          component="span"
                          display="block"
                        >
                          {review.comment}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Product;
