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
  isFetched: false,
  feedbacks: [],
  selectedFeedback: null,
  loading: false,
};

const slice = createSlice({
  name: 'feedbacksPage',
  initialState,
  reducers: {
    resetState() {
      return {
        ...initialState,
      };
    },
    getAllFeedbacks() {},
    getSelfFeedbacks() {},
    selectFeedback(state, action: PayloadAction<FeedbackInfo | null>) {
      return {
        ...state,
        selectedFeedback:
          action.payload !== null
            ? state.feedbacks.filter(f => f.id === action.payload?.id)[0]
            : null,
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
    updateIsFetched(state, action: PayloadAction<Boolean>) {
      state.isFetched = action.payload;
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

export const { actions: feedbacksPageActions, reducer } = slice;

export const useFeedbacksPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: feedbacksPageSagas });
  return { actions: slice.actions };
};
