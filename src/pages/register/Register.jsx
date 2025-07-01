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
import { toast, Zoom } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const registerMutation = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BURL}Account/register`,
        values
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error registering user:", error.response?.data || error);
      toast.error("Registration failed!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
    },
  });

  const onSubmit = (formData) => {
    registerMutation.mutate(formData);
  };

  return (
    <Box
      component="form"
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("firstName", { required: "First name is required" })}
        label="First Name"
        sx={{ m: 1 }}
        fullWidth
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("lastName", { required: "Last name is required" })}
        label="Last Name"
        sx={{ m: 1 }}
        fullWidth
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("userName", { required: "Username is required" })}
        label="Username"
        sx={{ m: 1 }}
        fullWidth
        error={!!errors.userName}
        helperText={errors.userName?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
        label="Email"
        type="email"
        sx={{ m: 1 }}
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmail />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("password", { required: "Password is required" })}
        label="Password"
        type="password"
        sx={{ m: 1 }}
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Password />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("confirmPassword", {
          required: "Confirm password is required",
        })}
        label="Confirm Password"
        type="password"
        sx={{ m: 1 }}
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Password />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register("birthOfDate", { required: "Birth date is required" })}
        label="Birth Date"
        type="date"
        sx={{ m: 1 }}
        fullWidth
        error={!!errors.birthOfDate}
        helperText={errors.birthOfDate?.message}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <InsertInvitation />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="outlined"
        type="submit"
        sx={{ m: 1 }}
        disabled={registerMutation.isLoading}
      >
        {registerMutation.isLoading ? "Loading..." : "Register"}
      </Button>
    </Box>
  );
}

export default Register;
