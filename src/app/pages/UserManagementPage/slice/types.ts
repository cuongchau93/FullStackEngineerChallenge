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

export interface NewUserInfo {
  username: string;
  password: string;
  role: string;
}
export interface EditUserInfo {
  username: string;
  role: string;
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
  selectedUser: UserInfo | null;
  loading: boolean;
  error?: string;
}
