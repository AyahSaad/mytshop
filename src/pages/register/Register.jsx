import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import { Facebook, Apple, Google as GoogleIcon } from "@mui/icons-material";
import { InsertInvitation } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import bgImg from "../../assets/img/bg-img2.png";

function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
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
  const passwordValue = watch("password");

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* image with logo */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 2,
            display: "inline-block",
          }}
        >
          <Box
            component="img"
            src="/logo.svg"
            alt="Logo"
            sx={{
              width: 190,
              height: "auto",
            }}
          />
        </Box>
      </Box>

      {/* Right side registration form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 4,
          py: 6,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", maxWidth: 600 }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            mb={2}
            color={theme.palette.text.primary}
          >
            Create New Account
          </Typography>
          <Typography variant="body1" mb={4} color="text.secondary">
            Join us to track orders, save favorites, and get special offers.
          </Typography>

          {/* Social Buttons */}
          <Stack direction="row" spacing={2} mb={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Facebook sx={{ fontSize: 28, color: "#3b5998" }} />}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 2,
                fontWeight: 500,
                borderColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.contrastText,
              }}
            >
              Facebook
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon sx={{ fontSize: 28, color: "#DB4437" }} />}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 2,
                fontWeight: 500,
                borderColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.contrastText,
              }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={
                <Apple
                  sx={{
                    fontSize: 28,
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  }}
                />
              }
              sx={{
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 2,
                fontWeight: 500,
                borderColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.contrastText,
              }}
            >
              Apple ID
            </Button>
          </Stack>

          <Divider sx={{ my: 3, borderColor: theme.palette.divider }}>
            or
          </Divider>

          {/* First Name & Last Name  */}
          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 3,
                  message: "First name must be at least 3 characters",
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "First name should contain only letters",
                },
              })}
              label="First Name"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ fontSize: 24 }} />
                  </InputAdornment>
                ),
                sx: { fontSize: "1rem", py: 1.5, borderRadius: 2, height: 56 },
              }}
              InputLabelProps={{ sx: { fontSize: "1rem" } }}
            />

            <TextField
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 4,
                  message: "Last name must be at least 4 characters",
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Last name should contain only letters",
                },
              })}
              label="Last Name"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ fontSize: 24 }} />
                  </InputAdornment>
                ),
                sx: { fontSize: "1rem", py: 1.5, borderRadius: 2, height: 56 },
              }}
              InputLabelProps={{ sx: { fontSize: "1rem" } }}
            />
          </Stack>

          <TextField
            {...register("userName", {
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Username must be at least 6 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers, and underscores",
              },
            })}
            label="Username"
            fullWidth
            error={!!errors.userName}
            helperText={errors.userName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ fontSize: 24 }} />
                </InputAdornment>
              ),
              sx: { fontSize: "1rem", py: 1.5, borderRadius: 2, height: 56 },
            }}
            InputLabelProps={{ sx: { fontSize: "1rem" } }}
            sx={{ mb: 2 }}
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
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon sx={{ fontSize: 24 }} />
                </InputAdornment>
              ),
              sx: { fontSize: "1rem", py: 1.5, borderRadius: 2, height: 56 },
            }}
            InputLabelProps={{ sx: { fontSize: "1rem" } }}
            sx={{ mb: 2 }}
          />

          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Include upper, lower, number & special char",
              },
            })}
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlineIcon sx={{ fontSize: 24 }} />
                </InputAdornment>
              ),
              sx: { fontSize: "1rem", py: 1.5, borderRadius: 2, height: 56 },
            }}
            InputLabelProps={{ sx: { fontSize: "1rem" } }}
            sx={{ mb: 2 }}
          />

          <TextField
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Include upper, lower, number & special char",
              },
            })}
            label="Confirm Password"
            type="password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlineIcon sx={{ fontSize: 24 }} />
                </InputAdornment>
              ),
              sx: { fontSize: "1rem", py: 1.5, borderRadius: 2, height: 56 },
            }}
            InputLabelProps={{ sx: { fontSize: "1rem" } }}
            sx={{ mb: 2 }}
          />

          <TextField
            {...register("birthOfDate", {
              required: "Birth date is required",
            })}
            label="Birth Date"
            type="date"
            fullWidth
            error={!!errors.birthOfDate}
            helperText={errors.birthOfDate?.message}
            InputLabelProps={{ shrink: true, sx: { fontSize: "1rem" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InsertInvitation sx={{ fontSize: 24 }} />
                </InputAdornment>
              ),
              sx: { fontSize: "1rem", py: 1.5, borderRadius: 2, height: 56 },
            }}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={registerMutation.isLoading}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 2,
            }}
          >
            {registerMutation.isLoading ? "Loading..." : "Register"}
          </Button>
          <Typography variant="body2" align="center" mt={2}>
            Already have an Account?{" "}
            <Button
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                color: theme.palette.primary.contrastText,
              }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
