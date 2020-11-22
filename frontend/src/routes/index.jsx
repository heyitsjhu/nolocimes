import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'const';
import { BlogPage, StyleGuidePage } from 'pages';

const AppRoutes = () => (
  <Switch>
    <Route exact path={ROUTES.HOME} />
    <Route path={ROUTES.BLOG}>
      <BlogPage />
    </Route>
    <Route path={ROUTES.STYLE_GUIDE}>
      <StyleGuidePage />
    </Route>
  </Switch>
);

export default AppRoutes;
