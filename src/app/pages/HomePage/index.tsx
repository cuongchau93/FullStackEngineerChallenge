import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { LoginComponent } from './components/LoginComponent';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsLoggedin } from './slice/selectors';
import { Title } from './components/Title';
import { SubTitle } from './components/SubTitle';
import { A } from 'app/components/A';

export function HomePage() {
  const isLoggedin = useSelector(selectIsLoggedin);
  const isAdmin = useSelector(selectIsAdmin);

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
            <SubTitle>Allowed Actions:</SubTitle>
            {isAdmin ? (
              <>
                <ul>
                  <li>
                    <A href="/users">Users Management</A>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul>
                  <li>
                    <A href="/assigned-feedbacks">View assigned feedback</A>
                  </li>
                </ul>
              </>
            )}
          </>
        )}
      </PageWrapper>
    </>
  );
}
