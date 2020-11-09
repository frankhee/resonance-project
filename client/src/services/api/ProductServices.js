import HttpRequest from './HttpRequest';

function getCatalog() {
  return HttpRequest({
    url: `/api/products/allproducts`,
    method: `GET`,
  });
};

const ProductServices = {
  getCatalog,
};

export default ProductServices;