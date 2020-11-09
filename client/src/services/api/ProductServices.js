import HttpRequest from './HttpRequest';

//Request to load product catalog
function getCatalog() {
  return HttpRequest({
    url: `/api/products/allproducts`,
    method: `GET`,
  });
};

//Request to send additional product information to user
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