import React from "react";
import { Outlet } from "react-router";

function DashBoardLayout() {
  return (
    <>
      <h1>Admin Page</h1>
      <Outlet />
      <p>end admin page</p>
    </>
  );
}

export default DashBoardLayout;
