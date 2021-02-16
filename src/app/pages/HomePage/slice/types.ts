export interface MyJWT {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

interface Feedback {
  id: number;
  description: string;
  givenBy: number;
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
  users?: UserInfo[];
  loading: boolean;
  error?: string;
}
