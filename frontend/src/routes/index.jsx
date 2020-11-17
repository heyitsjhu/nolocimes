import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'const';

const AppRoutes = () => (
  <Switch>
    <Route exact path={ROUTES.HOME} />
  </Switch>
);

export default AppRoutes;
