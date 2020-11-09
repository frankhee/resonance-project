import ProductServices from '../../services/api/ProductServices';

export const LOAD_PRODUCT_START = "LOAD_PRODUCT_START";
export const LOAD_PRODUCT_SUCCESS = "LOAD_PRODUCT_SUCCESS";
export const MOER_PRODUCTS_TO_LOAD = "MOER_PRODUCTS_TO_LOAD";

//Load product catalog
export const loadProduct = () => {
  return function(dispatch) {
    dispatch(loadProductStart())
    return ProductServices.getCatalog()
      .then((result) => {
        dispatch(moreProductsToLoad(result.moreProducts))
        for(let product of result.products) {
          dispatch(loadProductSuccess(product))
        }
      })
      .catch((err) => {
        throw err;
      }) 
  }
};

export const loadProductStart = () => ({
  type: LOAD_PRODUCT_START,
});


export const loadProductSuccess = (result) => {
  return {
    type: LOAD_PRODUCT_SUCCESS,
    payload: result
  };
};

export const moreProductsToLoad = (result) => {
  return {
    type: MOER_PRODUCTS_TO_LOAD,
    payload: result
  };
};

