import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from 'const';
import {
  BlogPage,
  CoronavirusPage,
  PageNotFoundPage,
  PhotographyPage,
  StyleGuidePage,
} from 'pages';

const AppRoutes = () => (
  <Switch>
    <Route exact path={ROUTES.HOME} />
    <Route path={ROUTES.BLOG}>
      <BlogPage />
    </Route>
    <Route path={ROUTES.CORONAVIRUS}>
      <CoronavirusPage />
    </Route>
    <Route exact path={ROUTES.PHOTOGRAPHY}>
      <PhotographyPage />
    </Route>
    <Route exact path={ROUTES.STYLE_GUIDE}>
      <StyleGuidePage />
    </Route>

    <Route exact path={ROUTES.PAGE_NOT_FOUND}>
      <PageNotFoundPage />
    </Route>
    <Redirect
      from="*"
      to={{
        pathname: ROUTES.PAGE_NOT_FOUND,
        state: { unfoundPath: useLocation().pathname },
      }}
    />
  </Switch>
);

export default AppRoutes;
