import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { usersManagementSagas } from './saga';
import { UserManagementState, UserInfo } from './types';

export const initialState: UserManagementState = {
  users: [],
  loading: false,
};

const slice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    getAllUsersAtPage() {},
    updateLoading(
      state,
      action: PayloadAction<{ loading: boolean; error?: string }>,
    ) {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    updateUsers(state, action: PayloadAction<UserInfo[]>) {
      state.users = [...state.users, ...action.payload];
    },
  },
});

export const { actions: UserManagementPageActions, reducer } = slice;

export const useUserManagementPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: usersManagementSagas });
  return { actions: slice.actions };
};
