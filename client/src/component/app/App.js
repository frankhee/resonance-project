import React from 'react';
import { Provider } from "react-redux";
import store from '../../store';
import { BrowserRouter } from "react-router-dom";
import AppLayout from './AppLayout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
