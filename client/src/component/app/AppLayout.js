import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppRoutes from './AppRoutes';

const useStyle = makeStyles(() => ({
  pageContainer: {
    margin: "0px",
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
  },
}));

function Layout() {
  const classes = useStyle();
  return (
    <div className={classes.pageContainer}>
      <AppRoutes/>
    </div>
  );
}

export default Layout;

