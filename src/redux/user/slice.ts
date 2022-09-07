import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AxiosEndpoints } from "../../models/axios-routes";
import customAxios from "../../utils/customAxios";
import {
  addUserToLocalStorage,
  updateUserToLocalStorage,
} from "../../utils/localStorage/addUserToLC";
import { getUserFromLocalStorage } from "../../utils/localStorage/getUserFromLC";
import { removeUserFromLocalStorage } from "../../utils/localStorage/removeUserFromLC";
import {
  IUserSliceState,
  TGoogleAuthParams,
  TLoginParams,
  TRegisterParams,
  TUpdateParams,
} from "./types";

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (params: TLoginParams, thunkAPI) => {
    try {
      const { data } = await customAxios.post(AxiosEndpoints.Login, params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Please provide valid email and password!"
      );
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async (params: TRegisterParams, thunkAPI) => {
    try {
      const { data } = await customAxios.post(AxiosEndpoints.Register, params);
      return data;
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err.message === "Request failed with status code 500") {
        return thunkAPI.rejectWithValue("This email already used!");
      }
      const errMessage = err.response?.data[0].msg;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (params: TUpdateParams, thunkAPI) => {
    const { userId, newEmail, newUsername } = params;
    try {
      const { data } = await customAxios.patch(
        `${AxiosEndpoints.UpdateUser}/${userId}`,
        {
          newEmail,
          newUsername,
        }
      );
      return data;
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err.message === "Request failed with status code 500") {
        return thunkAPI.rejectWithValue("This email already used!");
      }
      const errMessage = err.response?.data[0].msg;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const fetchGoogleAuth = createAsyncThunk(
  "user/fetchGoogleAuth",
  async (params: TGoogleAuthParams, thunkAPI) => {
    try {
      const { data } = await customAxios.post(
        AxiosEndpoints.GoogleAuth,
        params
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Something went wrong! Please try again later."
      );
    }
  }
);

const initialState: IUserSliceState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
  isMember: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleIsMember: (state) => {
      state.isMember = !state.isMember;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      toast(payload, {
        type: "info",
        autoClose: 1000,
      });
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    // Register

    builder.addCase(fetchRegister.pending, (state) => {
      state.isLoading = true;
      state.user = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      toast("Account was successfully created", {
        type: "success",
        autoClose: 1500,
      });
      if ("token" in action.payload) {
        addUserToLocalStorage(action.payload, action.payload.token);
      }
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      toast("Please provide valid email and password", {
        type: "error",
        autoClose: 1500,
      });
    });

    // Login

    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true;
      state.user = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      toast(`Welcome back ${action.payload.userName}`, {
        type: "success",
        autoClose: 1500,
      });
      if ("token" in action.payload) {
        addUserToLocalStorage(action.payload, action.payload.token);
      }
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      toast("Please provide valid email and password!", {
        type: "error",
        autoClose: 1500,
      });
    });

    // Update User

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload[0];
      toast("Account was successfully updated", {
        type: "success",
        autoClose: 1000,
      });
      updateUserToLocalStorage(payload[0]);
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
      toast("Error while updating user!", {
        type: "error",
        autoClose: 1500,
      });
    });

    // Google Auth

    builder.addCase(fetchGoogleAuth.pending, (state) => {
      state.isLoading = true;
      state.user = null;
    });
    builder.addCase(fetchGoogleAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      toast(`Welcome ${action.payload.userName}`, {
        type: "success",
        autoClose: 1500,
      });
      if ("token" in action.payload) {
        addUserToLocalStorage(action.payload, action.payload.token);
      }
    });
    builder.addCase(fetchGoogleAuth.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      toast("Error while trying google authentication", {
        type: "error",
        autoClose: 1500,
      });
    });
  },
});
export const { toggleIsMember, logoutUser } = userSlice.actions;

export default userSlice.reducer;
