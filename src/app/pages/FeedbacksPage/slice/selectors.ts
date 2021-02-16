import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.feedbacksPage || initialState;
const selectCurrentUser = (state: RootState) => state.home.userInfo;

export const selectIsFetched = createSelector(
  [selectDomain],
  feedbacksPageState => feedbacksPageState.isFetched,
);

export const selectAllFeedbacks = createSelector(
  [selectDomain],
  feedbacksPageState => feedbacksPageState.feedbacks,
);

export const selectPendingFeedbacks = createSelector(
  [selectDomain, selectCurrentUser],
  (feedbacksPageState, currentUser) =>
    feedbacksPageState.feedbacks.filter(
      f => f.givenBy === currentUser?.username,
    ),
);

export const selectSelectedFeedback = createSelector(
  [selectDomain],
  feedbacksPageState => feedbacksPageState.selectedFeedback,
);

export const selectIsLoading = createSelector(
  [selectDomain],
  feedbacksPageState => feedbacksPageState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  feedbacksPageState => feedbacksPageState.error,
);
