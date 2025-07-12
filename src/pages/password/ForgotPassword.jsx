import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./password.module.css";
import { toast, Zoom } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import bgImg from "../../assets/img/bg-img2.png";

function ForgotPassword() {
  const theme = useTheme();
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

      {/* forgot password form */}
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
            Step 1
          </Typography>
          <Typography variant="h4" fontWeight={700} mb={2}>
            Forgot Password
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Please enter your email address and we’ll send you a recovery code
            to reset your password.
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
                  <MailOutlineIcon sx={{ fontSize: 24 }} />
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={forgotPasswordMutation.isLoading}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 2,
              mb: 3,
            }}
          >
            {forgotPasswordMutation.isLoading ? "Loading..." : "Sent Code"}
          </Button>

          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" align="center" mt={2}>
            Remembered your password?{" "}
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

export default ForgotPassword;
