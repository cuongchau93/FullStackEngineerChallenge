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
}

export interface FeedbacksPageState {
  feedbacks: FeedbackInfo[];
  selectedFeedback: FeedbackInfo | null;
  loading: boolean;
  error?: string;
}
