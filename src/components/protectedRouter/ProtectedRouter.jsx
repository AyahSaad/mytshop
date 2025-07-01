import { Navigate } from "react-router";

function Protectedrouter({ children }) {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default Protectedrouter;
