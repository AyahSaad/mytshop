import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { AlternateEmail, Password } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const loginUser = async (values) => {
    console.log("Submitted values:", values);
    try {
      const response = await axios.post(
        "http://mytshop.runasp.net/api/Account/login",
        values
      );
      console.log(response.data);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error Login user:", error.response?.data || error);
      alert("Login failed!");
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

      <Button variant="outlined" type="submit" sx={{ m: 1 }}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
