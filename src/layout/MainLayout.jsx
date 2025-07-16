import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "./../components/footer/Footer";
import { Box, Container } from "@mui/material";
import SubscribeSection from "../components/SubscribeSection/SubscribeSection";
import Ad from "../components/Ads/Ad";

function MainLayout() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/register", "/password", "/resetcode"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  return (
    <>
      {!hideLayout && <Navbar />}
      {hideLayout ? (
        <Box sx={{ minHeight: "100vh", px: 0 }}>
          <Outlet />
        </Box>
      ) : (
        <>
          <Container
            sx={{
              minHeight: "100vh",
              px: 2,
              // py: 3,
            }}
          >
            <Outlet />
          </Container>
          {/* Only show Ads on the Home page */}
          {isHomePage && <Ad />}
          {/* Only show SubscribeSection on the Home page */}
          {isHomePage && <SubscribeSection />}
        </>
      )}
      {!hideLayout && <Footer />}
    </>
  );
}

export default MainLayout;
