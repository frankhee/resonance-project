import React, { useState } from "react";
import PropTypes from "prop-types";
import ProductQuickView from "../ProductQuickView";
import {
   makeStyles,
   Box,
   Card,
   CardActionArea,
   CardContent,
   CardMedia,
   Typography,
   Modal,
   Backdrop,
   Fade
 } from "@material-ui/core";
 
const useStyle = makeStyles((theme) => ({
  root: {
    margin: 30,
    maxWidth: 345,
    height: 435,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  media: {
    height: 300,
  },
  vendorName: {
    position: 'absolute',
    bottom: 8,
    left: 8
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function ProductCard({ id, product }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyle();

  function handleOpen() {
    setIsOpen(true);
  };

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.Picture[0].url}
          onClick={() => handleOpen()}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align='center'>
            {product.Name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.vendorName}>
        <Typography color="textSecondary" component="p">
          {product.Vendor}
        </Typography>
      </div>
    </Card>
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      >
        <Fade in={isOpen}>
          <Box style={{outline: 'none'}}>
            <ProductQuickView id={id} product={product}/>
          </Box>
        </Fade>
      </Modal>
  </>
  )
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired
};

export default ProductCard;