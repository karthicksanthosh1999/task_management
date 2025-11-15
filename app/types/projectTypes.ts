import { IUser } from "@/app/types/userTypes";

export interface IProject {
  id?: string;
  userId?: string;
  title: string;
  state: EStats;
  startDate: Date;
  endDate: Date;

  User?: IUser;
}

export enum EStats {
  Pending,
  Completed,
  Planning,
  Progress,
}

export interface TProjectFilter {
  userId?: string;
  search?: string;
  state?: EStats;
  startDate?: Date;
  endDate?: Date;
}
