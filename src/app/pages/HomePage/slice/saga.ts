import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { homepageActions as actions } from '.';
import { selectUserInfo } from './selectors';
import { LoginPayload } from './types';
import { userManagementPageActions } from 'app/pages/UserManagementPage/slice';

export const SERVER_URL = 'http://localhost:3001';

export function* userLogout() {
  localStorage.removeItem('token');
  yield put(actions.updateUser(null));
  yield put(userManagementPageActions.updateUsers([]));
}

export function* getSelfData(token: string) {
  const requestURL = `${SERVER_URL}/users/self`;
  const response = yield call(request, requestURL, {
    headers: {
      auth: token,
    },
  });
  return response;
}

export function* userLogin(action: PayloadAction<LoginPayload>) {
  const requestURL = `${SERVER_URL}/auth/login`;
  yield put(actions.updateLoading({ loading: true }));

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: action.payload.username,
        // no encryption, https is created for that
        password: action.payload.password,
      }),
    });

    localStorage.setItem('token', response.token); // setting token to local storage
    const userInfo = yield call(getSelfData, response.token);

    yield put(actions.updateUser(userInfo));
    yield put(actions.updateLoading({ loading: false }));
  } catch (err) {
    yield put(actions.updateLoading({ loading: false, error: err.message }));
  }
}

export function* initStateIfNeeded() {
  const userInfo = yield select(selectUserInfo);

  if (userInfo !== null) {
    return;
  }

  yield put(actions.updateLoading({ loading: true }));

  try {
    const userInfo = yield call(getSelfData, localStorage.token);

    yield put(actions.updateUser(userInfo));
    yield put(actions.updateLoading({ loading: false }));
  } catch (err) {
    console.error(err);
    yield put(actions.updateLoading({ loading: false, error: err.message }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* homeSagas() {
  yield takeLatest(actions.loginUser.type, userLogin);
  yield takeLatest(actions.initStateIfNeeded.type, initStateIfNeeded);
  yield takeLatest(actions.logoutUser.type, userLogout);
}
