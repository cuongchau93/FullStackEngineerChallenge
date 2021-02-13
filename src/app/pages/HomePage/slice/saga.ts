import { loadavg } from 'os';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { homepageActions as actions } from '.';
const SERVER_URL = 'http://localhost:3000';

export function* userLogout() {
  localStorage.removeItem('token');
  yield put(actions.updateUser(null));
  window.location.href = '/login'; // redirect to login page
}

export function* getUserData(token: string) {
  const requestURL = `${SERVER_URL}/users/self`;
  const response = yield call(request, requestURL, {
    headers: {
      auth: token,
    },
  });
  return response;
}

export function* userLogin(action) {
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
    const userInfo = yield call(getUserData, response.token);

    yield put(actions.updateUser(userInfo));
    // dispatch({ type: CLEAR_ERRORS });
    // console.log(response);
  } catch (err) {
    console.error(err);
    yield put(actions.updateLoading({ loading: false, error: err.message }));
    // yield put(repoLoadingError(err));
  }
}

/**
 * Github repos request/response handler
 */
// export function* getRepos() {
//   yield delay(500);
//   // Select username from store
//   const username: string = yield select(selectUsername);
//   if (username.length === 0) {
//     yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
//     return;
//   }
//   const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

//   try {
//     // Call our request helper (see 'utils/request')
//     const repos: Repo[] = yield call(request, requestURL);
//     if (repos?.length > 0) {
//       yield put(actions.reposLoaded(repos));
//     } else {
//       yield put(actions.repoError(RepoErrorType.USER_HAS_NO_REPO));
//     }
//   } catch (err) {
//     if (err.response?.status === 404) {
//       yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
//     } else if (err.message === 'Failed to fetch') {
//       yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
//     } else {
//       yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
//     }
//   }
// }

/**
 * Root saga manages watcher lifecycle
 */
export function* homeSagas() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loginUser.type, userLogin);
}
