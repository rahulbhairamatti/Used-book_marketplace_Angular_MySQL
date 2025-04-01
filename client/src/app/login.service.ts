// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Book } from '../book-list/book-list.component'; // Assuming Book interface/class is defined here, adjust path if needed

// interface CartItem {
//   book: Book;
//   quantity: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   private cartItems: CartItem[] = [];
//   private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems); // Observable source of cart items

//   constructor() {
//     // You could load cart data from local storage here on service initialization (future enhancement)
//     // For now, starting with an empty cart in memory
//   }

//   addToCart(book: Book, quantity: number = 1): void {
//     const existingItemIndex = this.cartItems.findIndex(item => item.book.id === book.id);

//     if (existingItemIndex > -1) {
//       // If item already exists, update the quantity
//       this.cartItems[existingItemIndex].quantity += quantity;
//     } else {
//       // If item is new, add it to the cart
//       this.cartItems.push({ book: book, quantity: quantity });
//     }
//     this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers about cart changes (using spread operator for immutability)
//   }

//   removeFromCart(bookId: number): void {
//     this.cartItems = this.cartItems.filter(item => item.book.id !== bookId);
//     this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
//   }

//   getCartItems(): Observable<CartItem[]> {
//     return this.cartItemsSubject.asObservable(); // Return observable of cart items
//   }

//   getTotalPrice(): number {
//     return this.cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);
//   }

//   clearCart(): void {
//     this.cartItems = [];
//     this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers of empty cart
//     // You could also clear local storage cart data here if you were using it (future enhancement)
//   }
// }
// // // import { Injectable } from '@angular/core';

// // // @Injectable({ // Optional @Injectable decorator for services (good practice)
// // //   providedIn: 'root' // Or 'AppModule' if you prefer module-level provision
// // // })
// // // export class LoginService {

// //   // constructor() {
// //   //   // You can add constructor logic here if needed.
// //   //   // For now, it's empty.
// //   // }
// // // client/src/app/login.service.ts
// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { environment } from 'src/environments/environment.ts';
// //  const baseUrl = 'http://localhost:4000/api/auth';
// //     const backendBaseUrl = 'http://localhost:4000'
// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class LoginService {

// //   // private apiUrl = '/api'; // Or your backend API base URL (e.g., 'http://localhost:3000/api')
// //  private apiUrl = environment.apiUrl + '/auth';
// //   constructor(private http: HttpClient) { }

// //   login(username: string, password: string): Observable<any> {
// //     const loginData = {
// //       username: username,
// //       password: password
// //     };
// //     // Make an HTTP POST request to your backend login endpoint
// //     // Assuming your backend login endpoint is '/api/login' and expects
// //     // username and password in the request body (as JSON)
// //     return this.http.post(`${baseUrl}/login`, loginData);
// //   }
// // }
// // //   // (Optional) You might want to add methods to:
// // //   // - Check if user is logged in (e.g., check for a token in localStorage)
// // //   // - Logout user (e.g., clear token from localStorage)
// // //   // - Store user authentication token after successful login (e.g., in localStorage or sessionStorage)

// // // }
// // //   // You will add your login service methods here later.
// // //   // For example: login(), logout(), isLoggedIn(), etc.