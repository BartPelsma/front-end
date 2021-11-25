import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { ICartProduct } from '../models/cart-product.model';
import { CatalogItemsWithCategory } from '../models/catalog-items-with-catogery.model';
import { CatalogPage } from '../models/catalog-page.model';
import { ICatalogFlat } from '../models/catalog-flat.model';
import { IDateChangedEvent } from '../models/date-changed-event.model';
import { ViewEncapsulation } from '@angular/core';

/* const variables for page sizing and index */
const PAGE_SIZE_DEFAULT = 5;
const INDEX_DEFAULT = 0;
const PRODUCT_COUNT_DEFAULT = 0;

@Component({
  selector: 'app-catalogus-page',
  templateUrl: './app-catalogus-page.component.html',
  styleUrls: ['./app-catalogus-page.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class AppCatalogusPageComponent implements OnInit, AfterViewInit {
  /* MatPaginator Inputs */
  totalProductCount = PRODUCT_COUNT_DEFAULT;
  /* Standard pageSize */
  pageSize = PAGE_SIZE_DEFAULT;
  /* Standard pageIndex */
  pageIndex = INDEX_DEFAULT;
  /* Page sizing options */
  pageSizeOptions: number[] = [1, 2, 3, 4, 5, 100];
  /* Index of the image that is being swapped */
  imageIndexx = 0;
  /* All cart items */
  cartItems: Array<ICartProduct> = [];
  /* MatPaginator Output */
  pageEvent: PageEvent | undefined;
  /* Paginator child */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /* Image element */
  @ViewChildren('previewimage') previewImageElement!: QueryList<ElementRef>;
  /* Is true when loading products has failed */
  hasLoadingError = false;
  /* Is loading boolean */
  isLoading = true;
  /* All catalog items with their category */
  catalogItemsWithCategory: Array<CatalogItemsWithCategory>;

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private notificationService: MatSnackBar,
  ) {
    this.catalogItemsWithCategory = new Array<CatalogItemsWithCategory>();
  }

  /*
    Gets inventory page options when loading the page.
    See https://angular.io/guide/lifecycle-hooks for more information.
  */
  ngOnInit(): void {
    const catalogPageOptions = localStorage.getItem('catalogPageOptions');

    if (catalogPageOptions != null) {
      this.pageSize = JSON.parse(catalogPageOptions);
    }
  }

  /*
    After view has loaded get all catalog items.
  */
  ngAfterViewInit(): void {
    this.getCatalogItems();
  }

  /*
    Go back to previous image in the index.
  */
  public onClickPreviousImage(item: ICatalogFlat): void {
    if (item.imageIndex <= 0) {
      item.imageIndex = item.images.length - 1;
    }
    else {
      item.imageIndex--;
    }
    this.onChangeSelectedImageIndex(item);
  }

  /*
    Go to the next image in the index.
  */
  public onClickNextImage(item: ICatalogFlat): void {
    if (item.imageIndex >= item.images.length - 1) {
      item.imageIndex = 0;
    }
    else {
      item.imageIndex++;
    }
    this.onChangeSelectedImageIndex(item);
  }

  /*
    Changes the image after changing the index.
  */
  onChangeSelectedImageIndex(item: ICatalogFlat): void {
    const imageElement = this.previewImageElement.filter((element, index) => element.nativeElement.id === 'image-' + item.id)[0];
    imageElement.nativeElement.src = 'data:image/png;base64,' + item.images[item.imageIndex];
  }

  /**
   * Handles the adding of a item to the cart
   * @param item item object that should be handled to be added to the cart
   */
  addItemToCart(item: ICatalogFlat): void {
    if (new Date(item.startDate) <= new Date() || new Date(item.endDate as Date) <= new Date()) {
      this.showErrorNotification('CATALOG.EMPTY_DATE');
    }
    else {
      const modal = {} as ICartProduct;
      modal.endDate = item.endDate;
      modal.startDate = item.startDate;
      modal.id = item.id;
      this.cartItems.push(modal);

      localStorage.setItem('cart', JSON.stringify(this.cartItems));

      this.notificationService.open(item.name + ' ' + this.translateService.instant('CATALOG.CART_ADD_SUCCESSFUL'), undefined, {
        panelClass: 'success-snack',
        duration: 2500
      });
    }
  }

  /**
   * Handles the checking of amount of images with a received item
   * @param images images object that should be handled
   */
  checkAmountOfImages(images: Array<string>): boolean {
    if (images.length <= 1) {
      return false;
    }
    else {
      return true;
    }
  }

  /**
   * Handles datepicker date changed event
   * @param item item object that should be handled
   * @param event event object that should be handled
   */
  datepickerDatesChanged(item: ICatalogFlat, event: IDateChangedEvent): void {
    item.startDate = event.startDate;
    item.endDate = event.endDate;
  }

  /**
   * Handles paginator page events
   * @param event event object that should be handled
   * @returns same event object that got sent as parameter
   */
  public handlePageEvent(event?: PageEvent): PageEvent | undefined {
    this.pageIndex = event?.pageIndex ?? INDEX_DEFAULT;
    if (this.pageSize !== event?.pageSize) {
      this.pageSize = event?.pageSize ?? PAGE_SIZE_DEFAULT;
      localStorage.setItem('catalogPageOptions', JSON.stringify(this.pageSize));
    }
    this.getCatalogItems();
    return event;
  }

  /**
   * Gets the data from the catalogPage object
   * @param pageData page data containing relevant data for inventory page
   * @returns void
   */
  private readCatalogPage(pageData: CatalogPage | null): void {
    if (pageData == null) {
      this.catalogItemsWithCategory = new Array<CatalogItemsWithCategory>();
      return;
    }
    this.catalogItemsWithCategory = pageData.catalogItems;
    this.totalProductCount = pageData.totalProductCount;
    this.pageIndex = pageData.currentPage;
  }

  /**
   * Sets page to first page
   */
  public resetPaging(): void {
    this.paginator.pageIndex = INDEX_DEFAULT;
  }

  /**
   * Gets all the catalog objects
   */
  private getCatalogItems(): void {
    this.isLoading = true;
    this.apiService.getCatalogEntries(this.pageIndex, this.pageSize, this.searchfilter).subscribe({
      next: (resp) => {
        this.readCatalogPage(resp.body);
        this.isLoading = false;
      },
      error: (err) => {
        this.showErrorNotification('CART.NO_FLAT_PRODUCT_RESPONSE');
        this.hasLoadingError = true;
      }
    });
  }

  /**
   * Show error notification
   * @param translateableMessage Message to translate and send to notification
   */
  private showErrorNotification(translateableMessage: string): void {
    this.notificationService.open(this.translateService.instant(translateableMessage), undefined, {
      panelClass: 'error-snack',
      duration: 2500
    });
  }

  //Filter values
  filter:string = '';
  filterargs = {category: ''};

  //Filter function
  search(selectedFilter:string){
    // this.filterargs = {category: this.filter};
  }


  //Filter function
  searchfilter:string = '-';
  searchbar(selectedFilter:string){
    this.searchfilter = selectedFilter;

    if (!this.searchfilter){
      this.searchfilter = "-";
    }

    this.getCatalogItems();
  }
}
