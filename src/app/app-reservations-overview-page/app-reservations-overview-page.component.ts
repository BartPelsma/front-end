import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IProductFlat } from '../models/product-flat.model';
import { IReservation } from '../models/reservation.model';
import { IReservationOverviewPage } from '../models/reservation-overview-page.model';

const PAGE_SIZE_DEFAULT = 25;
const INDEX_DEFAULT = 0;
const RESERVATION_COUNT_DEFAULT = 0;

@Component({
  selector: 'app-reservations-overview-page',
  templateUrl: './app-reservations-overview-page.component.html',
  styleUrls: ['./app-reservations-overview-page.component.scss']
})
export class AppReservationsOverviewPageComponent implements OnInit {

  // Contains all the flat products
  productsFlat: Array<IProductFlat> = [];
  
  // Contains all the reservation
  reservations: Array<Array<IReservation>> = [];

  // Holds if reservations are loading
  isLoading = true;

  // Matpaginator Inputs
  totalReservationCount = RESERVATION_COUNT_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  pageIndex = INDEX_DEFAULT;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.retrieveLocalStorage();
    this.getReservations();
  }


  /**
   * Handles paginator page events
   * @param event event object that should be handled
   * @returns same event object that got sent as parameter
   */
   handlePageEvent(event?: PageEvent): PageEvent | undefined {
    this.pageIndex = event?.pageIndex ?? INDEX_DEFAULT;
    if (this.pageSize !== event?.pageSize) {
      this.pageSize = event?.pageSize ?? PAGE_SIZE_DEFAULT;
      localStorage.setItem('reservationPageOptions', JSON.stringify(this.pageSize));
    }
    this.getReservations();
    return event;
  }

  /**
   * Sets page to first page
   */
   resetPaging(): void {
    this.paginator.pageIndex = INDEX_DEFAULT;
  }

  /**
   * Gets items from local storage
   */
   retrieveLocalStorage(): void {
    const reservationPageOptions = localStorage.getItem('reservationPageOptions');

    if (reservationPageOptions !== null) {
      this.pageSize = JSON.parse(reservationPageOptions);
    }
  }


  /**
   * Returns if the product has been loaded yet
   * @param productId the productId to check if it has been loaded
   */
  hasLoadedProduct(productId: number): boolean {
    if (this.productsFlat === null || this.productsFlat.length < 1) {
      return false;
    }

    return this.productsFlat.findIndex(x => x.id === productId) > -1;
  }

  /**
   * Returns the name of the product
   * @param productId the productId to get the name of
   */
  getProductName(productId: number): string {
    return this.productsFlat[this.productsFlat.findIndex(x => x.id === productId)].name;
  }

/**
 * Recieve all Reservations
 */
  getReservations(): void {
    this.isLoading = true;
    this.apiService.getSimilarReservations(this.pageIndex, this.pageSize)
    .subscribe({
      next: (resp) => {
        this.readReservationsPage(resp.body);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Gets the data from the reservationOverviewPage object
   * @param pageData page data containing relevant data for reservation page
   * @returns void
   */
  readReservationsPage(pageData: IReservationOverviewPage | null): void {
    if (pageData == null) {
      this.reservations =  new Array<Array<IReservation>>();
      return;
    }

    this.reservations = pageData.reservations;
    this.totalReservationCount = pageData.totalReservationCount;
    this.pageIndex = pageData.currentPage;
    this.getProducts();    
  }

  /**
   * Receive all the products
   */
  getProducts(): void {
    this.productsFlat = [];
    const seen = new Set();
    let filteredProducts: IReservation[] = [];

    this.reservations.forEach(reservation => {
      filteredProducts = filteredProducts.concat(reservation.filter(el => {
        const duplicate = seen.has(el.productId);
        seen.add(el.productId);
        return !duplicate;
      }));
    });

    filteredProducts.forEach(async product => {
      this.apiService.getProductFlatById(product.productId).subscribe({
        next: (resp) => {
          if (resp.body === null) {
            return;
          }

          this.productsFlat.push(resp.body);
        }
      });
    });
  }
}
