import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../models/user.model';
import { IUsersPage } from '../models/users-page.model';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

const PAGE_SIZE_DEFAULT = 25;
const INDEX_DEFAULT = 0;
const USERS_COUNT_DEFAULT = 0;

@Component({
  selector: 'app-app-users-page',
  templateUrl: './app-users-page.component.html',
  styleUrls: ['./app-users-page.component.scss']
})
export class AppUsersPageComponent implements OnInit {

  // shows loading spinner if true
  isLoading = true;

  // determined whch columns that are displayed in the users table and in which order.
  displayedColumns: string[] = ['number', 'role', 'blocked', 'blockOptions'];

  // MatPaginator Inputs
  totalUsersCount = USERS_COUNT_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  pageIndex = INDEX_DEFAULT;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  
  // MatPaginator Output
  pageEvent: PageEvent | undefined;

  dataSource: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private notificationService: MatSnackBar,
    private translateService: TranslateService) {
      this.dataSource = new MatTableDataSource();
     }

  ngOnInit(): void {
    this.retrieveLocalStorage();
    this.getUsersData();
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
      localStorage.setItem('usersPageOptions', JSON.stringify(this.pageSize));
    }
    this.getUsersData();
    return event;
  }

  /**
   * Sets page to first page
   */
   resetPaging(): void {
    this.paginator.pageIndex = INDEX_DEFAULT;
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
   * Gets the data from the usersPage object
   * @param pageData page data containing relevant data for users page
   * @returns void
   */
  readUsersPage(pageData: IUsersPage | null): void {
    if (pageData == null) {
      this.dataSource.data = new Array<IUser>();
      return;
    }

    this.dataSource.data = pageData.users ?? new Array<IUser>();
    this.totalUsersCount = pageData.totalUsersCount;
    this.pageIndex = pageData.currentPage;
  }

  /**
   * Gets items from local storage
   */
  retrieveLocalStorage(): void {
    const usersPageOptions = localStorage.getItem('usersPageOptions');

    if (usersPageOptions !== null) {
      this.pageSize = JSON.parse(usersPageOptions);
    }
  }

  /**
   * Get users that get displayed on the page
   */
  getUsersData(): void {
    this.isLoading = true;
    this.apiService.getUsersForPage(this.pageIndex, this.pageSize)
      .subscribe({
        next: (response) => {
          this.readUsersPage(response.body);
          this.isLoading = false;
        },
        error: (err: any) => {
          this.showErrorNotification('USERS.NO_USERS_RESPONSE');
          this.isLoading = false;
        }
      });
  }

}
