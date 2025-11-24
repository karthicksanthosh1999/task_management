import { IProject } from "./projectTypes";
import { IUser } from "./userTypes";

export type TStatus = "Pending" | "Completed" | "Planning" | "Progress";

export interface IWork {
  id?: string;
  userId: string;
  title: string;
  projectId: string;
  state: TStatus;
  startDate: Date;
  endDate: Date;
  assignedUsers: IUser[];

  project?: IProject;
  user?: IUser;
}

export interface IWorkFilter {
  title?: string;
  state?: TStatus;
  projectId?: string;
  startDate?: Date;
  endDate?: Date;
  role?: string;
  userId?: string;
}
