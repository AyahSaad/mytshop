import {
  Box,
  Card,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  useTheme,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";
import { toast } from "react-toastify";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const confirmPayment = useMutation({
    mutationFn: async (method) => {
      const response = await AxiosAut.post("/CheckOuts/Pay", {
        PaymentMethod: method,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (paymentMethod === "Visa") {
        toast.info("Redirecting to payment gateway...", { autoClose: 2000 });
        window.location.href = data.url;
      } else {
        toast.success("Order confirmed with Cash on Delivery!");
        setIsConfirmed(true);
      }
    },
    onError: (error) => {
      console.error("Payment Error:", error.response?.data || error);
      toast.error("Payment failed. Please try again.");
    },
  });

  const handleConfirm = () => {
    confirmPayment.mutate(paymentMethod);
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 6,
        minHeight: "80vh",
        bgcolor: theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          width: "100%",
          maxWidth: 480,
          bgcolor: theme.palette.background.paper,
          borderRadius: 3,
        }}
      >
        {isConfirmed ? (
          <>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="primary"
              textAlign="center"
            >
              Your order is confirmed!
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
              We’ve received your payment and will start processing your order
              shortly.
            </Typography>

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/cart")}
              >
                Go to My Orders
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              color="primary"
              textAlign="center"
            >
              Checkout
            </Typography>

            <FormControl component="fieldset" sx={{ mt: 3, width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Select Payment Method
              </Typography>
              <RadioGroup value={paymentMethod} onChange={handleChange}>
                <FormControlLabel
                  value="Visa"
                  control={<Radio />}
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CreditCardIcon fontSize="small" />
                      <Typography>Visa / Credit Card</Typography>
                    </Stack>
                  }
                />
                <FormControlLabel
                  value="Cash"
                  control={<Radio />}
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AttachMoneyIcon fontSize="small" />
                      <Typography>Cash on Delivery</Typography>
                    </Stack>
                  }
                />
              </RadioGroup>
            </FormControl>

            <Button
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "16px",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: "#3dbfc7",
                },
              }}
              onClick={handleConfirm}
              disabled={confirmPayment.isPending}
            >
              {confirmPayment.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Confirm Payment"
              )}
            </Button>
          </>
        )}
      </Card>
    </Box>
  );
}

export default Checkout;
