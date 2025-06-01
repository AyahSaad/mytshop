import React from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import {
  AccountCircle,
  AlternateEmail,
  InsertInvitation,
  Password,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./register.module.css";

function Register() {
  const { register, handleSubmit } = useForm();

  const registerUser = async (values) => {
    console.log("Submitted values:", values);
    try {
      const response = await axios.post(
        "http://mytshop.runasp.net/api/Account/register",
        values
      );
      console.log(response.data);

      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error);
      alert("Registration failed!");
    }
  };

  return (
    <Box
      component="form"
      className={styles.formContainer}
      onSubmit={handleSubmit(registerUser)}
    >
      <TextField
        {...register("firstName", { required: true })}
        label="First Name"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("lastName", { required: true })}
        label="Last Name"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("userName", { required: true })}
        label="Username"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
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
        {...register("birthOfDate", { required: true })}
        label="Birth Date"
        type="date"
        sx={{ m: 1 }}
        fullWidth
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <InsertInvitation />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="outlined" type="submit" sx={{ m: 1 }}>
        Register
      </Button>
    </Box>
  );
}

export default Register;
