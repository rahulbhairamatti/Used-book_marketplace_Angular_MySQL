// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment'; // Import environment

// const backendUrl = environment.apiUrl; // Or your backend base URL

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {

//   constructor(private http: HttpClient) { }

//   getOrderHistory(): Observable<any> { // Adjust 'any' to a more specific type if you have an Order model
//     // Assuming you have an API endpoint on your backend to fetch order history, e.g., '/api/order-history'
//     const orderHistoryUrl = `${backendUrl}/order-history`; // Adjust URL if needed

//     // You might need to include authorization headers or session cookies to authenticate the request
//     // if your backend requires authentication for fetching order history.
//     // Since you're using session-based auth, credentials should be sent automatically with CORS configured correctly.

//     return this.http.get(orderHistoryUrl, { withCredentials: true }); // Important: withCredentials for session cookies
//   }
// }
// order.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { Order } from './order.model';

// const backendUrl = environment.apiUrl;

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {

//   constructor(private http: HttpClient) { }

//   getOrderHistory(): Observable<Order[]> {
//     const orderHistoryUrl = `${backendUrl}/order-history`;
//     return this.http.get<Order[]>(orderHistoryUrl, { withCredentials: true });
//   }

// }
// order.service.ts (Add these new functions to your existing OrderService)

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// const backendUrl = environment.apiUrl;

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {

//   constructor(private http: HttpClient) { }

//   getOrderHistory(): Observable<any> {
//     const orderHistoryUrl = `${backendUrl}/order-history`;
//     return this.http.get(orderHistoryUrl, { withCredentials: true });
//   }

// //   // New function to complete order (call /api/order-complete)
// //   completeOrder(cartItems: any[], paymentMethod: string): Observable<any> {
// //     const checkoutData = {
// //       cartItems: cartItems,
// //       payment_method: paymentMethod
// //     };
// //     const orderCompleteUrl = `${backendUrl}/api/order-complete`;
// //     return this.http.post(orderCompleteUrl, checkoutData, { withCredentials: true });
// //   }
// // checkout(cartItems: any[], paymentMethod: string): Observable<any> { // You can rename the function to 'checkout' to match backend route
// //     const checkoutData = {
// //       cartItems: cartItems,
// //       payment_method: paymentMethod
// //     };
// //     const checkoutUrl = `${backendUrl}/api/checkout`; // NEW URL - CORRECT NOW: /api/checkout
// //     return this.http.post(checkoutUrl, checkoutData, { withCredentials: true });
// //   }
//   // New function to get order details by order ID (call /api/order-details/:orderId)
//   getOrderDetails(orderId: number): Observable<any> {
//     const orderDetailsUrl = `${backendUrl}/order-details/${orderId}`;
//     return this.http.get(orderDetailsUrl, { withCredentials: true });
//   }

// //   updateOrderStatusToCompleted(orderId: number): Observable<any> {
// //     const updateStatusUrl = `${backendUrl}/orders/${orderId}/status`; // Construct URL with orderId
// //     return this.http.put(updateStatusUrl, {}, { withCredentials: true }); // PUT request, empty body
// //   }
  
// }
// Order History Endpoint (Session-Based Authentication)
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Order } from './order.model'; // Import Order interface
// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {

//   constructor(private http: HttpClient) { }

//   getOrderHistory(): Observable<any> {
//     return this.http.get<any>('/api/orders/history');
//   }
// }
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Order } from './order.model'; // Import Order interface

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {

//   constructor(private http: HttpClient) { }

//   getOrderHistory(): Observable<any> { // You can be more specific with type here: Observable<{ boughtOrders: Order[], soldOrders: Order[] }>
//     return this.http.get<any>('/api/orders/history'); // Or: return this.http.get<{ boughtOrders: Order[], soldOrders: Order[] }>('/api/orders/history');
//   }
// }