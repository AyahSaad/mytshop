import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { AlternateEmail, Password } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./resetcode.module.css";
import { toast, Zoom } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function ResetCode() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const resetMutation = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BURL}Account/SendCode`,
        values
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Reset Password Successful!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
      navigate("/login");
    },
    onError: (error) => {
      console.error("Reset error:", error.response?.data || error);
      toast.error("Reset Password Failed!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
    },
  });

  const onSubmit = (data) => {
    resetMutation.mutate(data);
  };

  return (
    <Box
      component="form"
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
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
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "Must include uppercase, lowercase, number, and special character",
          },
        })}
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
          required: "Confirm Password is required",
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
        {...register("code", { required: "Code is required" })}
        label="Code"
        sx={{ m: 1 }}
        fullWidth
        error={!!errors.code}
        helperText={errors.code?.message}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        variant="outlined"
        type="submit"
        sx={{ m: 1 }}
        disabled={resetMutation.isLoading}
      >
        {resetMutation.isLoading ? "Updating..." : "Update"}
      </Button>
    </Box>
  );
}

export default ResetCode;
