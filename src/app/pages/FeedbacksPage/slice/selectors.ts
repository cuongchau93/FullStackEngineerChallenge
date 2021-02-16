import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.feedbacksPage || initialState;

export const selectAllFeedbacks = createSelector(
  [selectDomain],
  feedbacksPageState => feedbacksPageState.feedbacks,
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
