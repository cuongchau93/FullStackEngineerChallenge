import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { LoginComponent } from './components/LoginComponent';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <LoginComponent />
      </PageWrapper>
    </>
  );
}
