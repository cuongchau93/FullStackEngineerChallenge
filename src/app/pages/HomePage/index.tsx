import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { LoginComponent } from './components/LoginComponent';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsLoggedin } from './slice/selectors';
import { Title } from './components/Title';
import { SubTitle } from './components/SubTitle';
import { A } from 'app/components/A';
import { useHistory } from 'react-router-dom';

export function HomePage() {
  const isLoggedin = useSelector(selectIsLoggedin);
  const isAdmin = useSelector(selectIsAdmin);
  const history = useHistory();

  const handleUserManagementClick = () => {
    history.push('/users');
  };
  const handleFeedbackManagementClick = () => {
    history.push('/feedbacks');
  };

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
            <ul>
              {isAdmin && (
                <li>
                  <A onClick={handleUserManagementClick}>Users Management</A>
                </li>
              )}
              <li>
                <A onClick={handleFeedbackManagementClick}>
                  Feedbacks Management
                </A>
              </li>
            </ul>
          </>
        )}
      </PageWrapper>
    </>
  );
}
