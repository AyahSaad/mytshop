import {
  Box,
  Card,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("visa");

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleConfirm = async () => {
    alert(`Payment method selected: ${paymentMethod}`);
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}CheckOuts/Pay`,
        { PaymentMethod: paymentMethod },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (paymentMethod == "Visa") {
        location.href = response.data.url;
      }
      console.log(response);
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      alert("Failed to pay. Please try again.");
    }
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

        <Button fullWidth variant="contained" onClick={handleConfirm}>
          Confirm Payment
        </Button>
      </Card>
    </Box>
  );
}

export default Checkout;
