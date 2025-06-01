import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "./../components/footer/Footer";
import { Container } from "@mui/material";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default MainLayout;
