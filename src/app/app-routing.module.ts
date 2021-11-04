import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAddProductPageComponent } from './app-add-product-page/app-add-product-page.component';
import { AppCatalogusPageComponent } from './app-catalogus-page/app-catalogus-page.component';
import { AppInventoryPageComponent } from './app-inventory-page/app-inventory-page.component';
import { AppReservationsOverviewPageComponent } from './app-reservations-overview-page/app-reservations-overview-page.component';
import { AppReservationActionPageComponent } from './app-reservation-action-page/app-reservation-action-page.component';
import { AppShoppingCartPageComponent } from './app-shopping-cart-page/app-shopping-cart-page.component';
import { AppUsersPageComponent } from './app-users-page/app-users-page.component';


/*
  All routing locations of the application.
  Always redirect to Home when a non-existing routed are hit.
*/
const routes: Routes = [
  { path: 'cart', component: AppShoppingCartPageComponent },
  { path: 'products/add', component: AppAddProductPageComponent },
  { path: 'catalog', component: AppCatalogusPageComponent },
  { path: 'products', component: AppInventoryPageComponent },
  { path: 'reservations', component: AppReservationsOverviewPageComponent },
  { path: 'reservation', component: AppReservationActionPageComponent },
  { path: 'reservation/:id', component: AppReservationActionPageComponent },
  { path: 'users', component: AppUsersPageComponent },
  { path: '**', redirectTo: 'catalog', pathMatch: 'full' },
  { path: '', redirectTo: 'catalog', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
