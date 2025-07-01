import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home/Home";
import AdminHome from "./pages/Admin/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/password/ForgotPassword";
import ResetCode from "./pages/code/ResetCode";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Protectedrouter from "./components/protectedrouter/Protectedrouter";
import DashBoardLayout from "./layout/DashBoardLayout";
import CategoryIndex from "./pages/Admin/category/CategoryIndex";
import DashBoardProtectedRoter from "./components/protectedRouter/DashBoardProtectedRoter";
import Unauthorized from "./Unauthorized/Unauthorized";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
        element: (
          <Protectedrouter>
            <Cart />
          </Protectedrouter>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Protectedrouter>
            <Checkout />
          </Protectedrouter>
        ),
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
        viewTransition: true,
      },
      {
        path: "/Unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <DashBoardProtectedRoter>
        <DashBoardLayout />
      </DashBoardProtectedRoter>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "category/index",
        element: <CategoryIndex />,
      },
    ],
  },
]);

export default routes;
