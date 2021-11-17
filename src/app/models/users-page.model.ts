import { IUser } from "./user.model";

/**
 * Defines data that is used in the users overview table
 */
export interface IUsersPage {
    // Collection of users
    users: IUser[] | undefined;
    // The total amount of users across all pages
    totalUsersCount: number;
    // The page the object belongs to as an index starting with 0
    currentPage: number;
}