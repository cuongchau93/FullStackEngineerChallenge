import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { Title } from './components/Title';
import { UserTable } from './components/UserTable';

export function UserManagementPage() {
  return (
    <>
      <Helmet>
        <title>User Management Page</title>
        <meta
          name="description"
          content="A React Boilerplate application UserManagementPage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Title>Feedback Management</Title>
        <UserTable />
      </PageWrapper>
    </>
  );
}
