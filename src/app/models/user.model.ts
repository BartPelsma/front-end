import { IRole } from "./role.model";

export interface IUser {
    // The student number of the user
    studentNumber: number;
    // Date to when the person is banned
    bannedUntil: Date;
    // The role assigned to this user
    role: IRole;
  }