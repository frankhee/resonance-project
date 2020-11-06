import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../ui/Header";
import AppRoutes from "./AppRoutes";

const useStyle = makeStyles((theme) => ({
  pageContainer: {
    margin: "0px",
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100vw",
    height: "100vh",
  },
}));

function Layout() {
  const classes = useStyle();
  return (
    <div className={classes.pageContainer}>
      <Header>
        <AppRoutes/>
      </Header>
    </div>
  );
}

export default Layout;

