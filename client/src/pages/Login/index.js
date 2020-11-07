import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/userActions';
import Layout from './Layout';

const mapStateToProps = (state) => ({
  auth: state.user,
  error: state.error
});

const mapDispatchToProps = {
  loginUser: loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);