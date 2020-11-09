import { connect } from 'react-redux';
import { loadProduct } from '../../store/actions/productActions';
import Layout from './Layout';

const mapStateToProps = (state) => ({
  products: state.product.products,
  auth: state.user,
  moreProducts: state.product.moreProducts
});

const mapDispatchToProps = {
  loadProduct: loadProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);