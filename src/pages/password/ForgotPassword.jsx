import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { AlternateEmail, Password } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./password.module.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const loginUser = async (values) => {
    console.log("Submitted values:", values);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}Account/ForgotPassword`,
        values
      );
      console.log(response.data);
      alert("Reset Code Sent Successful!");
      navigate("/resetcode");
    } catch (error) {
      console.error("Error Login user:", error.response?.data || error);
      alert("Reset Code Failed!");
    }
  };

  return (
    <Box
      component="form"
      className={styles.formContainer}
      onSubmit={handleSubmit(loginUser)}
    >
      <TextField
        {...register("email", { required: true })}
        label="Email"
        type="email"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmail />
            </InputAdornment>
          ),
        }}
      />

      <Button variant="outlined" type="submit" sx={{ m: 1 }}>
        Submit
      </Button>
    </Box>
  );
}

export default ForgotPassword;
