import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AlternateEmail, Password } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { toast, Zoom } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import AxiosAut from "../../api/AxiosAut";

function Login() {
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

      <Button
        variant="outlined"
        type="submit"
        sx={{ m: 1 }}
        disabled={loginUser.isLoading}
      >
        {loginUser.isLoading ? "Loading..." : "Login"}
      </Button>

      <Typography variant="body2" sx={{ m: 1 }}>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate("/password")}
        >
          Forgot Password?
        </Button>{" "}
        |{" "}
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Typography>
    </Box>
  );
}

export default Login;
