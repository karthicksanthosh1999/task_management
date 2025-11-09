import { IUser } from "@/app/types/userTypes";

export interface IProject {
  id?: string;
  userId?: string;
  title: string;
  state: EStats;
  startDate: Date;
  endDate: Date;

  User: IUser;
}
enum EStats {
  Pending,
  Completed,
  Planning,
  Progress,
}
