import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import AuthHandler from '../../services/authentication/AuthHandler';
import { HashRouter } from 'react-router-dom';
import AppLayout from './AppLayout';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AuthHandler/>
        <AppLayout/>
      </HashRouter>
    </Provider>
  );
}

export default App;
