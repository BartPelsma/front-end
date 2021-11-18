import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { ReservationAction } from '../enum/reservation-action.enum';
import { IReservationAction } from '../models/reservation-action.model';
import { IReservationProduct } from '../models/reservation-product.model';

@Component({
  selector: 'app-reservation-action-page',
  templateUrl: './app-reservation-action-page.component.html',
  styleUrls: ['./app-reservation-action-page.component.scss']
})
export class AppReservationActionPageComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private snackbarService: MatSnackBar,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  reservations: Array<IReservationProduct> = [];
  /*
    Contains loading state.
    Disables all form inputs/buttons when true. Loading spinner is visible when true
  */
  isLoading = false;
  isLoadingPage = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && parseInt(id, 10)) {
      this.LoadReservations(parseInt(id, 10));
    }
  }
  /**
   * Load all reservations similiar to given Id
   * @param id given id of reservation
   */
  LoadReservations(id: number): void {
    this.isLoadingPage = true;
    this.apiService.getReservationsSimilar(id)
      .subscribe({
        next: (response) => {
          this.reservations = new Array<IReservationProduct>();
          if (response.body === null) {
            return;
          }
          response.body.forEach(reservation => {
            this.reservations.push({
              id: reservation.id,
              startDate: reservation.startDate,
              endDate: reservation.endDate,
              returnDate: reservation.returnDate,
              pickedUpDate: reservation.pickedUpDate,
              productId: reservation.productId,
              product: null
            });
          });
          this.LoadProductData();
          this.isLoadingPage = false;
        },
        error: (err: any) => {
          this.showErrorNotification('RESERVATION.NO_RESPONSE_DATA');
          this.isLoadingPage = false;
        }
      });
  }
  /**
   * Loads products for reservations
   */
  LoadProductData(): void {
    this.reservations.forEach(reservation => {
      this.apiService.getProductFlatById(reservation.productId)
        .subscribe({
          next: (response) => {
            if (response.body == null) {
              return;
            }
            if (response.body) {
              reservation.product = response.body;
            }
          },
          error: (err: any) => {
            this.showErrorNotification('RESERVATION.NO_PRODUCT_DATA');
          }
        });
    });
  }

  /**
   * Action function to delete / out / in a reservation
   * @param action number, 0 delete, 1 out, 2 in
   * @param id number the id of the reservation
   */
  ReservationAction(actionNumber: ReservationAction, id: number): void {
    this.isLoading = true;
    const reservationAction: IReservationAction = { reservationId: id, action: actionNumber };
    if (id > -1) {
      this.apiService.reservationAction(reservationAction).subscribe({
        next: (resp) => {
          this.isLoading = false;
          this.showSuccessNotification('RESERVATION.ACTION.SUCCESS');
          this.updateReservation(actionNumber, id);
        },
        error: (err) => {
          this.isLoading = false;
          this.showErrorNotification(err.error);
        }
      });
    }
    else {
      this.showErrorNotification('RESERVATION.ACTION.UNSUCCESSFUL');
    }
  }
  /**
   * Updates the current list
   * @param action number, 0 delete, 1 out, 2 in
   * @param id number the id of the reservation
   */
  private updateReservation(action: ReservationAction, id: number): void {
    this.reservations.forEach(reservation => {
      if (reservation.id === id) {
        switch (action) {
          case ReservationAction.Cancel: {
            const index = this.reservations.indexOf(reservation, 0);
            if (index > -1) {
              this.reservations.splice(index, 1);
            }
            break;
          }
          case ReservationAction.Pickup: {
            reservation.pickedUpDate = new Date();
            break;
          }
          case ReservationAction.Return: {
            reservation.returnDate = new Date();
            break;
          }
          default: {
            this.showErrorNotification('RESERVATION.ACTION.ERROR');
            break;
          }
        }
      }
    });
  }
  /*
    Show error notification

    @param translatableMessage: string
    String that has to be presented in the error notification (gets translated)
  */
  private showErrorNotification(translatableMessage: string): void {
    this.snackbarService.open(this.translate.instant(translatableMessage), undefined, {
      panelClass: 'error-snack',
      duration: 2500
    });
  }
  private showSuccessNotification(translatableMessage: string): void {
    this.snackbarService.open(this.translate.instant(translatableMessage), undefined, {
      panelClass: 'success-snack',
      duration: 2500
    });
  }
}
