import { Backdrop, Button, CircularProgress } from "@mui/material";

function Loaderr() {
  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Loaderr;
