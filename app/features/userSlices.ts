import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/userTypes";
import axios from "axios";
import { IResponseType } from "../types/reponseType";

interface IInitialState {
  users: IUser[];
  user: IUser | null
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  users: [],
  loading: false,
  error: null,
  user: null
};

// FETCH SINGLE USER
export const fetchSingleUserThunk = createAsyncThunk<
  IUser,
  { id: string },
  { rejectValue: string }
>("users/fetchSingleUser", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get<IResponseType<IUser>>(`/api/users/${id}`);

    if (!response.data?.data) {
      return rejectWithValue("User not found");
    }

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Failed to fetch user");
  }
});


// ✅ FETCH USERS
export const fetchUsersThunk = createAsyncThunk<
  IUser[],
  { search: string, role: string },
  { rejectValue: string }
>("users/fetchUsers", async ({ role, search }, { rejectWithValue }) => {
  try {
    const response = await axios.get<IResponseType<IUser[]>>(`/api/users?search=${search}&role=${role}`);
    return response.data.data ?? [];
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch users");
  }
});

// ✅ ADD USER
export const addUserThunk = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: string }
>("users/addUser", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post<IResponseType<IUser>>(`/api/users`, user);
    return response.data.data!;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to create user");
  }
});

// ✅ UPDATE USER
export const updateUserThunk = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: string }
>("users/updateUser", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.put<IResponseType<IUser>>(
      `/api/users/?id=${user.id}`,
      user
    );
    console.log(response.data)
    return response.data.data!;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to update user");
  }
});

// ✅ DELETE USER
export const deleteUserThunk = createAsyncThunk<
  IUser,
  { userId: string },
  { rejectValue: string }
>("users/deleteUser", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await axios.delete<IResponseType<IUser>>(
      `/api/users/?id=${userId}`
    );
    return response.data.data!;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to delete user");
  }
});

// ✅ SLICE
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch users";
      });
    builder.addCase(addUserThunk.fulfilled, (state, action) => {
      state.users.push(action.payload)
    })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to create user"
      })
    // FETCH SINGLE USER
    builder
      .addCase(fetchSingleUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(fetchSingleUserThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to fetch user";
      });


    // UPDATE
    builder
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update user";
      });

    // DELETE
    builder
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload.id);
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete user";
      });
  },
});

export default userSlice.reducer;
