import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'const';
import { BlogPage } from 'pages';

const AppRoutes = () => (
  <Switch>
    <Route exact path={ROUTES.HOME} />
    <Route path={ROUTES.BLOG}>
      <BlogPage />
    </Route>
  </Switch>
);

export default AppRoutes;
