import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import Loaderr from "../../components/loader/Loaderr";
function Cart() {
  const [products, setProducts] = useState();
  const [isLoading, setLoading] = useState(true);
  const userToken = localStorage.getItem("userToken");
  const getProductFromCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BURL}Carts`, {
        headers: { AUTHORIZATION: `Bearer ${userToken}` },
      });

      console.log(response);
      setProducts(response.data.cartResponse);
      setLoading(false);
    } catch (error) {
      console.error("No products :", error.response?.data || error);
      setLoading(false);
    }
  };

  const increaseQty = async (id) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}Carts/increaseCount/${id}`,
        {},
        {
          headers: { AUTHORIZATION: `Bearer ${userToken}` },
        }
      );

      const updatedProduct = products.map((product) => {
        if (product.id === id) {
          return { ...product, count: product.count + 1 };
        } else {
          return product;
        }
      });

      setProducts(updatedProduct);
      console.log(response);
    } catch (error) {
      console.error(
        "Error increasing quantity:",
        error.response?.data || error
      );
      alert("Failed to increase quantity. Please try again.");
    }
  };

  const decreaseQty = async (id) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}Carts/decreaseCount/${id}`,
        {},
        {
          headers: { AUTHORIZATION: `Bearer ${userToken}` },
        }
      );

      let updatedProduct = products
        .map((product) => {
          if (product.id === id) {
            return { ...product, count: product.count - 1 };
          } else {
            return product;
          }
        })
        .filter((product) => product.count > 0);

      setProducts(updatedProduct);
      console.log(response);
    } catch (error) {
      console.error(
        "Error decreasing quantity:",
        error.response?.data || error
      );
      alert("Failed to decrease quantity. Please try again.");
    }
  };

  const deleteItem = async (id) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BURL}Carts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 204) {
        alert("Item deleted successfully.");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        console.error("Failed to delete item:", response.data);
      }
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error);
      alert("Failed to delete item. Try again.");
    }
  };

  const clearCart = async () => {
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BURL}Carts/clearCart`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("Cart cleared successfully:", response.data);
      alert("Cart cleared successfully:");
      //update the UI
      setProducts([]);
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error);
      alert("Failed to clear cart. Please try again.");
    }
  };
  useEffect(() => {
    getProductFromCart();
  }, []);

  if (isLoading) {
    return <Loaderr />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 8 }}>
          {products.map((product) => (
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                p: 2,
                mb: 2,
              }}
              key={product.id}
            >
              <CardMedia
                component="img"
                image="https://placehold.co/100"
                alt=""
                sx={{ borderRadius: 2, width: 200 }}
              />
              <CardContent>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="h5" color="primary">
                  {product.price}$
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => decreaseQty(product.id)}>
                  <Remove />
                </IconButton>
                <Typography>{product.count}</Typography>
                <IconButton onClick={() => increaseQty(product.id)}>
                  <Add />
                </IconButton>
                <IconButton
                  onClick={() => deleteItem(product.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}

          {products.length > 0 && (
            <Button variant="contained" color="secondary" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <Typography variant="h4">Order Summary </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
