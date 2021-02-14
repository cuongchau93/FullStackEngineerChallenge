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

export interface UserInfo {
  id: number;
  username: string;
  role: string;
  token: string;
  feedbacks: Feedback[];
}

export interface UserManagementState {
  users: UserInfo[];
  loading: boolean;
  error?: string;
}
