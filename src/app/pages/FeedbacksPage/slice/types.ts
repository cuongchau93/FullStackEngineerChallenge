export interface MyJWT {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

export type NewFeedbackInfo = Omit<FeedbackInfo, 'id'>;

export interface EditFeedbackInfo {
  description: string;
}
export interface FeedbackInfo {
  id: number;
  description: string;
  givenById: number;
  belongsToId: number;
  givenBy?: string; // employee account use this instead of id
  belongsTo?: string;
}

export interface FeedbacksPageState {
  isFetched: Boolean;
  feedbacks: FeedbackInfo[];
  selectedFeedback: FeedbackInfo | null;
  loading: boolean;
  error?: string;
}
