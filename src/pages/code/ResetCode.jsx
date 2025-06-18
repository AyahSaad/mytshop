import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { AlternateEmail, Password } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./resetcode.module.css";

function ResetCode() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const Resetcode = async (values) => {
    console.log("Submitted values:", values);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}Account/SendCode`,
        values
      );
      console.log(response.data);

      alert("Reset Password Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error);
      alert("Reset Password Failed!");
    }
  };

  return (
    <Box
      component="form"
      className={styles.formContainer}
      onSubmit={handleSubmit(Resetcode)}
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
      <TextField
        {...register("password", { required: true })}
        label="Password"
        type="password"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Password />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("confirmPassword", { required: true })}
        label="Confirm Password"
        type="password"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Password />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("code", { required: true })}
        label="Code"
        sx={{ m: 1 }}
        fullWidth
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
      <Button variant="outlined" type="submit" sx={{ m: 1 }}>
        Update
      </Button>
    </Box>
  );
}

export default ResetCode;
