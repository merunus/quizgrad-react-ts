export type TDataArgs = {
  userName: string;
  password: string;
  email: string;
};

export interface IUserSliceState {
  user: TDataArgs | any;
  isLoading: boolean;
  isMember: boolean;
}
