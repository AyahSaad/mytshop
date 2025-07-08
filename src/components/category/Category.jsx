import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router";
import Loaderr from "../loader/Loaderr";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    <Grid container spacing={2} padding={2}>
      {data.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={category.id}>
          <Card>
            <CardContent>
              <Typography component={"div"} variant="h5" align="center">
                {category.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Box width="100%" display="flex" justifyContent="center">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/categories/${category.id}/products`}
                >
                  Details
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Category;
