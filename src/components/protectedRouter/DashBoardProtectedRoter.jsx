import { Navigate } from "react-router";
import DashBoardLayout from "./../../layout/DashBoardLayout";
import { jwtDecode } from "jwt-decode";
function DashBoardProtectedRoter({ children }) {
  const Token = localStorage.getItem("userToken");
  if (!Token) return <Navigate to={"/login"} />;
  const decodedToken = jwtDecode(Token);
  console.log(decodedToken);
  const roleClaim =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const role = decodedToken[roleClaim];
  if (role != "SuperAdmin") {
    return <Navigate to={"/Unauthorized"} />;
  }
  return children;
}

export default DashBoardProtectedRoter;
