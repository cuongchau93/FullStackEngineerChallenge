import { PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from 'app/pages/HomePage/slice/saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { userManagementPageActions as actions } from '.';
import { selectAllUsers, selectSelectedUser } from './selectors';
import { EditUserInfo, NewUserInfo } from './types';

export function* getUsers() {
  //todo add limits
  // and total counts
  const requestURL = `${SERVER_URL}/users`;
  const token = localStorage.token;
  yield put(actions.updateLoading({ loading: true }));

  try {
    const response = yield call(request, requestURL, {
      headers: {
        auth: token,
      },
    });
    yield put(actions.updateUsers(response));
    yield put(actions.updateLoading({ loading: false }));
    return response;
  } catch (e) {
    yield put(actions.updateLoading({ loading: false, error: e.message }));
  }
}

export function* removeUser(action: PayloadAction<number>) {
  const requestURL = `${SERVER_URL}/users/${action.payload}`;
  const token = localStorage.token;
  yield put(actions.updateLoading({ loading: true }));

  try {
    yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        auth: token,
      },
    });
    yield call(removeUserFromState, action.payload);
    yield put(actions.updateLoading({ loading: false }));
  } catch (e) {
    yield put(actions.updateLoading({ loading: false, error: e.message }));
  }
}

export function* addUser(action: PayloadAction<NewUserInfo>) {
  const requestURL = `${SERVER_URL}/users`;
  const token = localStorage.token;
  yield put(actions.updateLoading({ loading: true }));

  try {
    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        auth: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: action.payload.username,
        password: action.payload.password,
        role: action.payload.role,
      }),
    });
    yield call(getUsers);
  } catch (e) {
    yield put(actions.updateLoading({ loading: false, error: e.message }));
  }
}

export function* checkUserConstraints(action: PayloadAction<EditUserInfo>) {
  const users = yield select(selectAllUsers);
  for (let i = 0; i < users.length; ++i) {
    if (action.payload.username === users[i].username) {
      return {
        message: 'Username is not unique',
      };
    }
  }
  return null;
}
export function* editUser(action: PayloadAction<EditUserInfo>) {
  const userInfoHasError = yield call(checkUserConstraints, action);
  if (userInfoHasError) {
    yield put(
      actions.updateLoading({
        loading: false,
        error: userInfoHasError.message,
      }),
    );
    return;
  }
  const selectedUser = yield select(selectSelectedUser);
  const requestURL = `${SERVER_URL}/users/${selectedUser.id}`;
  const token = localStorage.token;
  yield put(actions.updateLoading({ loading: true }));

  try {
    yield call(request, requestURL, {
      method: 'PATCH',
      headers: {
        auth: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: action.payload.username,
        role: action.payload.role,
      }),
    });
    yield call(getUsers);
  } catch (e) {
    yield put(actions.updateLoading({ loading: false, error: e.message }));
  }
}

export function* removeUserFromState(id: number) {
  const users = yield select(selectAllUsers);
  yield put(actions.updateUsers(users.filter(u => u.id !== id)));
}

export function* userManagementSagas() {
  yield takeLatest(actions.getAllUsersAtPage.type, getUsers);
  yield takeLatest(actions.removeUser.type, removeUser);
  yield takeLatest(actions.addNewUser.type, addUser);
  yield takeLatest(actions.editUser.type, editUser);
}
