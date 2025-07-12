import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import bgImg from "../../assets/img/bg-img1.png";

function ResetCode() {
  const theme = useTheme();
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
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Left side with image */}
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

      {/* Right side form */}
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
          sx={{ width: "100%", maxWidth: 500 }}
        >
          <Typography
            color={theme.palette.primary.contrastText}
            variant="h4"
            fontWeight={700}
            mb={1}
          >
            Step2
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            A verification code (OTP) was sent to your email. Enter it below to
            continue resetting your password.
          </Typography>

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
                  <MailOutlineIcon />
                </InputAdornment>
              ),
              sx: { fontSize: "1rem", py: 1.5 },
            }}
            InputLabelProps={{ sx: { fontSize: "1rem" } }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "56px",
              },
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
            label="New Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlineIcon />
                </InputAdornment>
              ),
              sx: { fontSize: "1rem", py: 1.5 },
            }}
            InputLabelProps={{ sx: { fontSize: "1rem" } }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "56px",
              },
            }}
          />

          <TextField
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
            label="Confirm Password"
            type="password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlineIcon />
                </InputAdornment>
              ),
              sx: { fontSize: "1rem", py: 1.5 },
            }}
            InputLabelProps={{ sx: { fontSize: "1rem" } }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "56px",
              },
            }}
          />

          <TextField
            {...register("code", { required: "Code is required" })}
            label="Reset Code"
            fullWidth
            error={!!errors.code}
            helperText={errors.code?.message}
            InputLabelProps={{ shrink: true, sx: { fontSize: "1rem" } }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "56px",
              },
            }}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={resetMutation.isLoading}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 2,
            }}
          >
            {resetMutation.isLoading ? "Updating..." : "Reset Password"}
          </Button>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" align="center" mt={2}>
            Remember your password?{" "}
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

export default ResetCode;
