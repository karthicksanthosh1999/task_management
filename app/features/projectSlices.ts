import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProject, TProjectFilter } from "../types/projectTypes";
import axios from "axios";
import { IResponseType } from "../types/reponseType";

interface IInitialState {
  projects: IProject[];
  project: IProject | null
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  error: null,
  loading: false,
  projects: [],
  project: null
};

export const fetchProjectsThunk = createAsyncThunk<
  IProject[],
  TProjectFilter,
  { rejectValue: string }
>("project/fetch", async ({ search = "", state = "", startDate, endDate }, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams({
      search,
      state: String(state ?? ""),
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
    });

    const response = await axios.get<IResponseType<IProject[]>>(
      `/api/projects/filter?${params.toString()}`
    );
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
    const response = await axios.post<IResponseType<IProject>>("/api/projects", project);
    return response.data.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const updateProjectThunk = createAsyncThunk<
  IProject,
  { id: string; project: IProject },
  { rejectValue: string }
>("project/update", async ({ id, project }, { rejectWithValue }) => {
  try {
    const response = await axios.put<IResponseType<IProject>>(`/api/projects?id=${id}`, project);
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const deleteProjectThunk = createAsyncThunk<
  IProject,
  { id: string },
  { rejectValue: string }
>("project/delete", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.delete<IResponseType<IProject>>(`/api/projects?id=${id}`);
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const getSingleProjectThunk = createAsyncThunk<
  IProject,
  { id: string },
  { rejectValue: string }
>("project/singleProject", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get<IResponseType<IProject>>(`/api/projects?id=${id}`);
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
})

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
    // ADD
    builder
      .addCase(createProjectThunk.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(createProjectThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to add user";
      });

    builder
      .addCase(deleteProjectThunk.fulfilled, (state, action) => {
        state.projects = state.projects.filter((u) => u.id !== action.payload.id);
      })
      .addCase(deleteProjectThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete project";
      });

    builder
      .addCase(getSingleProjectThunk.fulfilled, (state, action) => {
        const found = state.projects.find((u) => u.id === action.payload.id);
        state.project = found ?? null;
      })
      .addCase(getSingleProjectThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to fetch project";
      })

      .addCase(updateProjectThunk.fulfilled, (state, action) => {
        const index = state.projects.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload; // replace updated project
        }

        // also update single project if selected
        if (state.project && state.project.id === action.payload.id) {
          state.project = action.payload;
        }

        state.loading = false;
        state.error = null;
      })
      .addCase(updateProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update project";
      });
  },
});

export default projectSlices.reducer;
export const projectActions = projectSlices.actions;
