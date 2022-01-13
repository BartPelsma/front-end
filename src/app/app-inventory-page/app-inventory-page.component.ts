import { Component, OnInit, ViewChild } from '@angular/core';
import { IProductData } from '../models/product-data.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AppArchiveDialogComponent } from '../app-archive-dialog/app-archive-dialog.component';
import { IInventoryPage } from '../models/inventory-page.model';
import { AppAddPdfComponent } from '../app-add-pdf/app-add-pdf.component';
import { AppDeletePdfComponent } from '../app-delete-pdf/app-delete-pdf.component';
import { ViewEncapsulation } from '@angular/core';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

const PAGE_SIZE_DEFAULT = 50;
const INDEX_DEFAULT = 0;
const PRODUCT_COUNT_DEFAULT = 0;

@Component({
  selector: 'app-inventory-page',
  templateUrl: './app-inventory-page.component.html',
  styleUrls: ['./app-inventory-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppInventoryPageComponent implements OnInit {


  // shows loading spinner if true
  isLoading = true;

  // determined whch columns that are displayed in the inventory table and in which order.
  displayedColumns: string[] = ['name', 'location','category', 'requiresApproval', 'status', 'options'];


  // MatPaginator Inputs
  totalProductCount = PRODUCT_COUNT_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  pageIndex = INDEX_DEFAULT;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent | undefined;

  filterValue: string;

  dataSource: MatTableDataSource<IProductData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private notificationService: MatSnackBar,
    private translateService: TranslateService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.retrieveLocalStorage();
    this.getProductData();
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
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
      localStorage.setItem('inventoryPageOptions', JSON.stringify(this.pageSize));
    }
    this.getProductData();
    return event;
  }

  /**
   * Sets page to first page
   */
  resetPaging(): void {
    this.paginator.pageIndex = INDEX_DEFAULT;
  }

  /*
    Shows the confirm dialog for archiving a product
  */
  openDialog(element: any): void {
    const dialogRef = this.dialog.open(AppArchiveDialogComponent, {
      data: {
        id: element.id,
        name: element.name
      },
      backdropClass: 'no-backdrop',
    });

    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        this.getProductData();
      }
    });
  }

  openAddPDF(element: any): void{
    const dialogRef = this.dialog.open(AppAddPdfComponent, {
      data: {
        id: element.id,
        name: element.name
      },
      backdropClass: 'no-backdrop',
    });
  }

  openDeletePDF(element: any): void{
    const dialogRef = this.dialog.open(AppDeletePdfComponent, {
      data: {
        id: element.id,
        name: element.name
      },
      backdropClass: 'no-backdrop',
    });
  }
  /*
    Show error notification

    @param translateableMessage: string
    String that has to be presented in the error notification (gets translated)
  */

    showErrorNotification(translateableMessage: string): void {
      this.notificationService.open(this.translateService.instant(translateableMessage), undefined, {
        panelClass: 'error-snack',
        duration: 2500
      });
    }

  /**
   * Gets the data from the inventoryPage object
   * @param pageData page data containing relevant data for inventory page
   * @returns void
   */
  readInventoryPage(pageData: IInventoryPage | null): void {
    if (pageData == null) {
      this.dataSource.data = new Array<IProductData>();
      return;
    }

    this.dataSource.data = pageData.products ?? new Array<IProductData>();
    this.totalProductCount = pageData.totalProductCount;
    this.pageIndex = pageData.currentPage;
  }

  /**
   * Gets items from local storage
   */
  retrieveLocalStorage(): void {
    const inventoryPageOptions = localStorage.getItem('inventoryPageOptions');

    if (inventoryPageOptions !== null) {
      this.pageSize = JSON.parse(inventoryPageOptions);
    }
  }

  //Filter function
  searchfilter:string = '-';
  searchbar(selectedFilter:string){
    this.searchfilter = selectedFilter;

    if (!this.searchfilter){
      this.searchfilter = "-";
    }

    this.getProductData();
  }

  /**
   * Get product data that gets displayed in the inventory
   */
  getProductData(): void {
    this.isLoading = true;
    this.apiService.getInventoryProducts(this.pageIndex, this.pageSize, this.searchfilter)
      .subscribe({
        next: (response) => {

          this.readInventoryPage(response.body);

          this.isLoading = false;
        },
        error: (err: any) => {
          this.showErrorNotification('INVENTORY.NO_INVENTORY_RESPONSE');
          this.isLoading = false;
        }
      });
  }
}

