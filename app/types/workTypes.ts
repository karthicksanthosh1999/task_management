import { Status } from "@/lib/generated/prisma/enums";
import { IProject } from "./projectTypes";
import { IUser } from "./userTypes";

export interface IWork {
  id?: string;
  userId: string;
  title: string;
  projectId: string;
  state: Status;
  startDate: Date;
  endDate: Date;

  project?: IProject;
  user?: IUser;
}

export interface IWorkFilter {
  title?: string;
  state?: Status;
  projectId?: string;
  startDate?: Date;
  endDate?: Date;
}
