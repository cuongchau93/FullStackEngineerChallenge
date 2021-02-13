export interface MyJWT {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

interface Feedback {
  id: number;
  description: string;
  createdBy: number;
}

export interface LoginPayload {
  username: string;
  password: string;
}
export interface UserInfo {
  id: number;
  username: string;
  role: string;
  token: string;
  feedbacks: Feedback[];
}
/* --- STATE --- */
export interface HomeState {
  userInfo: UserInfo | null;
  loading: boolean;
  error?: string;
}
