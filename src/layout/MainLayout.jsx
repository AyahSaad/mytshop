import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "./../components/footer/Footer";
import { Box, Container } from "@mui/material";

function MainLayout() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/register", "/password", "/resetcode"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);
  return (
    <>
      {!hideLayout && <Navbar />}
      {hideLayout ? (
        <Box sx={{ minHeight: "100vh" }}>
          <Outlet />
        </Box>
      ) : (
        <Container
          sx={{
            minHeight: "100vh",
            px: 2,
            py: 3,
          }}
        >
          <Outlet />
        </Container>
      )}
      {!hideLayout && <Footer />}
    </>
  );
}

export default MainLayout;
