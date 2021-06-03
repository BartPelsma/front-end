import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { ProductStatus } from '../models/ProductStatus.enum';
import { IProductData } from '../models/product-data.model';
import { IReservationAction } from '../models/reservation-action.model';
import { IReservationProduct } from '../models/reservation-product.model';
import { IReservation } from '../models/reservation.model';
import { ActivatedRoute } from '@angular/router';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { IProductFlat } from '../models/product-flat.model';

@Component({
  selector: 'app-app-reservation-action-page',
  templateUrl: './app-reservation-action-page.component.html',
  styleUrls: ['./app-reservation-action-page.component.scss']
})
export class AppReservationActionPageComponent implements OnInit {

  reservations: Array<IReservationProduct> = [
    { id: 1, startDate: new Date, endDate: new Date, pickedUpDate: new Date, product: { id: 1, name: "Testdata", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available, inventoryLocation: "" } },
  ];

  ngOnInit(): void {
    //Get ID from URL
    // CALL TO LOAD RESERVATIONS
    //FILL RESERVATIONS
    const id = this.route.snapshot.paramMap.get('id');
    if (id && parseInt(id))
      this.LoadReservations(parseInt(id));
  }
  /*
    Contains loading state.
    Disables all form inputs/buttons when true. Loading spinner is visible when true
  */
  isLoading = false;
  isLoadingPage = false;

  constructor(
    private translate: TranslateService,
    private snackbarService: MatSnackBar,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  LoadReservations(id: number) {
    var similarReservations;
    this.isLoadingPage = true;
    this.apiService.getReservationsSimilar(id)
      .subscribe({
        next: (response) => {
          this.reservations = new Array<IReservationProduct>();
          if (response.body == null) {
            return;
          }
          response.body.forEach(reservation => {
            this.apiService.getProductFlatById(reservation.productId)
              .subscribe({
                next: (response) => {
                  this.isLoadingPage = true;
                  if (response.body == null) {
                    return;
                  }
                  if (response.body) {
                    this.reservations.push({
                      id: reservation.id,
                      startDate: reservation.startDate,
                      endDate: reservation.endDate,
                      returnDate: reservation.returnDate,
                      pickedUpDate: reservation.pickedUpDate,
                      product: response.body
                    })
                  }
                  this.isLoadingPage = false;
                },
                error: (_err: any) => {
                  this.showErrorNotification('RESERVATION.PRODUCT.ERROR');
                }
              })
          });
        },
        error: (_err: any) => {
          this.showErrorNotification('RESERVATION.NO_RESPONSE_DATA');
          this.isLoadingPage = false;
        }
      });
    console.log()
  }

  ReservationAction(action: number, id: number) {
    this.isLoading = true;
    const reservationAction: IReservationAction = { reservationId: id, actionNumber: action }
    if (id > 0) {
      this.apiService.reservationAction(reservationAction).subscribe({
        next: (resp) => {
          this.isLoading = false;
          this.snackbarService.open(this.translate.instant('RESERVATION.ACTION.SUCCESS'), undefined, {
            panelClass: 'success-snack',
            duration: 2500
          });
        },
        error: (err) => {
          this.isLoading = false;
          this.showErrorNotification(err.error);
        }
      });
    }
    else {
      this.snackbarService.open(this.translate.instant('RESERVATION.ACTION.UNSUCCESSFUL'), undefined, {
        panelClass: 'error-snack',
        duration: 2500
      });
    }
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
}