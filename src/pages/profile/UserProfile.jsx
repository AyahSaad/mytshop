import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const links = [
  { label: "My Profile", path: "info", icon: <PersonIcon /> },
  { label: "Change Password", path: "change-password", icon: <VpnKeyIcon /> },
  { label: "Orders", path: "orders", icon: <ShoppingCartIcon /> },
];

const UserProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const drawerContent = (
    <Box
      sx={{
        width: { xs: "100%", md: 280 },
        bgcolor: theme.palette.background.paper,
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Avatar
        alt="Name"
        src="https://randomuser.me/api/portraits/women/79.jpg"
        sx={{ width: 80, height: 80, mb: 1 }}
      />
      <Typography variant="subtitle1" fontWeight="bold">
        {JSON.parse(localStorage.getItem("userName"))}
      </Typography>

      <Divider sx={{ width: "100%", my: 2 }} />

      <List sx={{ width: "100%" }}>
        {links.map((item) => (
          <ListItem
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={() => isMobile && setMobileOpen(false)}
            style={({ isActive }) => ({
              backgroundColor: isActive
                ? theme.palette.action.selected
                : "transparent",
              borderRadius: "8px",
              marginBottom: "8px",
              color: theme.palette.text.primary,
            })}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ width: "100%", my: 2 }} />

      <List sx={{ width: "100%" }}>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: "8px",
            color: theme.palette.error.main,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          <ListItemIcon sx={{ color: theme.palette.error.main }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Show menu icon on mobile */}
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ position: "fixed", top: 16, left: 16, zIndex: 1201 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar: Drawer on mobile, Box on desktop */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            width: 280,
            borderRight: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            boxShadow: 2,
          }}
        >
          {drawerContent}
        </Box>
      )}

      {/* Main content */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, mt: isMobile ? 6 : 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserProfile;
