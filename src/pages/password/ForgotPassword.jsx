import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { AlternateEmail } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./password.module.css";
import { toast, Zoom } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BURL}Account/ForgotPassword`,
        values
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Reset Code Sent Successfully!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
      navigate("/resetcode");
    },
    onError: (error) => {
      console.error("Error sending reset code:", error.response?.data || error);
      toast.error("Reset Code Failed!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
    },
  });

  const onSubmit = (formData) => {
    forgotPasswordMutation.mutate(formData);
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

      <Button
        variant="outlined"
        type="submit"
        sx={{ m: 1 }}
        disabled={forgotPasswordMutation.isLoading}
      >
        {forgotPasswordMutation.isLoading ? "Loading..." : "Submit"}
      </Button>
    </Box>
  );
}

export default ForgotPassword;
