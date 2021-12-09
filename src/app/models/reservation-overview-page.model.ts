import { IReservation } from "./reservation.model";

/**
 * Defines data that is used in the reservations overview page
 */
export interface IReservationOverviewPage {
    // Collection of similar reservations
    reservations: Array<Array<IReservation>> | undefined;
    // The total amount of reservations across all pages
    totalReservationCount: number;
    // The page the object belongs to as an index starting with 0
    currentPage: number;
}