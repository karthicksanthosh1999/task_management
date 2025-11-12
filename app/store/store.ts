import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlices";
import authReducer from "../features/authSlices";
import projectReducer from "../features/projectSlices";
import workReducer from "../features/workSlices";

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    projects: projectReducer,
    works: workReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
