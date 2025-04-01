import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for making API calls
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Import your AppRoutingModule
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { SellBookComponent } from './sell-book/sell-book.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
//import { OrderHistoryComponent } from './order-history/order-history.component'; // Import OrderHistoryComponent
import { AuthService } from './auth.service';
import { BookService } from './book.service';
import { CartService } from './cart.service';
import { CheckoutService } from './checkout.service';
//import { OrderService } from './order.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthGuard } from './auth-guard.service'; // Import AuthGuard

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    SellBookComponent,
    CartComponent,
    LoginComponent,
    RegistrationComponent,
    BookDetailsComponent,
    HomeComponent,
    OrderConfirmationComponent
   // OrderHistoryComponent
   // OrderHistoryComponent // Add OrderHistoryComponent to declarations
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Add FormsModule to imports
    HttpClientModule // Add HttpClientModule to imports
  ],
  providers: [
    AuthService,
    BookService,
    CartService,
   // OrderService,
    CheckoutService,
    AuthGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// // import { NgModule } from '@angular/core';
// // import { BrowserModule } from '@angular/platform-browser';
// // import { FormsModule } from '@angular/forms'; // Import FormsModule if you are using forms
// // import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for making HTTP requests

// // import { AppRoutingModule } from './app-routing.module';
// // import { AppComponent } from './app.component';
// // import { BookListComponent } from './book-list/book-list.component';
// // import { BookDetailsComponent } from './book-details/book-details.component';
// // import { CartComponent } from './cart/cart.component';
// // import { HomeComponent } from './home/home.component';
// // import { LoginComponent } from './login/login.component';
// // import { SellBookComponent } from './sell-book/sell-book.component';

// // @NgModule({
// //   declarations: [
// //     AppComponent,
// //     BookListComponent,
// //     BookDetailsComponent,
// //     CartComponent,
// //     HomeComponent,
// //     LoginComponent,
// //     SellBookComponent
// //   ],
// //   imports: [
// //     BrowserModule,
// //     AppRoutingModule,
// //     HttpClientModule, // Add HttpClientModule to imports
// //     FormsModule     // Add FormsModule if you are using forms in your components
// //   ],
// //   providers: [],
// //   bootstrap: [AppComponent]
// // })
// // export class AppModule {  constructor() {}}
// // import { NgModule } from '@angular/core';
// // import { BrowserModule } from '@angular/platform-browser';
// // import { RouterModule } from '@angular/router'; // Import RouterModule
// // import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

// // import { AppRoutingModule } from './app-routing.module.js'; // Import AppRoutingModule
// // import { AppComponent } from './app.component.js';         // Import AppComponent
// // import { BookListComponent } from './book-list/book-list.component.js'; // Import BookListComponent
// // import { BookDetailsComponent } from './book-details/book-details.component.js'; // Import BookDetailsComponent
// // import { CartComponent } from './cart/cart.component.js';           // Import CartComponent
// // import { HomeComponent } from './home/home.component.js';           // Import HomeComponent
// // import { LoginComponent } from './login/login.component.js';         // Import LoginComponent
// // import { SellBookComponent } from './sell-book/sell-book.component.js'; // Import SellBookComponent

// // import { BookService } from './book.service.js'; // Import BookService
// // import { CartService } from './cart.service.js'; // Import CartService


// // @NgModule({ // <-- Ensure @NgModule decorator is present and ABOVE class
// //   declarations: [ // <-- 'declarations' array - list your COMPONENTS here by CLASS NAME
// //     AppComponent,
// //     BookListComponent,
// //     BookDetailsComponent,
// //     CartComponent,
// //     HomeComponent,
// //     LoginComponent,
// //     SellBookComponent
// //   ],
// //   imports: [ // <-- 'imports' array - list MODULES your app uses
// //     BrowserModule,
// //     AppRoutingModule, // <-- Include AppRoutingModule here
// //     HttpClientModule, // <-- Include HttpClientModule here
// //     RouterModule // <-- Make sure RouterModule is also imported here if you use routing
// //   ],
// //   providers: [ // <-- 'providers' array - list your SERVICES here by CLASS NAME
// //     BookService,
// //     CartService
// //   ],
// //   bootstrap: [AppComponent] // <-- 'bootstrap' array - should be [AppComponent] to start your app with AppComponent
// // })

// // export class AppModule { // <-- AppModule is a CLASS
// //   constructor() { }
// // }
// // AppModule.ɵmod = /*@__PURE__*/ NgModule.ɵmod({ type: AppModule }); // Injector definition (Keep this line)
// // AppModule.ɵinj = /*@__PURE__*/ NgModule.ɵinj({ token: AppModule, factory: AppModule.ɵfac }); // Module factory definition (Keep this line)

// //export { AppModule }; // <-- Export AppModule at the end
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router'; // Import RouterModule
// import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

// import { AppRoutingModule } from './app-routing.module.js'; // Import AppRoutingModule
// import { AppComponent } from './app.component.js';         // Import AppComponent
// import { BookListComponent } from './book-list/book-list.component.js'; // Import BookListComponent
// import { BookDetailsComponent } from './book-details/book-details.component.js'; // Import BookDetailsComponent
// import { CartComponent } from './cart/cart.component.js';           // Import CartComponent
// import { HomeComponent } from './home/home.component.js';           // Import HomeComponent
// import { LoginComponent } from './login/login.component.js';         // Import LoginComponent
// // import { SellBookComponent } from './sell-book/sell-book.component.js'; // Import SellBookComponent

// // import { BookService } from './book.service.js'; // Import BookService
// // import { CartService } from './cart.service.js'; // Import CartService
// // import { LoginService } from './login.service.js'; // Import LoginService  <--- Make sure login.service.js exists!

// // @NgModule({ 
// //   declarations: [ 
// //     AppComponent,
// //     BookListComponent,
// //     BookDetailsComponent,
// //     CartComponent,
// //     HomeComponent,
// //     LoginComponent,
// //     SellBookComponent
// //   ],
// //   imports: [ 
// //     BrowserModule,
// //     AppRoutingModule, // <-- Include AppRoutingModule
// //     HttpClientModule, // <-- Include HttpClientModule
// //     RouterModule     // <-- Include RouterModule if using routing
// //   ],
// //   providers: [ 
// //     BookService,
// //     CartService,
// //     LoginService   // <-- Include LoginService in providers
// //   ],
// //   bootstrap: [AppComponent] // <-- 'bootstrap' array - [AppComponent] to start app
// // })
// // export class AppModule { // <-- Export class AppModule - inline export
// //   constructor() { }
// // }

// // AppModule.ɵmod = /*@__PURE__*/ NgModule.ɵmod({ type: AppModule }); // Angular Module Definition (Keep)
// // AppModule.ɵinj = /*@__PURE__*/ NgModule.ɵinj({ token: AppModule, factory: AppModule.ɵfac }); // Angular Injector Definition (Keep)

// // // DO NOT ADD:  export { AppModule };  here. It is redundant and WRONG.
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms'
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { BookListComponent } from './book-list/book-list.component';
// import { BookDetailsComponent } from './book-details/book-details.component';
// import { CartComponent } from './cart/cart.component';
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { SellBookComponent } from './sell-book/sell-book.component';
// import { RegistrationComponent } from './registration/registration.component';
// import { BookService } from './book.service';
// import { CartService } from './cart.service';
// // import { LoginService } from './login.service';
// import { AuthService } from './auth.service';
// //import { LoginService } from './login.service';
// import { ReactiveFormsModule } from '@angular/forms';
// @NgModule({
//   declarations: [
//     AppComponent,
//     BookListComponent,
//     RegistrationComponent,
//     BookDetailsComponent,
//     CartComponent,
//     HomeComponent,
//     LoginComponent,
//     SellBookComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     RouterModule,
//     FormsModule,
//     ReactiveFormsModule
//   ],
//   providers: [
//     BookService,
//     CartService,
//     AuthService,
   
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {
//   constructor() { }
// }

// AppModule.ɵmod = /*@__PURE__*/ NgModule.ɵmod({ type: AppModule });
// AppModule.ɵinj = /*@__PURE__*/ NgModule.ɵinj({ token: AppModule, factory: AppModule.ɵfac });