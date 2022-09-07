export type TUserData = {
  userName: string;
  password?: string;
  email: string;
  createdAt: string;
  googleAuth?: boolean;
  passwordHash?: string;
  token?: string;
  updatedAt: string;
  _id: string;
};

export interface IUserSliceState {
  user: TUserData | null;
  isLoading: boolean;
  isMember: boolean;
}
export type TRegisterParams = {
  userName?: string;
  password?: string;
  email?: string;
};
export type TLoginParams = {
  password?: string;
  email?: string;
};
export type TUpdateParams = {
  newUsername?: string;
  newEmail?: string;
  userId?: string;
};
export type TGoogleAuthParams = {
  email?: string;
  id?: string;
  userName?: string;
};
