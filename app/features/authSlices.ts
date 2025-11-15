import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/userTypes";
import axios from "axios";
import { TLoginTypes } from "../types/loginTypes";

interface IInitialState {
  loading: boolean;
  error: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: IInitialState = {
  error: null,
  isAuthenticated: false,
  loading: false,
  user: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: TLoginTypes, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      return response.data.data.existingUser;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);

export const fetchLoginUser = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>("user/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/auth/me`);
    return response.data?.user as IUser;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const logOutUserThunk = createAsyncThunk(
  "user/logOutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/api/auth/logout");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });

    builder
      .addCase(logOutUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlices.reducer;
export const authActions = authSlices.actions;
