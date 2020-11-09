import HttpRequest from './HttpRequest';

function getCatalog() {
  return HttpRequest({
    url: `/api/products/allproducts`,
    method: `GET`,
  });
};

function getProduct(id) {
  return HttpRequest({
    url: `/api/products/product`,
    method: `POST`,
    data: id
  });
};

const ProductServices = {
  getCatalog,
  getProduct
};

export default ProductServices;