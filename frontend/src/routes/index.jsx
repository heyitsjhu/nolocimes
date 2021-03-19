import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from 'const';

const AnbuBlockchainPage = lazy(() => import('pages/AnbuBlockchain/AnbuBlockchain'));
const BlogPage = lazy(() => import('pages/Blog/Blog'));
const BlogPostPage = lazy(() => import('pages/BlogPost/BlogPost'));
const CandleMonkeysPage = lazy(() => import('pages/CandleMonkeys/CandleMonkeys'));
const CandleMonkeysTickerPage = lazy(() => import('pages/CandleMonkeysTicker/CandleMonkeysTicker'));
const CoronavirusPage = lazy(() => import('pages/Coronavirus/Coronavirus'));
const PageNotFoundPage = lazy(() => import('pages/PageNotFound/PageNotFound'));
const PhotographyPage = lazy(() => import('pages/Photography/Photography'));
const PoweredByScrollPage = lazy(() => import('pages/PoweredByScroll/PoweredByScroll'));
const PrivacyPolicyPage = lazy(() => import('pages/PrivacyPolicy/PrivacyPolicy'));
const StyleGuidePage = lazy(() => import('pages/StyleGuide/StyleGuide'));

// TODO: Add a proper loading component to Suspense
const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path={ROUTES.HOME} />
      <Route exact path={ROUTES.ANBU_BLOCKCHAIN}>
        <AnbuBlockchainPage />
      </Route>
      <Route exact path={ROUTES.BLOG}>
        <BlogPage />
      </Route>
      <Route path={ROUTES.BLOG_POST}>
        <BlogPostPage />
      </Route>
      <Route exact path={ROUTES.CANDLE_MONKEYS}>
        <CandleMonkeysPage />
      </Route>
      <Route path={ROUTES.CANDLE_MONKEYS_TICKER}>
        <CandleMonkeysTickerPage />
      </Route>
      <Route path={ROUTES.CORONAVIRUS}>
        <CoronavirusPage />
      </Route>
      <Route exact path={ROUTES.PHOTOGRAPHY}>
        <PhotographyPage />
      </Route>
      <Route exact path={ROUTES.POWERED_BY_SCROLL}>
        <PoweredByScrollPage />
      </Route>
      <Route exact path={ROUTES.PRIVACY_POLICY}>
        <PrivacyPolicyPage />
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
  </Suspense>
);

export default AppRoutes;
