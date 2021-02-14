import { SERVER_URL } from 'app/pages/HomePage/slice/saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { UserManagementPageActions as actions } from '.';

export function* getUsers(action) {
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

export function* usersManagementSagas() {
  yield takeLatest(actions.getAllUsersAtPage.type, getUsers);
}
