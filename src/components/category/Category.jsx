import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function Category() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BURL}categories`
      );
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("No Categories:", error.response?.data || error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={category.id}>
          <Card>
            <CardContent>
              <Typography component={"div"} variant="h5" align="center">
                {category.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Box width="100%" display="flex" justifyContent="center">
                <Button size="small" variant="contained" color="primary">
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
