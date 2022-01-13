import { UsersBlockAction } from "../enum/users-block-action.enum";

export interface IUserBlockAction {
    userId: number;
    action: UsersBlockAction;
    blockUntil: Date;
}