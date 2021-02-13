/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useHomepageSlice } from './pages/HomePage/slice';
import { useDispatch } from 'react-redux';
import { MyJWT } from './pages/HomePage/slice/types';

export function App() {
  const { i18n } = useTranslation();
  const { actions } = useHomepageSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = localStorage.token;
    if (authToken) {
      const decodedToken = jwtDecode<MyJWT>(authToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(actions.logoutUser());
      } else {
        dispatch(actions.initStateIfNeeded());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
