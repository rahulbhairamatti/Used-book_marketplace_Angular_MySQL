import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface CartItem {
    product_id: number;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: CartItem[] = [];
    cartUpdated = new Subject<CartItem[]>();

    constructor() {
        this.loadCart();
    }

    getCartItems(): CartItem[] {
        return this.cartItems;
    }

    addToCart(book: any, quantityToAdd: number = 1): void { // Added quantity parameter with default 1
        console.log('addToCart called for book:', book, 'quantity:', quantityToAdd);

        if (quantityToAdd <= 0) { // **Add check for invalid quantity**
            console.warn('Invalid quantity to add:', quantityToAdd, '. Quantity must be greater than zero.');
            return; // Do not add if quantity is invalid
        }

        const existingItem = this.cartItems.find(item => item.product_id === book.product_id);

        if (existingItem) {
            existingItem.quantity += quantityToAdd; // Increment by quantityToAdd
        } else {
            this.cartItems.push({ product_id: book.product_id, quantity: quantityToAdd }); // Use quantityToAdd
        }
        this.saveCart();
        console.log('Cart updated. Current cartItems:', this.cartItems);
        this.cartUpdated.next([...this.cartItems]); // Notify components about cart update
    }

    clearCart(): void {
        this.cartItems = [];
        this.saveCart();
        this.cartUpdated.next([...this.cartItems]); // Notify components about cart update
    }

    removeItem(productId: number): void {
        this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
        this.saveCart();
        this.cartUpdated.next([...this.cartItems]); // Notify components about cart update
    }

    updateCart(updatedCartItems: CartItem[]): void {
        this.cartItems = updatedCartItems;
        this.saveCart();
        this.cartUpdated.next([...this.cartItems]); // Notify components about cart update
    }

    private saveCart(): void {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }

    private loadCart(): void {
        const cartData = localStorage.getItem('cartItems');
        if (cartData) {
            this.cartItems = JSON.parse(cartData);
        } else {
            this.cartItems = [];
        }
    }
}


// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// export interface CartItem {
//     product_id: number;
//     quantity: number;
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class CartService {
//     private cartItems: CartItem[] = [];
//     cartUpdated = new Subject<CartItem[]>();

//     constructor() {
//         this.loadCart();
//     }

//     getCartItems(): CartItem[] {
//         return this.cartItems;
//     }

//     addToCart(book: any, quantityToAdd: number = 1): void { // Added quantity parameter with default 1
//         console.log('addToCart called for book:', book, 'quantity:', quantityToAdd);

//         const existingItem = this.cartItems.find(item => item.product_id === book.product_id);

//         if (existingItem) {
//             existingItem.quantity += quantityToAdd; // Increment by quantityToAdd
//         } else {
//             this.cartItems.push({ product_id: book.product_id, quantity: quantityToAdd }); // Use quantityToAdd
//         }
//         this.saveCart();
//         console.log('Cart updated. Current cartItems:', this.cartItems);
//     }

//     clearCart(): void {
//         this.cartItems = [];
//         this.saveCart();
//     }

//     removeFromCart(productId: number): void {
//         this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
//         this.saveCart();
//     }

//     private saveCart(): void {
//         localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
//     }

//     private loadCart(): void {
//         const cartData = localStorage.getItem('cartItems');
//         if (cartData) {
//             this.cartItems = JSON.parse(cartData);
//         } else {
//             this.cartItems = [];
//         }
//     }
// }


// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// export interface CartItem { // CartItem interface
//     product_id: number;
//     quantity: number;
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class CartService {
//     private cartItems: CartItem[] = [];
//     cartUpdated = new Subject<CartItem[]>(); // You might still have this for potential future reactive updates

//     constructor() {
//         this.loadCart(); // Load cart from localStorage on service creation
//     }

//     getCartItems(): CartItem[] {
//         return this.cartItems;
//     }

//     addToCart(book: any): void {
//         console.log('addToCart called for book:', book); // Debug log

//         // **Corrected Logic: Check if product_id already exists in cartItems**
//         const existingItem = this.cartItems.find(item => item.product_id === book.product_id);
//         console.log('existingItem (product_id check):', existingItem); // Debug log

//         if (existingItem) {
//             console.log('Product ID already in cart - should NOT add again.'); // Debug log
//             alert('This book is already in your cart. Quantity is limited to 1 per book.');
//             return; // Exit without adding again
//         } else {
//             console.log('Product ID NOT in cart - adding now.'); // Debug log
//             this.cartItems.push({ product_id: book.product_id, quantity: 1 }); // Store only product_id and quantity
//             this.saveCart();
//             // this.cartUpdated.next([...this.cartItems]); // If you are using cartUpdated
//             console.log('Added to cart (product_id only):', book.product_id, 'Current cartItems:', this.cartItems); // Debug log
//         }
//     }

//     clearCart(): void {
//         this.cartItems = [];
//         this.saveCart();
//         // If you use cartUpdated, uncomment this:
//         // this.cartUpdated.next([...this.cartItems]); // Emit updated cart items
//     }

//     removeFromCart(productId: number): void { // You can add removeFromCart if needed
//         this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
//         this.saveCart();
//         // If you use cartUpdated, uncomment this:
//         // this.cartUpdated.next([...this.cartItems]); // Emit updated cart items
//     }


//     private saveCart(): void {
//         localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
//     }

//     private loadCart(): void {
//         const cartData = localStorage.getItem('cartItems');
//         if (cartData) {
//             this.cartItems = JSON.parse(cartData);
//         } else {
//             this.cartItems = []; // Initialize as empty array if no cart data in localStorage
//         }
//     }
// }

// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// export interface CartItem { // CartItem interface
//     product_id: number;
//     quantity: number;
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class CartService {
//     private cartItems: CartItem[] = [];
//     cartUpdated = new Subject<CartItem[]>(); // You might still have this for potential future reactive updates

//     constructor() {
//         this.loadCart(); // Load cart from localStorage on service creation
//     }

//     getCartItems(): CartItem[] {
//         return this.cartItems;
//     }
//     addToCart(book: any): void { // Keep book: any type for now
//       console.log('addToCart called for book:', book); // Debug log
  
//       // **Corrected Logic: Check if product_id already exists in cartItems**
//       const existingItem = this.cartItems.find(item => item.product_id === book.product_id);
//       console.log('existingItem (product_id check):', existingItem); // Debug log
  
//       if (existingItem) {
//           console.log('Product ID already in cart - should NOT add again.'); // Debug log
//           alert('This book is already in your cart. Quantity is limited to 1 per book.');
//           return; // Exit without adding again
//       } else {
//           console.log('Product ID NOT in cart - adding now.'); // Debug log
//           this.cartItems.push({ product_id: book.product_id, quantity: 1 }); // Still store product_id and quantity
//           this.saveCart();
//           // this.cartUpdated.next([...this.cartItems]); // If you are using cartUpdated
//           console.log('Added to cart (product_id only):', book.product_id, 'Current cartItems:', this.cartItems); // Debug log
//       }
//   }
//     clearCart(): void {
//         this.cartItems = [];
//         this.saveCart();
//         // If you use cartUpdated, uncomment this:
//         // this.cartUpdated.next([...this.cartItems]); // Emit updated cart items
//     }

//     removeFromCart(productId: number): void { // You can add removeFromCart if needed
//         this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
//         this.saveCart();
//         // If you use cartUpdated, uncomment this:
//         // this.cartUpdated.next([...this.cartItems]); // Emit updated cart items
//     }


//     private saveCart(): void {
//         localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
//     }

//     private loadCart(): void {
//         const cartData = localStorage.getItem('cartItems');
//         if (cartData) {
//             this.cartItems = JSON.parse(cartData);
//         } else {
//             this.cartItems = []; // Initialize as empty array if no cart data in localStorage
//         }
//     }
// }

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// //import { Book } from './model/book.model'; // Correct import for Book model

// export interface CartItem {
//   book: Book;
//   quantity: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   private cartItems: CartItem[] = [];
//   private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

//   constructor() { }

//   addToCart(book: Book, quantity: number = 1): void {
//     const existingItemIndex = this.cartItems.findIndex(item => item.book.id === book.id);

//     if (existingItemIndex > -1) {
//       this.cartItems[existingItemIndex].quantity += quantity;
//     } else {
//       this.cartItems.push({ book: book, quantity: quantity });
//     }
//     this.cartItemsSubject.next([...this.cartItems]);
//   }

//   removeFromCart(bookId: number): void {
//     this.cartItems = this.cartItems.filter(item => item.book.id !== bookId);
//     this.cartItemsSubject.next([...this.cartItems]);
//   }

//   getCartItems(): Observable<CartItem[]> {
//     return this.cartItemsSubject.asObservable();
//   }

//   getTotalPrice(): number {
//     return this.cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);
//   }

//   clearCart(): void {
//     this.cartItems = [];
//     this.cartItemsSubject.next([...this.cartItems]);
//   }
// }
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
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { environment } from 'src/environments/environment';
// export interface CartItem {
//     book: any;
//     quantity: number;
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class CartService {
//     cartItems: CartItem[] = [];
//     private apiUrl = environment.apiUrl;

//     constructor(private http: HttpClient) {
//         const storedCart = localStorage.getItem('book-cart');
//         if (storedCart) {
//             this.cartItems = JSON.parse(storedCart);
//         }
//     }

//     addToCart(book: any): void {
//         const existingItemIndex = this.cartItems.findIndex(item => item.book.product_id === book.product_id);

//         if (existingItemIndex > -1) {
//             this.cartItems[existingItemIndex].quantity++;
//         } else {
//             this.cartItems.push({ book: book, quantity: 1 });
//         }
//         this.updateLocalStorage();
//     }

//     getCartItems(): CartItem[] {
//         return this.cartItems;
//     }

//     clearCart(): void {
//         this.cartItems = [];
//         localStorage.removeItem('book-cart');
//     }

//     checkout(cartItems: CartItem[], paymentMethod: string): Observable<any> {
//         return this.http.post(`${this.apiUrl}/checkout`, { cartItems: cartItems, payment_method: paymentMethod });
//     }

//     private updateLocalStorage(): void {
//         localStorage.setItem('book-cart', JSON.stringify(this.cartItems));
//     }
// }

// import { Injectable } from '@angular/core';

// export interface CartItem {
//   book: any;
//   quantity: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   cartItems: CartItem[] = [];

//   constructor() {
//     const storedCart = localStorage.getItem('book-cart');
//     if (storedCart) {
//       this.cartItems = JSON.parse(storedCart);
//     }
//   }

//   addToCart(book: any): void {
//     const existingItemIndex = this.cartItems.findIndex(item => item.book.product_id === book.product_id);

//     if (existingItemIndex > -1) {
//       this.cartItems[existingItemIndex].quantity++;
//     } else {
//       this.cartItems.push({ book: book, quantity: 1 });
//     }
//     this.updateLocalStorage();
//   }

//   getCartItems(): CartItem[] {
//     return this.cartItems;
//   }

//   clearCart(): void {
//     this.cartItems = [];
//     this.updateLocalStorage();
//   }

//   private updateLocalStorage(): void {
//     localStorage.setItem('book-cart', JSON.stringify(this.cartItems));
//   }
// }
//client/src/app/cart.service.ts
// import { Injectable } from '@angular/core';

// // Define a CartItem interface for better type safety
// export interface CartItem {
//   book: any; // Or define a Book interface and use it here for type safety
//   quantity: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   cartItems: CartItem[] = []; // Use CartItem interface for type safety

//   constructor() {
//     const storedCart = localStorage.getItem('book-cart');
//     if (storedCart) {
//       this.cartItems = JSON.parse(storedCart);
//     }
//   }

//   addToCart(book: any): void {
//     // Check if the book is already in the cart
//     const existingItemIndex = this.cartItems.findIndex(item => item.book.id === book.id); // Assuming books have a unique 'id'

//     if (existingItemIndex > -1) {
//       // If i/tem exists, increment quantity
//       this.cartItems[existingItemIndex].quantity++;
//     } else {
//       // If item doesn't exist, add it to the cart with quantity 1
//       this.cartItems.push({ book: book, quantity: 1 });
//     }
//     this.updateLocalStorage();
//   }

//   getCartItems(): CartItem[] { // Return type CartItem[]
//     return this.cartItems;
//   }

//   clearCart(): void {
//     this.cartItems = [];
//     this.updateLocalStorage();
//   }

//   private updateLocalStorage(): void {
//     localStorage.setItem('book-cart', JSON.stringify(this.cartItems));
//   }
// }
// // client/src/app/cart.service.ts
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   cartItems: any[] = [];

//   constructor() {
//     const storedCart = localStorage.getItem('book-cart');
//     if (storedCart) {
//       this.cartItems = JSON.parse(storedCart);
//     }
//   }

//   addToCart(book: any): void {
//     this.cartItems.push(book);
//     this.updateLocalStorage();
//   }

//   getCartItems(): any[] {
//     return this.cartItems;
//   }

//   clearCart(): void {
//     this.cartItems = [];
//     this.updateLocalStorage();
//   }

//   private updateLocalStorage(): void {
//     localStorage.setItem('book-cart', JSON.stringify(this.cartItems));
//   }
// }
// // client/src/app/cart.service.js
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// }) // Apply Injectable decorator

// function CartService() { // Constructor
//   this.cartItems = [];
//   var storedCart = localStorage.getItem('book-cart');
//   if (storedCart) {
//     this.cartItems = JSON.parse(storedCart);
//   }

//   this.addToCart = function(book) {
//     this.cartItems.push(book);
//     this.updateLocalStorage();
//   };

//   this.getCartItems = function() {
//     return this.cartItems;
//   };

//   this.clearCart = function() {
//     this.cartItems = [];
//     this.updateLocalStorage();
//   };

//   this.updateLocalStorage = function() {
//     localStorage.setItem('book-cart', JSON.stringify(this.cartItems));
//   };
// }

// CartService.prototype = {
//   constructor: CartService,
//   addToCart: CartService.prototype.addToCart,
//   getCartItems: CartService.prototype.getCartItems,
//   clearCart: CartService.prototype.clearCart,
//   updateLocalStorage: CartService.prototype.updateLocalStorage
// };


// CartService.ɵfac = function (t) { return new (t || CartService)(); }; // Factory
// // CartService.ɵprov = /*@__PURE__*/ Injectable.ɵprov({ token: CartService, factory: CartService.ɵfac, providedIn: 'root' }); // Provider Definition


// export { CartService };
// // import { Injectable } from '@angular/core';

// // @Injectable({ // Correct decorator placement ABOVE the class
// //   providedIn: 'root'
// // })
// // export class CartService { // CartService is now a CLASS
// //   cartItems = []; // Initialize cartItems as class property

// //   constructor() { // Class constructor (for initialization)
// //     const storedCart = localStorage.getItem('book-cart');
// //     if (storedCart) {
// //       this.cartItems = JSON.parse(storedCart);
// //     }
// //   }

// //   addToCart(book) { // addToCart method as class method
// //     this.cartItems.push(book);
// //     this.updateLocalStorage();
// //   }

// //   getCartItems() { // getCartItems method as class method
// //     return this.cartItems;
// //   }

// //   clearCart() { // clearCart method as class method
// //     this.cartItems = [];
// //     this.updateLocalStorage();
// //   }

// //   updateLocalStorage() { // updateLocalStorage method as class method
// //     localStorage.setItem('book-cart', JSON.stringify(this.cartItems));
// //   }
// // }

// // CartService.ɵfac = function (t) { return new (t || CartService)(); }; // Factory (Keep)
// // CartService.ɵprov = /*@__PURE__*/ Injectable.ɵprov({ token: CartService, factory: CartService.ɵfac, providedIn: 'root' }); // Provider Definition (Keep)

// //  //export { CartService };