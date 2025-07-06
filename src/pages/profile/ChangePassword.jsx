import React from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // 🔹 استدعاء الـ theme
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast, Zoom } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AxiosAut from "../../api/AxiosAut";

function ChangePassword() {
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const changePasswordMutation = useMutation({
    mutationFn: async (values) => {
      const { data } = await AxiosAut.patch("Account/ChangePassword", values);
      return data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
      navigate("/login");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Change password failed!";
      toast.error(`Failed: ${message}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
      console.error("Error:", error.response?.data || error);
    },
  });

  const onSubmit = (formData) => {
    changePasswordMutation.mutate(formData);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          bgcolor: theme.palette.background.paper,
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          boxShadow: theme.shadows[3],
          color: theme.palette.text.primary,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Change Password
        </Typography>

        <TextField
          {...register("OldPassword", { required: "Old password is required" })}
          label="Old Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.OldPassword}
          helperText={errors.OldPassword?.message}
        />

        <TextField
          {...register("NewPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
              message:
                "Must include upper, lower, number, and special character",
            },
          })}
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.NewPassword}
          helperText={errors.NewPassword?.message}
        />

        <TextField
          {...register("ConfirmNewPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("NewPassword") || "Passwords do not match",
          })}
          label="Confirm New Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.ConfirmNewPassword}
          helperText={errors.ConfirmNewPassword?.message}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={changePasswordMutation.isLoading}
        >
          {changePasswordMutation.isLoading ? "Updating..." : "Change Password"}
        </Button>
      </Box>
    </Container>
  );
}

export default ChangePassword;
