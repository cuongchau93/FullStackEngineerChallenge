import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.home || initialState;

export const selectUserInfo = createSelector(
  [selectDomain],
  homeState => homeState.userInfo,
);

export const selectIsAdmin = createSelector(
  [selectDomain],
  homeState => homeState.userInfo?.role === 'ADMIN',
);

export const selectIsLoading = createSelector(
  [selectDomain],
  homeState => homeState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  homeState => homeState.error,
);
