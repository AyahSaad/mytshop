import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import ads1 from "../../assets/img/imgi_21_ads1.png";
import ads2 from "../../assets/img/imgi_22_ads2.png";
import ads3 from "../../assets/img/imgi_23_ads3.png";

const ImageBox = styled(Box)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
  height: "100%",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
}));

const Ad = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e7e3ff",
        borderRadius: 4,
        p: { xs: 2, md: 3 },
      }}
    >
      <Grid container spacing={3}>
        {/* Left side ads */}
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <ImageBox>
                <img src={ads1} alt="Ad 1" />
              </ImageBox>
            </Grid>
            <Grid item>
              <ImageBox>
                <img src={ads2} alt="Ad 2" />
              </ImageBox>
            </Grid>
          </Grid>
        </Grid>

        {/* Right side*/}
        <Grid item xs={12} md={6}>
          <ImageBox sx={{ height: "100%" }}>
            <img src={ads3} alt="Ad 3" />
          </ImageBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Ad;
