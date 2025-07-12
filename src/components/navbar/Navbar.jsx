import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import AxiosAut from "../../api/AxiosAut";
import { useQuery } from "@tanstack/react-query";

const pagesGust = ["Home", "Categories", "Products", "About", "Contact"];
const settings = ["Profile", "Logout"];

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("userToken"));
  const { mode, toggleTheme } = React.useContext(ThemeContext);

  const fetchCartItems = async () => {
    const { data } = await AxiosAut.get(`${import.meta.env.VITE_BURL}Carts`);
    return data;
  };

  const { data } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
    staleTime: 6000,
    refetchOnWindowFocus: true,
    retry: 3,
    enabled: isLoggedIn,
  });

  const cartItems = data?.cartResponse?.length ?? 0;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    handleCloseUserMenu();
    navigate("/login");
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
    if (setting === "Logout") {
      handleLogout();
    } else {
      navigate(`/${setting.toLowerCase()}`);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ px: 3 }}>
          {/* Logo ( */}
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center", mr: 2 }}
          >
            <Box
              component="img"
              src="/logo.svg"
              alt="Logo"
              sx={{ width: 150, height: 44 }}
            />
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pagesGust.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* (Desktop only) */}
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
              gap: 2,
            }}
          >
            {pagesGust.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                sx={{
                  color: "primary.contrastText",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Theme Toggle */}
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>

            {/*Login/Register */}
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PermIdentityIcon
                      sx={{ fontSize: 32, color: "primary.contrastText" }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleSettingClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: "#ffffff",
                    color: "#312d5f",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: "#312d5f",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#2a264f",
                    },
                  }}
                >
                  Create Account
                </Button>
              </>
            )}

            {/* wishes Icon */}
            {/* {isLoggedIn && (
              <IconButton component={Link} to="/wishes" color="inherit">
                <Badge badgeContent={wishItemsCount} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            )} */}

            {/* Cart Icon */}
            {isLoggedIn && (
              <IconButton component={Link} to="/cart" color="inherit">
                <Badge badgeContent={cartItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
