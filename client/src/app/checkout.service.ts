// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment'; // Import environment

// const backendUrl = environment.apiUrl; // Base backend URL from environment

// @Injectable({
//   providedIn: 'root'
// })
// export class CheckoutService { // Or you could name this CartService and add checkout functionality there

//   constructor(private http: HttpClient) { }

//   checkout(cartItems: any[], paymentMethod: string): Observable<any> { // Adjust type of cartItems and response as needed
//     const checkoutData = {
//       cartItems: cartItems, // Array of cart items
//       payment_method: paymentMethod // Payment method selected by user (e.g., "Cash on Delivery")
//     };
//     const checkoutUrl = `${backendUrl}/checkout`; // **Checkout URL: /api/checkout**

//     return this.http.post(checkoutUrl, checkoutData, { withCredentials: true }); // POST request to checkout endpoint
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Import environment

const backendUrl = environment.apiUrl; // Base backend URL from environment
//const backendUrl = '/api';
@Injectable({
    providedIn: 'root'
})
export class CheckoutService { // Or you could name this CartService and add checkout functionality there

    constructor(private http: HttpClient) { }

    checkout(cartItems: any[], paymentMethod: string, shippingCity: string): Observable<any> { // **NEW: Added shippingCity parameter**
        const checkoutData = {
            cartItems: cartItems, // Array of cart items
            payment_method: paymentMethod, // Payment method selected by user (e.g., "Cash on Delivery")
            shippingCity: shippingCity  // **NEW: Include shippingCity in checkoutData**
        };
        const checkoutUrl = `${backendUrl}/checkout`; // **Checkout URL: /api/checkout**

        return this.http.post(checkoutUrl, checkoutData, { withCredentials: true }); // POST request to checkout endpoint
    }
}