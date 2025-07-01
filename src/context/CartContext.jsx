import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(0);

  const getItems = async () => {
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BURL}Carts`, {
        headers: { AUTHORIZATION: `Bearer ${userToken}` },
      });
      setCartItems(response.data.cartResponse.length);
    } catch (error) {
      console.error("Error", error.response?.data || error);
      alert("Failed");
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
