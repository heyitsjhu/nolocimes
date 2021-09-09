import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FEATURE_FLAGS, IS_DEV, ROUTES } from 'const';

const AnbuBlockchainPage = lazy(() => import('pages/AnbuBlockchain/AnbuBlockchain'));
const BlogPage = lazy(() => import('pages/Blog/Blog'));
const BlogPostPage = lazy(() => import('pages/BlogPost/BlogPost'));
const CandleMonkeysPage = lazy(() => import('pages/CandleMonkeys/CandleMonkeys'));
const CoronavirusPage = lazy(() => import('pages/Coronavirus/Coronavirus'));
const PageNotFoundPage = lazy(() => import('pages/PageNotFound/PageNotFound'));
const PhotographyPage = lazy(() => import('pages/Photography/Photography'));
const PoweredByScrollPage = lazy(() => import('pages/PoweredByScroll/PoweredByScroll'));
const PrivacyPolicyPage = lazy(() => import('pages/PrivacyPolicy/PrivacyPolicy'));
const AboutPage = lazy(() => import('pages/About/About'));
const StyleGuidePage = lazy(() => import('pages/StyleGuide/StyleGuide'));

const isFeatureOn = featureFlag => {
  return featureFlag;
  return IS_DEV || featureFlag;
};

const AppRoutes = () => (
  // TODO: Add a proper loading component to Suspense
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path={ROUTES.HOME} />
      {isFeatureOn(FEATURE_FLAGS.ABOUT) && (
        <Route exact path={ROUTES.ABOUT}>
          <AboutPage />
        </Route>
      )}
      {isFeatureOn(FEATURE_FLAGS.ANBU_BLOCKCHAIN) && (
        <Route exact path={ROUTES.ANBU_BLOCKCHAIN}>
          <AnbuBlockchainPage />
        </Route>
      )}
      {isFeatureOn(FEATURE_FLAGS.BLOG) && (
        <Route exact path={ROUTES.BLOG}>
          <BlogPage />
        </Route>
      )}
      {isFeatureOn(FEATURE_FLAGS.BLOG_POST) && (
        <Route path={ROUTES.BLOG_POST}>
          <BlogPostPage />
        </Route>
      )}
      {isFeatureOn(FEATURE_FLAGS.CANDLE_MONKEYS) && (
        <Route exact path={ROUTES.CANDLE_MONKEYS}>
          <CandleMonkeysPage />
        </Route>
      )}
      {isFeatureOn(FEATURE_FLAGS.CORONAVIRUS) && (
        <Route path={ROUTES.CORONAVIRUS}>
          <CoronavirusPage />
        </Route>
      )}
      {isFeatureOn(FEATURE_FLAGS.PHOTOGRAPHY) && (
        <Route exact path={ROUTES.PHOTOGRAPHY}>
          <PhotographyPage />
        </Route>
      )}
      {isFeatureOn(FEATURE_FLAGS.POWERED_BY_SCROLL) && (
        <Route exact path={ROUTES.POWERED_BY_SCROLL}>
          <PoweredByScrollPage />
        </Route>
      )}
      {isFeatureOn(FEATURE_FLAGS.PRIVACY_POLICY) && (
        <Route exact path={ROUTES.PRIVACY_POLICY}>
          <PrivacyPolicyPage />
        </Route>
      )}
      {isFeatureOn(FEATURE_FLAGS.STYLE_GUIDE) && (
        <Route exact path={ROUTES.STYLE_GUIDE}>
          <StyleGuidePage />
        </Route>
      )}
      <Route path="*">
        <PageNotFoundPage />
      </Route>
    </Switch>
  </Suspense>
);

export default AppRoutes;
