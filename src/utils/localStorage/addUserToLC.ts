interface IUser {
  _id: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  __v?: string;
}

export const addUserToLocalStorage = (user: IUser, token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("user", JSON.stringify(user));
};

export const updateUserToLocalStorage = (user: IUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};
