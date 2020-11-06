import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircleRounded } from '@material-ui/icons';
import { Typography, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyle = makeStyles((theme) => ({
  rightHeaderBarContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: "center",
    width: "50%"
  },
  leftHeaderBarContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
    padding: '20px'
  },
  headerBarContainer: {
    backgroundColor: '#F2F3F0',
    borderRadius: "1px",
    border: "1px solid borderGrey",
    color: "black",
    marginBottom: "20px",
    width: "100%",
    height: "54px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.16)'
  },
  mainBodyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
  },
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
  }
}));

function Header({ children }) {
  const classes = useStyle();

  return (
    <div className={classes.pageContainer}>
      <div className={classes.headerBarContainer}> 
        <div className={classes.leftHeaderBarContainer}>
          <Typography variant="h6" noWrap>
              Resonance Catalog
          </Typography>
        </div>
        <div className={classes.rightHeaderBarContainer}>
          <IconButton
            aria-label="access-account"
            onClick={() => console.log("Account button clicked")}
          >
            <AccountCircleRounded color="action" fontSize="large"/>
          </IconButton>
        </div>
      </div>
      <div className={classes.mainBodyContainer}>
        {children}
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.object
};

export default Header;