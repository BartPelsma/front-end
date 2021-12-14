import { IRole } from "./role.model";

export interface IUser {
    // The ID of the user
    id: number;
    // The student number of the user
    // Only needed if a user
    studentNumber: string;
    // The name of the user
    name: string;
    // Whether the user is banned or not
    banned: boolean;
    // Date to when the person is banned
    bannedUntil: Date;
    // The role assigned to this user
    role: IRole;
    // Date selected for when user will be banned
    bannedSelected: Date;
  }