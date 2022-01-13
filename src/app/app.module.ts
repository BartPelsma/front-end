import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { AppSideMenuBarComponent } from './app-side-menu-bar/app-side-menu-bar.component';
import { AppAddProductPageComponent } from './app-add-product-page/app-add-product-page.component';
import { AppProductDatepickerComponent } from './app-product-datepicker/app-product-datepicker.component';
import { AppShoppingCartPageComponent } from './app-shopping-cart-page/app-shopping-cart-page.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppArchiveDialogComponent } from './app-archive-dialog/app-archive-dialog.component';
import { AppCatalogusPageComponent } from './app-catalogus-page/app-catalogus-page.component';
import { StatusNameKeyPipe } from './pipes/status-name-key.pipe';
import { StatusNameClassPipe } from './pipes/status-name-class.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlFactory } from './factories/paginatorI18n.factory';
import { HttpLoaderFactory } from './factories/http-loader.factory';
import { AppInventoryPageComponent } from './app-inventory-page/app-inventory-page.component';
import { AppReservationsOverviewPageComponent } from './app-reservations-overview-page/app-reservations-overview-page.component';
import { AppReservationActionPageComponent } from './app-reservation-action-page/app-reservation-action-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './app-login-page/login.component';
import { AppShoppingCartDatepickerComponent } from './app-shopping-cart-datepicker/app-shopping-cart-datepicker.component';
import { MyFilterPipe } from './pipes/MyFilterPipe';
import { AppUsersPageComponent } from './app-users-page/app-users-page.component';
import { AppAddPdfComponent } from './app-add-pdf/app-add-pdf.component';
import { AppDeletePdfComponent } from './app-delete-pdf/app-delete-pdf.component';
import { RoleNameKeyPipe } from './pipes/role-name-key.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppSideMenuBarComponent,
    AppAddProductPageComponent,
    AppProductDatepickerComponent,
    AppShoppingCartPageComponent,
    AppInventoryPageComponent,
    StatusNameKeyPipe,
    StatusNameClassPipe,
    AppArchiveDialogComponent,
    AppCatalogusPageComponent,
    AppReservationsOverviewPageComponent,
    AppReservationActionPageComponent,
    LoginComponent,
    MyFilterPipe,
    AppShoppingCartDatepickerComponent,
    AppUsersPageComponent,
    AppAddPdfComponent,
    AppDeletePdfComponent,
    AppUsersPageComponent,
    RoleNameKeyPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LayoutModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl, deps: [TranslateService],
      useFactory: MatPaginatorIntlFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
