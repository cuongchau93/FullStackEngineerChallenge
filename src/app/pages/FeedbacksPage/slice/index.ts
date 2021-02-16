import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { feedbacksPageSagas } from './saga';
import {
  FeedbacksPageState,
  FeedbackInfo,
  NewFeedbackInfo,
  EditFeedbackInfo,
} from './types';

export const initialState: FeedbacksPageState = {
  feedbacks: [],
  selectedFeedback: null,
  loading: false,
};

const slice = createSlice({
  name: 'feedbacksPage',
  initialState,
  reducers: {
    getAllFeedbacks() {},
    selectFeedback(state, action: PayloadAction<number>) {
      return {
        ...state,
        selectedFeedback: state.feedbacks[action.payload],
      };
    },
    removeFeedback(state, action: PayloadAction<number>) {},
    editFeedback(state, action: PayloadAction<EditFeedbackInfo>) {},
    addNewFeedback(state, action: PayloadAction<NewFeedbackInfo>) {},
    updateLoading(
      state,
      action: PayloadAction<{ loading: boolean; error?: string }>,
    ) {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    updateFeedbacks(state, action: PayloadAction<FeedbackInfo[]>) {
      return {
        ...state,
        feedbacks: action.payload,
        selectedFeedback: null,
      };
    },
  },
});

export const { actions: FeedbacksPageActions, reducer } = slice;

export const useFeedbacksPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: feedbacksPageSagas });
  return { actions: slice.actions };
};
