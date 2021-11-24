import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../models/user.model';
import { IUsersPage } from '../models/users-page.model';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsersBlockAction } from '../enum/users-block-action.enum';
import { IUserBlockAction } from '../models/users-block-action.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { ViewEncapsulation } from '@angular/core';

const PAGE_SIZE_DEFAULT = 25;
const INDEX_DEFAULT = 0;
const USERS_COUNT_DEFAULT = 0;

@Component({
  selector: 'app-app-users-page',
  templateUrl: './app-users-page.component.html',
  styleUrls: ['./app-users-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppUsersPageComponent implements OnInit {
  //Minimal date for datapicker
  minDate: Date;

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
    private translateService: TranslateService) 
    {
      this.dataSource = new MatTableDataSource();
      this.minDate = new Date();
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

  /**
   * Handles datepicker date changed event
   * @param user IUser; the user whose blocking date is changed
   * @param date Date; the new blocking date
   */
  datepickerDateChanged(user: IUser, date: MatDatepickerInputEvent<Date>): void {
    if (date.value) {
      user.bannedSelected = date.value;
    }
  }

  /**
   * Action function to block a user
   * @param id number; the id of the user
   * @param blockDate Date; the date until when the user will be blocked
   */
  userBlockAction(id: number, blockDate: Date): void {
    this.isLoading = true;

    console.log("DATE GIVEN: " + blockDate);
    console.log("NEW DATE: " + new Date());
    
    if ( new Date(blockDate) <= new Date() || new Date(blockDate as Date) <= new Date() || !blockDate ) {
      this.isLoading = false;
      this.showErrorNotification('USERS.ACTION.EMPTY_DATE')
    }
    else if (id > -1) {
      const blockAction: IUserBlockAction = { userId: id, action: UsersBlockAction.Block, blockUntil: blockDate };

      this.apiService.userBlockAction(blockAction).subscribe({
        next: (resp) => {
          this.isLoading = false;
          this.showSuccessNotification('USERS.ACTION.BLOCK_SUCCESS');
          this.updateUser(id, UsersBlockAction.Block, blockDate);
        },
        error: (err) => {
          this.isLoading = false;
          this.showErrorNotification(err.error);
        }
      });
    }
    else {
      this.showErrorNotification('USERS.ACTION.UNSUCCESSFUL');
    }
  }

  /**
   * Action function to unblock a user
   * @param id number; the id of the user
   */
   userUnblockAction(id: number): void {
    this.isLoading =true;
    const blockDate: Date = new Date();
    const blockAction: IUserBlockAction = { userId: id, action: UsersBlockAction.Unblock, blockUntil: blockDate};
    if (id > -1) {
      this.apiService.userBlockAction(blockAction).subscribe({
        next: (resp) => {
          this.isLoading = false;
          this.showSuccessNotification('USERS.ACTION.UNBLOCK_SUCCESS');
          this.updateUser(id, UsersBlockAction.Unblock, blockDate);
        },
        error: (err) => {
          this.isLoading = false;
          this.showErrorNotification(err.error);
        }
      });
    }
    else {
      this.showErrorNotification('USERS.ACTION.UNSUCCESSFUL');
    }
  }

  /**
   * Updates the current list
   * @param id number; the id of the user
   * @param action number; 0 Block, 1 Unblock
   * @param blockDate Date; the date until when the user will be blocked
   */
  private updateUser(id: number, action: UsersBlockAction, blockDate: Date): void {
    this.dataSource.data.forEach(user => {
      if (user.studentNumber === id) {
        switch (action) {
          case UsersBlockAction.Block: {
            user.unblocked = false;
            user.bannedUntil = blockDate;
            break;
          }
          case UsersBlockAction.Unblock: {
            user.unblocked = true;
            break;
          }
          default: {
            this.showErrorNotification('USERS.ACTION.ERROR');
            break;
          }
        }
      }
    });
  }


  
  /*
    Show error notification

    @param translateableMessage: string
    String that has to be presented in the error notification (gets translated)
  */
  private showErrorNotification(translateableMessage: string): void {
    this.notificationService.open(this.translateService.instant(translateableMessage), undefined, {
      panelClass: 'error-snack',
      duration: 2500
     });
  }
  private showSuccessNotification(translatableMessage: string): void {
    this.notificationService.open(this.translateService.instant(translatableMessage), undefined, {
      panelClass: 'success-snack',
      duration: 2500
    });
  }

}
