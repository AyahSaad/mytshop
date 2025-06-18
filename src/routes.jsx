import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/password/ForgotPassword";
import ResetCode from "./pages/code/ResetCode";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/password",
        element: <ForgotPassword />,
      },
      {
        path: "/resetcode",
        element: <ResetCode />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },
]);

export default routes;
