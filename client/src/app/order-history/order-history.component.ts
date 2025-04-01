// // import { Component, OnInit } from '@angular/core';
// // import { AuthService } from '../auth.service';

// // @Component({
// //     selector: 'app-order-history',
// //     templateUrl: './order-history.component.html',
// //     styleUrls: ['./order-history.component.css']
// // })
// // export class OrderHistoryComponent implements OnInit {
// //     orderHistory: any[] = []; // Array to store order history data
// //     loading = true; // To indicate loading state
// //     error: string | null = null; // To store error messages

// //     constructor(private authService: AuthService) { }

// //     ngOnInit(): void {
// //         this.loading = true;
// //         this.error = null;
// //         this.authService.getOrderHistory().subscribe({
// //             next: (history) => {
// //                 this.orderHistory = history;
// //                 this.loading = false;
// //             },
// //             error: (err) => {
// //                 console.error('Error fetching order history', err);
// //                 this.error = 'Failed to load order history. Please try again later.';
// //                 this.loading = false;
// //             }
// //         });
// //     }
// // }
// import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../order.service'; // Import OrderService

// @Component({
//   selector: 'app-order-history',
//   templateUrl: './order-history.component.html',
//   styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit {

//   orderHistory: any[] = []; // Or use a more specific type/interface for Order data

//   constructor(private orderService: OrderService) { } // Inject OrderService

//   ngOnInit(): void {
//     this.loadOrderHistory();
//   }

//   loadOrderHistory(): void {
//     this.orderService.getOrderHistory().subscribe({ // Use orderService.getOrderHistory()
//       next: (data: any) => { // Adjust 'any' to your Order model if available
//         this.orderHistory = data;
//         console.log('Order history fetched:', data);
//       },
//       error: (error: any) => {
//         console.error('Error fetching order history:', error);
//         // Handle error appropriately (e.g., display error message to user)
//       }
//     });
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../order.service';

// @Component({
//   selector: 'app-order-history',
//   templateUrl: './order-history.component.html',
//   styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit {

//   orderHistory: any[] = [];
//   loading: boolean = false; // Add loading property, initialize to false
//   error: string | null = null; // Add error property, initialize to null

//   constructor(private orderService: OrderService) { }

//   ngOnInit(): void {
//     this.loadOrderHistory();
//   }

//   loadOrderHistory(): void {
//     this.loading = true; // Set loading to true before API call
//     this.error = null;     // Clear any previous errors

//     this.orderService.getOrderHistory().subscribe({
//       next: (data: any) => {
//         this.orderHistory = data;
//         this.loading = false; // Set loading to false on success
//         console.log('Order history fetched:', data);
//       },
//       error: (errorResponse: any) => {
//         this.loading = false; // Set loading to false on error
//         this.error = 'Failed to load order history. Please try again later.'; // Set error message
//         console.error('Error fetching order history:', errorResponse);
//         // Optionally, you can extract a more user-friendly error message from errorResponse.error if your backend sends one.
//         if (errorResponse && errorResponse.message) {
//           this.error = errorResponse.message;
//         }
//       }
//     });
//   }
// }
// order-history.component.ts
// import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../order.service';
// import { Order } from '../order.model';

// @Component({
//   selector: 'app-order-history',
//   templateUrl: './order-history.component.html',
//   styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit {

//   orderHistory: Order[] = [];
//   loading: boolean = false;
//   error: string | null = null;

//   constructor(private orderService: OrderService) { }

//   ngOnInit(): void {
//     this.loadOrderHistory();
//   }

//   loadOrderHistory(): void {
//     this.loading = true;
//     this.error = null;

//     this.orderService.getOrderHistory().subscribe({
//       next: (data: Order[]) => {
//         this.orderHistory = data;
//         this.loading = false;
//         console.log('Order history fetched:', data);
//       },
//       error: (errorResponse: any) => {
//         this.loading = false;
//         this.error = 'Failed to load order history. Please try again later.';
//         console.error('Error fetching order history:', errorResponse);
//         if (errorResponse && errorResponse.message) {
//           this.error = errorResponse.message;
//         }
//       }
//     });
//   }
// }
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-order-history',
//   templateUrl: './order-history.component.html',
//   styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { OrderService } from '../order.service';
// import { Observable, Subscription } from 'rxjs';

// @Component({
//     selector: 'app-order-history',
//     templateUrl: './order-history.component.html',
//     styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit, OnDestroy {
//     boughtOrders: any[] = [];
//     soldOrders: any[] = [];
//     isLoggedIn$: Observable<boolean>;
//     private orderHistorySubscription?: Subscription;

//     constructor(
//         public authService: AuthService,
//         private orderService: OrderService
//     ) {
//         this.isLoggedIn$ = authService.isLoggedIn$;
//     }

//     ngOnInit(): void {
//         this.fetchOrderHistory();
//     }

//     ngOnDestroy(): void {
//         if (this.orderHistorySubscription) {
//             this.orderHistorySubscription.unsubscribe();
//         }
//     }

//     fetchOrderHistory(): void {
//         this.orderHistorySubscription = this.orderService.getOrderHistory().subscribe(
//             (data: any) => {
//                 this.boughtOrders = data.boughtOrders;
//                 this.soldOrders = data.soldOrders;

//             },
//             error => {
//                 console.error('Error fetching order history:', error);
//                 alert('Failed to load order history.');
//             }
//         );
//     }
// }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { OrderService } from '../order.service';
// import { Observable, Subscription } from 'rxjs';
// import { Order } from '../order.model'; // Import Order interface

// @Component({
//     selector: 'app-order-history',
//     templateUrl: './order-history.component.html',
//     styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit, OnDestroy {
//     boughtOrders: Order[] = []; // Type as Order[]
//     soldOrders: Order[] = [];   // Type as Order[]
//     isLoggedIn$: Observable<boolean>;
//     private orderHistorySubscription?: Subscription;

//     constructor(
//         public authService: AuthService,
//         private orderService: OrderService
//     ) {
//         this.isLoggedIn$ = authService.isLoggedIn$;
//     }

//     ngOnInit(): void {
//         this.fetchOrderHistory();
//     }

//     ngOnDestroy(): void {
//         if (this.orderHistorySubscription) {
//             this.orderHistorySubscription.unsubscribe();
//         }
//     }

//     fetchOrderHistory(): void {
//         this.orderHistorySubscription = this.orderService.getOrderHistory().subscribe(
//             (data: any) => { // You can be more specific with type here: (data: { boughtOrders: Order[], soldOrders: Order[] }) => {
//                 this.boughtOrders = data.boughtOrders; // Now assign to Order[] array
//                 this.soldOrders = data.soldOrders;     // Now assign to Order[] array
//             },
//             error => {
//                 console.error('Error fetching order history:', error);
//                 alert('Failed to load order history.');
//             }
//         );
//     }
// }