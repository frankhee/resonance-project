import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../../component/ui/Header";
import ProductCard from "../../component/widgets/ProductCard";
import { makeStyles, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  productContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  pageContainer: {
    width: "100%",
    height: "100%",
  },
  loadButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20
  },
}));

function Layout({ products, auth, loadProduct, moreProducts }) {
  const classes = useStyles();
  const columnSize = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
  };

  function loadMoreProducts() {
    const loadProductAsync = async () => await loadProduct();
    loadProductAsync();
  };

  useEffect(() => {
    const loadProductAsync = async () => await loadProduct();
    if (Object.keys(products).length === 0 && auth.isAuthenticated) {
      loadProductAsync();
    }
  },[auth.isAuthenticated, loadProduct, products])

  return (
    Object.keys(products).length > 0 &&
    <Header>
      <div className={classes.pageContainer}>
        <div className={classes.productContainer}>
          <Grid
            container
            spacing={10}
            style={{
              width: "100%",
              margin: 0,
            }}
          >
            {
              Array.from(Object.keys(products)).map((key, index) => (
              <Grid key={index} item {...columnSize}>
                  <ProductCard 
                    key={key} 
                    id={key}
                    product={products[key]}
                  />
              </Grid>
              ))
            }
          </Grid>
        </div>
        {
          moreProducts &&
          <div className={classes.loadButtonContainer}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => loadMoreProducts()}
            >
              Load More
            </Button>
          </div>
        }
      </div>
    </Header>
  );
}

Layout.propTypes = {
  products: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadProduct: PropTypes.func.isRequired,
  moreProducts: PropTypes.bool.isRequired
};

export default Layout;