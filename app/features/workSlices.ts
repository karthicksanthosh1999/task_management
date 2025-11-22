import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IWork, IWorkFilter } from "../types/workTypes";
import axios from "axios";
import { IResponseType } from "../types/reponseType";
import { Status } from "@/lib/generated/prisma/enums";

interface IInitialState {
  work: IWork | null;
  works: IWork[];
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  error: null,
  loading: false,
  work: null,
  works: [],
};

export const createWorkThunk = createAsyncThunk<
  IWork,
  IWork,
  { rejectValue: string }
>("work/createWork", async (work, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/work`, work);
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const fetchWorkThunk = createAsyncThunk<
  IWork[],
  IWorkFilter,
  { rejectValue: string }
>(
  "work/fetchWork",
  async (
    { endDate, projectId, startDate, state = "", title = "" },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        title,
        projectId: String(""),
        state: String(Status ?? ""),
        endDate: endDate ? endDate.toISOString() : "",
        startDate: startDate ? startDate.toISOString() : "",
      });

      const response = await axios.get<IResponseType<IWork[]>>(
        `/api/work/filter?${params.toString()}`
      );
      return response.data?.data ?? [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);

export const deleteWorkThunk = createAsyncThunk<
  IWork,
  { workId: string },
  { rejectValue: string }
>("work/deleteWork", async ({ workId }, { rejectWithValue }) => {
  try {
    const response = await axios.delete<IResponseType<IWork>>(
      `/api/work?id=${workId}`
    );
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const getSingleWorkThunk = createAsyncThunk<
  IWork,
  { workId: string },
  { rejectValue: string }
>("work/getWork", async ({ workId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/work?id=${workId}`);
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const updateWorkThunk = createAsyncThunk<
  IWork,
  { workId: string; work: IWork },
  { rejectValue: string }
>("work/updateWork", async ({ work, workId }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/api/work?id=${workId}`, work);
    return response.data?.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

export const workSlices = createSlice({
  name: "work",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.works = action.payload;
      })
      .addCase(fetchWorkThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch projects";
      });
    // ADD
    builder
      .addCase(createWorkThunk.fulfilled, (state, action) => {
        state.works.push(action.payload);
      })
      .addCase(createWorkThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to add user";
      });

    builder
      .addCase(deleteWorkThunk.fulfilled, (state, action) => {
        state.works = state.works.filter((u) => u.id !== action.payload.id);
      })
      .addCase(deleteWorkThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete project";
      });

    builder
      .addCase(getSingleWorkThunk.fulfilled, (state, action) => {
        const found = state.works.find((u) => u.id === action.payload.id);
        state.work = found ?? null;
      })
      .addCase(getSingleWorkThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to fetch project";
      })

      .addCase(updateWorkThunk.fulfilled, (state, action) => {
        const index = state.works.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.works[index] = action.payload; // replace updated project
        }

        // also update single project if selected
        if (state.work && state.work.id === action.payload.id) {
          state.work = action.payload;
        }

        state.loading = false;
        state.error = null;
      })
      .addCase(updateWorkThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update project";
      });
  },
});

export default workSlices.reducer;
export const workActions = workSlices.actions;
