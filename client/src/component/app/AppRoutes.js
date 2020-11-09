import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute';
import { makeStyles } from '@material-ui/core';
import { Login, Register, Catalog } from '../../pages';

const useStyle = makeStyles(() => ({
  main_page_container: {
    width: '100%',
    height: '100%',
  },
}));

function AppRoutes() {
  const classes = useStyle();

  return (
    <div className={classes.main_page_container}>
      <Switch>
        <Route exact path="/api/users/login" component={Login}/>
        <Route exact path="/api/users/register" component={Register}/>
        <PrivateRoute exact path="/api/products/allproducts" component={Catalog}/>
      </Switch>
    </div>
  )
}

export default AppRoutes;