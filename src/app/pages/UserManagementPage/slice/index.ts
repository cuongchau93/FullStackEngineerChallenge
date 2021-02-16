import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userManagementSagas } from './saga';
import {
  UserManagementState,
  UserInfo,
  NewUserInfo,
  EditUserInfo,
} from './types';

export const initialState: UserManagementState = {
  users: [],
  selectedUser: null,
  loading: false,
};

const slice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    resetState() {
      return {
        ...initialState,
      };
    },
    getAllUsersAtPage() {},
    selectUser(state, action: PayloadAction<number>) {
      return {
        ...state,
        selectedUser: state.users[action.payload],
      };
    },
    removeUser(state, action: PayloadAction<number>) {},
    editUser(state, action: PayloadAction<EditUserInfo>) {},
    addNewUser(state, action: PayloadAction<NewUserInfo>) {},
    addNewFeedback() {},
    updateLoading(
      state,
      action: PayloadAction<{ loading: boolean; error?: string }>,
    ) {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    updateUsers(state, action: PayloadAction<UserInfo[]>) {
      return {
        ...state,
        users: action.payload,
        selectedUser: null,
      };
    },
  },
});

export const { actions: userManagementPageActions, reducer } = slice;

export const useUserManagementPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userManagementSagas });
  return { actions: slice.actions };
};
