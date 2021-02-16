import { PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from 'app/pages/HomePage/slice/saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { FeedbacksPageActions as actions } from '.';
import { selectAllFeedbacks, selectSelectedFeedback } from './selectors';
import { EditFeedbackInfo, NewFeedbackInfo } from './types';

export function* getFeedbacks() {
  //todo add limits
  // and total counts
  const requestURL = `${SERVER_URL}/feedbacks`;
  const token = localStorage.token;
  yield put(actions.updateLoading({ loading: true }));

  try {
    const response = yield call(request, requestURL, {
      headers: {
        auth: token,
      },
    });
    yield put(actions.updateFeedbacks(response));
    yield put(actions.updateLoading({ loading: false }));
    return response;
  } catch (e) {
    yield put(actions.updateLoading({ loading: false, error: e.message }));
  }
}

export function* removeFeedback(action: PayloadAction<number>) {
  const requestURL = `${SERVER_URL}/feedbacks/${action.payload}`;
  const token = localStorage.token;
  yield put(actions.updateLoading({ loading: true }));

  try {
    yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        auth: token,
      },
    });
    yield call(removeFeedbackFromState, action.payload);
    yield put(actions.updateLoading({ loading: false }));
  } catch (e) {
    yield put(actions.updateLoading({ loading: false, error: e.message }));
  }
}

export function* addFeedback(action: PayloadAction<NewFeedbackInfo>) {
  const requestURL = `${SERVER_URL}/feedbacks`;
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
        description: action.payload.description,
        givenById: action.payload.givenById,
        belongsToId: action.payload.belongsToId,
      }),
    });
    yield call(getFeedbacks);
  } catch (e) {
    yield put(actions.updateLoading({ loading: false, error: e.message }));
  }
}

export function* checkUserConstraints(action: PayloadAction<EditFeedbackInfo>) {
  // const feedbacks = yield select(selectAllFeedbacks);
  // for (let i = 0; i < feedbacks.length; ++i) {
  //   if (action.payload.description === feedbacks[i].description) {
  //     return {
  //       message: 'Username is not unique',
  //     };
  //   }
  // }
  return null;
}
export function* editFeedback(action: PayloadAction<EditFeedbackInfo>) {
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
  const selectedFeedback = yield select(selectSelectedFeedback);
  const requestURL = `${SERVER_URL}/feedbacks/${selectedFeedback.id}`;
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
        description: action.payload.description,
      }),
    });
    yield call(getFeedbacks);
  } catch (e) {
    yield put(actions.updateLoading({ loading: false, error: e.message }));
  }
}

export function* removeFeedbackFromState(id: number) {
  const feedbacks = yield select(selectAllFeedbacks);
  yield put(actions.updateFeedbacks(feedbacks.filter(u => u.id !== id)));
}

export function* feedbacksPageSagas() {
  yield takeLatest(actions.getAllFeedbacks.type, getFeedbacks);
  yield takeLatest(actions.removeFeedback.type, removeFeedback);
  yield takeLatest(actions.addNewFeedback.type, addFeedback);
  yield takeLatest(actions.editFeedback.type, editFeedback);
}
