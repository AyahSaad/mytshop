import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import ThemeContextProvider from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ThemeContextProvider>
      <App />
      <ToastContainer />
    </ThemeContextProvider>
  </>
);
