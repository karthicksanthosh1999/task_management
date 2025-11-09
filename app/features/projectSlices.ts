import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../types/projectTypes";
import axios from "axios";
import { IUser } from "../types/userTypes";

interface IInitialState {
  projects: IProject[];
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  error: null,
  loading: false,
  projects: [],
};

export const fetchProjectsThunk = createAsyncThunk<
  IProject[],
  void,
  { rejectValue: string }
>("project/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/projects");
    return response.data.data ?? [];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const createProjectThunk = createAsyncThunk<
  IProject,
  IProject,
  { rejectValue: string }
>("project/create", async (project, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/projects", project);
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const updateProjectThunk = createAsyncThunk<
  IProject,
  { userId: string; project: IProject },
  { rejectValue: string }
>("project/update", async ({ userId, project }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/api/project/${userId}`, project);
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const deleteProjectThunk = createAsyncThunk<
  IUser,
  { userId: string },
  { rejectValue: string }
>("project/delete", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/project/${userId}`);
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const projectSlices = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch projects";
      });
  },
});
