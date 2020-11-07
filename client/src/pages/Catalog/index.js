import { connect } from 'react-redux';
// import { registerUser } from '../../store/actions/userActions';
import Layout from './Layout';

const mapStateToProps = (state) => ({
  // auth: state.auth,
  // errors: state.errors
});

const mapDispatchToProps = {
  // registerUser: registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);