import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.userManagement || initialState;

export const selectAllUsers = createSelector(
  [selectDomain],
  userManagementState => userManagementState.users,
);

export const selectSelectedUser = createSelector(
  [selectDomain],
  userManagementState => userManagementState.selectedUser,
);

export const selectIsLoading = createSelector(
  [selectDomain],
  userManagementState => userManagementState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  userManagementState => userManagementState.error,
);
