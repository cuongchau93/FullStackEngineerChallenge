import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { Title } from './components/Title';
import { FeedbacksTable } from './components/FeedbacksTable';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../HomePage/slice/selectors';
import { PendingFeedbacksTable } from './components/PendingFeedbacksTable';

export function FeedbacksPage() {
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <>
      <Helmet>
        <title>Feedback Management Page</title>
        <meta
          name="description"
          content="A React Boilerplate application FeedbacksPage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Title>Feedback Management</Title>
        {isAdmin ? <FeedbacksTable /> : <PendingFeedbacksTable />}
      </PageWrapper>
    </>
  );
}
