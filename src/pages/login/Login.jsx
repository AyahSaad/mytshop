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
import { Facebook, Apple } from "@mui/icons-material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";
import bgImg from "../../assets/img/bg-img1.png";

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const loginUser = useMutation({
    mutationFn: async (values) => {
      const { data } = await AxiosAut.post("Account/login", values);
      return data;
    },
    onSuccess: async (data) => {
      localStorage.setItem("userToken", data.token);

      try {
        const response = await AxiosAut.get("/Account/userinfo");
        localStorage.setItem(
          "userName",
          JSON.stringify(response.data.userName)
        );

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Zoom,
        });

        navigate("/");
      } catch (error) {
        toast.error("Failed to fetch user info after login.", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Zoom,
        });
        console.error("User info fetch error:", error);
      }
    },
    onError: (error) => {
      console.error("Login error:", error.response?.data || error);
      toast.error("Login failed!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
    },
  });

  const onSubmit = (formData) => {
    loginUser.mutate(formData);
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
      {/*image with logo */}
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

      {/*login form */}
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
            Login
          </Typography>
          <Typography variant="body1" mb={4} color="text.secondary">
            Good to see you again!
          </Typography>

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
              sx: { fontSize: "1rem", py: 1.5 },
            }}
            InputLabelProps={{ sx: { fontSize: "1rem" } }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "56px",
              },
            }}
          />

          <Box textAlign="right" mb={3}>
            <Button
              onClick={() => navigate("/password")}
              size="small"
              sx={{
                fontSize: "0.95rem",
                textTransform: "none",
                color: theme.palette.primary.contrastText,
              }}
            >
              Forgot Password?
            </Button>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loginUser.isLoading}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 2,
              mb: 3,
            }}
          >
            {loginUser.isLoading ? "Logging in..." : "Login"}
          </Button>

          <Typography variant="body1" align="center">
            Don’t have an account?{" "}
            <Button
              onClick={() => navigate("/register")}
              size="small"
              sx={{
                fontSize: "1rem",
                textTransform: "none",
                color: theme.palette.primary.contrastText,
              }}
            >
              Create Account
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
