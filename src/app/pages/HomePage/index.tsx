import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { LoginComponent } from './components/LoginComponent';
import { useSelector } from 'react-redux';
import { selectIsLoggedin } from './slice/selectors';
import { Title } from './components/Title';

export function HomePage() {
  const isLoggedin = useSelector(selectIsLoggedin);

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
        {!isLoggedin ? (
          <LoginComponent />
        ) : (
          <>
            <Title>Feedback Management</Title>
          </>
        )}
      </PageWrapper>
    </>
  );
}
