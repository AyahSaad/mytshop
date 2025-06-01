import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/password/ForgotPassword";
import ResetCode from "./pages/code/ResetCode";
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
        path: "/password",
        element: <ForgotPassword />,
      },
      {
        path: "/resetcode",
        element: <ResetCode />,
      },
    ],
  },
]);

export default routes;
