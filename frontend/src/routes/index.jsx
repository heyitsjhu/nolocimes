import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'const';
import { BlogPage, PhotographyPage, StyleGuidePage } from 'pages';

const AppRoutes = () => (
  <Switch>
    <Route exact path={ROUTES.HOME} />
    <Route path={ROUTES.BLOG}>
      <BlogPage />
    </Route>
    <Route exact path={ROUTES.PHOTOGRAPHY}>
      <PhotographyPage />
    </Route>
    <Route path={ROUTES.STYLE_GUIDE}>
      <StyleGuidePage />
    </Route>
  </Switch>
);

export default AppRoutes;
