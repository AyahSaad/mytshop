import { Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Loaderr from "../loader/Loaderr";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import computerImg from "../../assets/img/computer.png";

function Category() {
  const fetchCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BURL}categories`);
    return data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 6 * 60 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 3,
  });

  if (isError)
    return console.error("No Categories:", error.response?.data || error);
  if (isLoading) return <Loaderr />;

  return (
    <Grid
      container
      spacing={4}
      padding={2}
      justifyContent="center"
      alignItems="center"
    >
      {data.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              textAlign: "center",
            }}
          >
            {/* Image Container */}
            <Box
              sx={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                backgroundColor: "#E6E3FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={computerImg}
                alt="Computer"
                style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Category Name */}
            <Typography
              variant="h6"
              component={Link}
              to={`/categories/${category.id}/products`}
              sx={{
                textDecoration: "none",
                color: "#121212",
                "&:hover": {
                  color: "#3f51b5",
                },
              }}
            >
              {category.name}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default Category;
