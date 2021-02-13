import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { homeSagas } from './saga';
import { HomeState, LoginPayload, UserInfo } from './types';

export const initialState: HomeState = {
  userInfo: null,
  loading: false,
};

const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<LoginPayload>) {},
    logoutUser() {},
    initStateIfNeeded() {},
    updateLoading(
      state,
      action: PayloadAction<{ loading: boolean; error?: string }>,
    ) {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    updateUser(state, action: PayloadAction<UserInfo | null>) {
      state.userInfo = action.payload;
    },
  },
});

export const { actions: homepageActions, reducer } = slice;

export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: homeSagas });
  return { actions: slice.actions };
};
