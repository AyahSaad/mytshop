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
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";
import { toast } from "react-toastify";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("Visa");

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
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Card sx={{ p: 4, maxWidth: 500, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select Payment Method
          </Typography>
          <RadioGroup value={paymentMethod} onChange={handleChange}>
            <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
            <FormControlLabel
              value="Cash"
              control={<Radio />}
              label="Cash on Delivery"
            />
          </RadioGroup>
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirm}
          disabled={confirmPayment.isPending}
        >
          {confirmPayment.isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Confirm Payment"
          )}
        </Button>
      </Card>
    </Box>
  );
}

export default Checkout;
