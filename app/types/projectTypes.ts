import { IUser } from "@/app/types/userTypes";
import { Status } from "@/lib/generated/prisma";

export interface IProject {
  id?: string;
  userId?: string;
  title: string;
  state: Status;
  startDate: Date;
  endDate: Date;
  User?: IUser;
}

export interface TProjectFilter {
  userId?: string;
  search?: string;
  state?: Status | null;
  startDate?: Date;
  endDate?: Date;
}
