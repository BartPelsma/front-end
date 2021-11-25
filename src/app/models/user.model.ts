import { IRole } from "./role.model";

export interface IUser {
    // The ID of the user
    id: number;
    // The student number of the user
    // Only needed if a user
    studentNumber: string;
    // The name of the user
    name: string;
    // Date to when the person is banned
    bannedUntil: Date;
    // The role assigned to this user
    role: IRole;
    // Extra check to see whether user is blocked
    // Used when updateing the userspage after unblocking a user
    unblocked: boolean;
    // Date selected for when user will be banned
    bannedSelected: Date;
  }