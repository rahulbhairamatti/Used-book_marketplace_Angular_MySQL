// // client/src/app/app-routing.module.js
// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { HomeComponent } from './home/home.component'; // Assuming you have JS versions of components
// import { LoginComponent } from './login/login.component';
// import { BookListComponent } from './book-list/book-list.component';
// import { SellBookComponent } from './sell-book/sell-book.component';


// import { BookDetailsComponent } from './book-details/book-details.component';
// import { CartComponent } from './cart/cart.component';
// client/src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard.service';

import { RouterModule, Routes } from '@angular/router'; // Import Routes type
import { HomeComponent } from './home/home.component'; // Import with .js extension removed
import { LoginComponent } from './login/login.component'; // Import with .js extension removed
import { BookListComponent } from './book-list/book-list.component'; // Import with .js extension removed
import { SellBookComponent } from './sell-book/sell-book.component'; // Import with .js extension removed
import { BookDetailsComponent } from './book-details/book-details.component'; // Import with .js extension removed
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component'; // Import new component
import { CartComponent } from './cart/cart.component'; // Import with .js extension removed
import { RegistrationComponent } from './registration/registration.component';
//import { OrderHistoryComponent } from './order-history/order-history.component';
const routes: Routes = [ // Type 'routes' as Routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: BookListComponent },
  { path: 'products/:productId', component: BookDetailsComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
   { path: 'sell-book', component: SellBookComponent, canActivate: [AuthGuard] },
   { path: 'order-confirmation/:orderId', component: OrderConfirmationComponent }, // Route for order confirmation with orderId parameter
  // { path: 'orders/history', component: OrderHistoryComponent, canActivate: [AuthGuard] } // Route for order history - with AuthGuard
   
 // ,{ path: '**', redirectTo: 'home' }
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() { }
}
// // const routes = [
// //   { path: '', redirectTo: 'home', pathMatch: 'full' },
// //   { path: 'home', component: HomeComponent },
// //   { path: 'login', component: LoginComponent },
// //   { path: 'products', component: BookListComponent },
// //   { path: 'sell-book', component: SellBookComponent },
// //   { path: 'products/:productId', component: BookDetailsComponent },
// //   { path: 'cart', component: CartComponent }
// // ];

// // NgModule({ // Apply NgModule decorator-like function
// //   imports: [RouterModule.forRoot(routes)],
// //   exports: [RouterModule]
// // })(AppRoutingModule);

// // function AppRoutingModule() { } // Constructor function for module

// // AppRoutingModule.ɵmod = /*@__PURE__*/ NgModule.ɵmod({ type: AppRoutingModule }); // Module Definition for Angular
// // AppRoutingModule.ɵinj = /*@__PURE__*/ NgModule.ɵinj({ token: AppRoutingModule, factory: AppRoutingModule.ɵfac }); // Injector definition


// // export { AppRoutingModule };
// // import { NgModule } from '@angular/core';
// // import { RouterModule } from '@angular/router';
// // import { HomeComponent } from './home/home.component'; // Assuming you have JS versions of components
// // import { LoginComponent } from './login/login.component';
// // import { BookListComponent } from './book-list/book-list.component';
// // import { SellBookComponent } from './sell-book/sell-book.component';
// // import { BookDetailsComponent } from './book-details/book-details.component';
// // import { CartComponent } from './cart/cart.component';

// // const routes = [
// //   { path: '', redirectTo: 'home', pathMatch: 'full' },
// //   { path: 'home', component: HomeComponent },
// //   { path: 'login', component: LoginComponent },
// //   { path: 'products', component: BookListComponent },
// //   { path: 'sell-book', component: SellBookComponent },
// //   { path: 'products/:productId', component: BookDetailsComponent },
// //   { path: 'cart', component: CartComponent }
// // ];

// // @NgModule({ // Correct decorator placement ABOVE the class
// //   imports: [RouterModule.forRoot(routes)],
// //   exports: [RouterModule]
// // export  class AppRoutingModule { // AppRoutingModule is now a CLASS
// //   constructor() { } // Class constructor (can be empty for modules in this case)
// // }

// // AppRoutingModule.ɵmod = /*@__PURE__*/ NgModule.ɵmod({ type: AppRoutingModule }); // Module Definition for Angular (Keep)
// // AppRoutingModule.ɵinj = /*@__PURE__*/ NgModule.ɵinj({ token: AppRoutingModule, factory: AppRoutingModule.ɵfac }); // Injector definition (Keep)
// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { HomeComponent } from './home/home.component.js';
// import { LoginComponent } from './login/login.component.js';
// import { BookListComponent } from './book-list/book-list.component.js';
// import { SellBookComponent } from './sell-book/sell-book.component.js';
// import { BookDetailsComponent } from './book-details/book-details.component.js';
// import { CartComponent } from './cart/cart.component.js';

// const routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'products', component: BookListComponent },
//   { path: 'sell-book', component: SellBookComponent },
//   { path: 'products/:productId', component: BookDetailsComponent },
//   { path: 'cart', component: CartComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
//  export class AppRoutingModule { // Correct inline export - this is enough!
//   constructor() { }
// }

// AppRoutingModule.ɵmod = /*@__PURE__*/ NgModule.ɵmod({ type: AppRoutingModule });
// AppRoutingModule.ɵinj = /*@__PURE__*/ NgModule.ɵinj({ token: AppRoutingModule, factory: AppRoutingModule.ɵfac });
 // src/app/app-routing.module.ts (Add route for OrderHistoryComponent)
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { BookListComponent } from './book-list/book-list.component';
// import { SellBookComponent } from './sell-book/sell-book.component';
// import { CartComponent } from './cart/cart.component';
// import { LoginComponent } from './login/login.component';
// import { RegistrationComponent } from './registration/registration.component';
// import { HomeComponent } from './home/home.component';
// import { AuthGuard } from './auth-guard.service';
// import { OrderHistoryComponent } from './order-history/order-history.component'; // Import OrderHistoryComponent

// const routes: Routes = [
//     { path: '', component: HomeComponent },
//     { path: 'books', component: BookListComponent },
//     { path: 'sell-book', component: SellBookComponent, canActivate: [AuthGuard] },
//     { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
//     { path: 'login', component: LoginComponent },
//     { path: 'register', component: RegistrationComponent },
//     { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard] }, // Add route for order-history, protected by AuthGuard
// ];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModule { }