export interface IUser {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
  company: string
  role: string

  image?: string;
  createdAt?: Date;
}
