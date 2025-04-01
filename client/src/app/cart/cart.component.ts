// // client/src/app/cart/cart.component.js
// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../cart.service';

// Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })(CartComponent); // Apply Component decorator

// function CartComponent(cartService) { // Constructor
//   this.cartService = cartService;
//   this.cartItems = []; // Initialize cartItems
// }

// CartComponent.prototype = {
//   constructor: CartComponent,
//   ngOnInit: function() {
//     this.cartItems = this.cartService.getCartItems();
//   },
//   clearCart: function() {
//     this.cartService.clearCart();
//     this.cartItems = [];
//     alert('Cart cleared!');
//   }
// };


// CartComponent.ɵfac = function (t) { return new (t || CartComponent)(CartService); }; // Factory
// CartComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition
//   type: CartComponent,
//   selectors: [["app-cart"]],
//    NgOnChangesFeature: false, ngOnDestroy: null, ngDoCheck: null, ngAfterContentInit: null, ngAfterContentChecked: null, ngAfterViewInit: null, ngAfterViewChecked: null, ɵprov: undefined, changeDetection: 0,
//   inputs: { cartService : "cartService" },
//   features: [  ],
//   decls: 15,
//   vars: 3,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });
// // import { Component, OnInit } from '@angular/core';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent { // Removed: implements OnInit
//   cartItems = [];

//   constructor(cartService) { // Removed parameter modifiers and types
//     this.cartService = cartService;
//   }

//   ngOnInit() { // Kept ngOnInit method, just removed 'implements OnInit' from class
//     this.cartItems = this.cartService.getCartItems();
//   }

//   clearCart() {
//     this.cartService.clearCart();
//     this.cartItems = [];
//     alert('Cart cleared!');
//   }
// }

// CartComponent.ɵfac = function (t) { return new (t || CartComponent)(CartService); };
// CartComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({
//   type: CartComponent,
//   selectors: [["app-cart"]],
//   features: [ ],
//   decls: 15,
//   vars: 3,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });
// export { CartComponent };
// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../cart.service';

// @Component({ // Correct decorator placement ABOVE the class
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
//  export class CartComponent  { // CartComponent is now a CLASS
//   cartItems = []; // Initialize cartItems as class property
//   cartService;

//   constructor(cartService) { // Class constructor with dependency injection
//     this.cartService = cartService;
//   }

//   ngOnInit() { // ngOnInit lifecycle hook as class method
//     this.cartItems = this.cartService.getCartItems();
//   }

//   clearCart() { // clearCart method as class method
//     this.cartService.clearCart();
//     this.cartItems = [];
//     alert('Cart cleared!');
//   }
// }

// CartComponent.ɵfac = function (t) { return new (t || CartComponent)(CartService); }; // Factory (Keep)
// CartComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition (Keep)
//   type: CartComponent,
//   selectors: [["app-cart"]],
//   inputs: { cartService : "cartService" },
//   features: [ ],
//   decls: 15,
//   vars: 3,
//   consts: [ ],
// //   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
// //   encapsulation: 2,
// //   changeDetection: 0
// // });
// // client/src/app/cart/cart.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../cart.service'; // Assuming correct path

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = []; // Initialize as empty array, type 'any[]' or CartItem interface

//   constructor(private cartService: CartService) { // Inject CartService
//     // No need to assign, Angular DI handles it
//   }

//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCartItems();
//   }

//   clearCart(): void {
//     this.cartService.clearCart();
//     this.cartItems = [];
//     alert('Cart cleared!');
//   }
// }
// //  export { CartComponent };
// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../cart.service'; // Assuming correct path

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = []; // Initialize as empty array, type 'any[]' or CartItem interface
//   shippingCost: number = 5.00; // Define shipping cost

//   constructor(private cartService: CartService) {
//     // No need to assign, Angular DI handles it
//   }

//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCartItems();
//   }

//   clearCart(): void {
//     this.cartService.clearCart();
//     this.cartItems = [];
//     alert('Cart cleared!');
//   }

//   // Method to calculate subtotal
//   calculateSubtotal(): number {
//     let subtotal = 0;
//     for (const item of this.cartItems) {
//       subtotal += item.price * item.quantity; // Assuming each item has 'price' and 'quantity'
//     }
//     return subtotal;
//   }

//   // Method to calculate total including shipping
//   calculateTotal(): number {
//     return this.calculateSubtotal() + this.shippingCost;
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../cart.service'; // Assuming correct path

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = [];
//   shippingCost: number = 5.00;

//   constructor(private cartService: CartService) { }

//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCartItems();
//     console.log('Cart Items in ngOnInit:', this.cartItems); // <-- DEBUGGING LOG - IMPORTANT!
//   }

//   clearCart(): void {
//     this.cartService.clearCart();
//     this.cartItems = [];
//     alert('Cart cleared!');
//   }

//   proceedToCheckout(): void {
//     if (this.cartItems.length > 0) {
//       alert('Proceeding to checkout with ' + this.cartItems.length + ' items. (Checkout process not fully implemented yet in this example)');
//       // In a real application, you would:
//       // 1. Navigate to a checkout page (using Router)
//       // 2. Collect user details (shipping address, payment info)
//       // 3. Send order data to your backend API for processing and payment
//     } else {
//       alert('Your cart is empty. Add items to checkout.');
//     }
//   }

//   calculateSubtotal(): number {
//     let subtotal = 0;
//     for (const item of this.cartItems) {
//         const price = parseFloat(item.book.price);     // Convert book.price to number - ACCESSING book.price
//         const quantity = parseInt(String(item.quantity), 10); // Convert quantity to integer, ensure it's a string first

//         if (!isNaN(price) && !isNaN(quantity)) { // Check if conversion was successful
//             subtotal += price * quantity;
//         } else {
//             console.warn('Invalid price or quantity in cart item:', item); // Log warning for invalid data
//         }
//     }
//     return subtotal;
// }
  // calculateSubtotal(): number {
  //   let subtotal = 0;
  //   for (const item of this.cartItems) {
  //       const price = parseFloat(item.book.price);     // Convert book.price to number - ACCESSING book.price
  //       const quantity = parseInt(String(item.quantity), 10); // Convert quantity to integer

  //       if (!isNaN(price) && !isNaN(quantity)) { // Check for valid numbers
  //           subtotal += price * quantity;
  //       } else {
  //           console.warn('Invalid price or quantity in cart item:', item); // Log warning
  //       }
  //   }
  //   return subtotal;
  // }


//   calculateTotal(): number {
//     return this.calculateSubtotal() + this.shippingCost;
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../cart.service';
// import { Router } from '@angular/router';

// @Component({
//     selector: 'app-cart',
//     templateUrl: './cart.component.html',
//     styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//     cartItems: any[] = [];
//     shippingCost: number = 5.00;
//     checkoutError: string = '';
//     checkoutSuccess: boolean = false;

//     constructor(private cartService: CartService, private router: Router) { }

//     ngOnInit(): void {
//         this.cartItems = this.cartService.getCartItems();
//         console.log('Cart Items in ngOnInit:', this.cartItems); // <-- DEBUGGING LOG - IMPORTANT!
//     }

//     clearCart(): void {
//         this.cartService.clearCart();
//         this.cartItems = [];
//         this.checkoutSuccess = false;
//         this.checkoutError = '';
//         alert('Cart cleared!');
//     }

//     proceedToCheckout(): void {
//         if (this.cartItems.length === 0) {
//             alert('Your cart is empty. Add items to checkout.');
//             return;
//         }

//         this.checkoutError = '';
//         this.checkoutSuccess = false;

//         this.cartService.checkout(this.cartItems, 'Cash on Delivery')
//             .subscribe({
//                 next: (response) => {
//                     console.log('Checkout successful', response);
//                     this.checkoutSuccess = true;
//                     this.cartService.clearCart();
//                     this.cartItems = [];
//                     // Optionally: this.router.navigate(['/order-confirmation', response.orderId]);
//                 },
//                 error: (errorResponse) => {
//                     console.error('Checkout failed', errorResponse);
//                     this.checkoutError = errorResponse.error.message || 'Checkout failed.';
//                     this.checkoutSuccess = false;
//                 }
//             });
//     }

//     calculateSubtotal(): number {
//         let subtotal = 0;
//         for (const item of this.cartItems) {
//             const price = parseFloat(item.book.price);
//             const quantity = parseInt(String(item.quantity), 10);

//             if (!isNaN(price) && !isNaN(quantity)) {
//                 subtotal += price * quantity;
//             } else {
//                 console.warn('Invalid price or quantity in cart item:', item);
//             }
//         }
//         return subtotal;
//     }

//     calculateTotal(): number {
//         return this.calculateSubtotal() + this.shippingCost;
//     }
// }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CartService } from '../cart.service';
// import { Router } from '@angular/router';
// import { CartItem } from '../cart.service'; // Import CartItem interface
// import { Subscription } from 'rxjs';
// import { CheckoutService } from '../checkout.service';
// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit, OnDestroy {

//   cartItems: CartItem[] = []; // Type as CartItem[]
//   shippingCost: number = 5.00;
//   checkoutError: string = '';
//   checkoutSuccess: boolean = false;
//   private cartSubscription?: Subscription; // Subscription for cart updates
//   paymentMethod: string = 'Cash on Delivery'; // Default, or get from user input

//   constructor(private cartService: CartService, private router: Router) { }

//   ngOnInit(): void {
//     this.cartSubscription = this.cartService.getCartItems().subscribe(items => { // Store subscription
//       this.cartItems = items;
//       console.log('Cart Items updated in CartComponent:', this.cartItems);
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.cartSubscription) {
//       this.cartSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
//     }
//   }

//   clearCart(): void {
//     this.cartService.clearCart();
//     this.checkoutSuccess = false;
//     this.checkoutError = '';
//     alert('Cart cleared!');
//   }

//   proceedToCheckout(): void {
//     if (this.cartItems.length === 0) {
//       alert('Your cart is empty. Add items to checkout.');
//       return;
//     }

//     this.checkoutError = '';
//     this.checkoutSuccess = false;

//     // Placeholder checkout logic - You need to implement checkout in cart.service
//     console.log('Proceeding to checkout with items:', this.cartItems);
//     alert('Checkout functionality is not fully implemented in this example.  See console for checkout request data.');

//     /* Example checkout call (implement in cart.service):
//     this.cartService.checkout(this.cartItems, 'Cash on Delivery')
//       .subscribe({
//         next: (response) => { ... },
//         error: (errorResponse) => { ... }
//       });
//     */
//   }

//   calculateSubtotal(): number {
//     let subtotal = 0;
//     for (const item of this.cartItems) {
//       const price = parseFloat(String(item.book.price));
//       const quantity = parseInt(String(item.quantity), 10);

//       if (!isNaN(price) && !isNaN(quantity)) {
//         subtotal += price * quantity;
//       } else {
//         console.warn('Invalid price or quantity in cart item:', item);
//       }
//     }
//     return subtotal;
//   }

//   calculateTotal(): number {
//     return this.calculateSubtotal() + this.shippingCost;
//   }
// }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CartService } from '../cart.service';
// import { Router } from '@angular/router';
// import { CartItem } from '../cart.service'; // Import CartItem interface
// import { Subscription } from 'rxjs';
// import { CheckoutService } from '../checkout.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit, OnDestroy {

//   cartItems: CartItem[] = []; // Type as CartItem[]
//   shippingCost: number = 5.00;
//   checkoutError: string = '';
//   checkoutSuccess: boolean = false;
//   private cartSubscription?: Subscription; // Subscription for cart updates
//   paymentMethod: string = 'Cash on Delivery'; // Default, or get from user input
//   loadingCheckout: boolean = false; // To indicate checkout loading state

//   constructor(
//     private cartService: CartService,
//     private checkoutService: CheckoutService, // Inject CheckoutService
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.cartSubscription = this.cartService.getCartItems().subscribe(items => { // Store subscription
//       this.cartItems = items;
//       console.log('Cart Items updated in CartComponent:', this.cartItems);
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.cartSubscription) {
//       this.cartSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
//     }
//   }

//   clearCart(): void {
//     this.cartService.clearCart();
//     this.checkoutSuccess = false;
//     this.checkoutError = '';
//     alert('Cart cleared!');
//   }

//   proceedToCheckout(): void {
//     if (this.cartItems.length === 0) {
//       alert('Your cart is empty. Add items to checkout.');
//       return;
//     }

//     this.checkoutError = '';
//     this.checkoutSuccess = false;
//     this.loadingCheckout = true; // Start loading

//     const cartItemsForCheckout = this.cartItems.map(item => ({ // Prepare cart items in the format backend expects
//       book: {
//         product_id: item.book.product_id // Assuming your book model has product_id
//       },
//       quantity: item.quantity
//     }));

//     this.checkoutService.checkout(cartItemsForCheckout, this.paymentMethod)
//       .subscribe({
//         next: (response) => {
//           console.log('Checkout successful:', response);
//           this.checkoutSuccess = true;
//           this.checkoutError = '';
//           this.cartService.clearCart(); // Clear cart on successful checkout
//           this.loadingCheckout = false; // End loading
//           // Optionally navigate to order confirmation page or order history
//           // this.router.navigate(['/order-confirmation', response.orderId]);
//           alert(`Order placed successfully! Order ID: ${response.orderId}`); // Simple success feedback
//         },
//         error: (errorResponse) => {
//           console.error('Checkout failed:', errorResponse);
//           this.checkoutError = errorResponse.error?.message || 'Checkout failed. Please try again.'; // Get error message from backend response
//           this.checkoutSuccess = false;
//           this.loadingCheckout = false; // End loading
//         }
//       });
//   }

//   calculateSubtotal(): number {
//     let subtotal = 0;
//     for (const item of this.cartItems) {
//       const price = parseFloat(String(item.book.price));
//       const quantity = parseInt(String(item.quantity), 10);

//       if (!isNaN(price) && !isNaN(quantity)) {
//         subtotal += price * quantity;
//       } else {
//         console.warn('Invalid price or quantity in cart item:', item);
//       }
//     }
//     return subtotal;
//   }

//   calculateTotal(): number {
//     return this.calculateSubtotal() + this.shippingCost;
//   }
// }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CartService } from '../cart.service';
// import { Router } from '@angular/router';
// import { CartItem } from '../cart.service'; // Import CartItem interface
// import { Subscription } from 'rxjs'; // You can remove Subscription import as it's not used for cart updates now
// import { CheckoutService } from '../checkout.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit, OnDestroy {

//   cartItems: CartItem[] = [];
//   shippingCost: number = 5.00;
//   checkoutError: string = '';
//   checkoutSuccess: boolean = false;
//   private cartSubscription?: Subscription; // Keep Subscription for ngOnDestroy but it won't be used for cart updates
//   paymentMethod: string = 'Cash on Delivery';
//   loadingCheckout: boolean = false;

//   constructor(
//     private cartService: CartService,
//     private checkoutService: CheckoutService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCartItems(); // **Directly get cart items array**
//     console.log('Cart Items in CartComponent (Array):', this.cartItems);

//     // You can remove the subscription setup in ngOnInit now, as cart updates are not reactive in this approach.
//     // if (this.cartSubscription) { // No need for this subscription block anymore for cart updates
//     //   this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
//     //     this.cartItems = items;
//     //     console.log('Cart Items updated in CartComponent:', this.cartItems);
//     //   });
//     // }
//   }

//   ngOnDestroy(): void {
//     if (this.cartSubscription) { // Keep ngOnDestroy and unsubscribe in case you use cartSubscription for other purposes later
//       this.cartSubscription.unsubscribe();
//     }
//   }

//   clearCart(): void {
//     this.cartService.clearCart();
//     this.cartItems = this.cartService.getCartItems(); // **Update cartItems array after clearing**
//     this.checkoutSuccess = false;
//     this.checkoutError = '';
//     alert('Cart cleared!');
//   }

//   proceedToCheckout(): void {
//     if (this.cartItems.length === 0) {
//       alert('Your cart is empty. Add items to checkout.');
//       return;
//     }

//     this.checkoutError = '';
//     this.checkoutSuccess = false;
//     this.loadingCheckout = true;

//     const cartItemsForCheckout = this.cartItems.map(item => ({
//       book: {
//         product_id: item.book.product_id
//       },
//       quantity: item.quantity
//     }));

//     this.checkoutService.checkout(cartItemsForCheckout, this.paymentMethod)
//       .subscribe({
//         next: (response) => {
//           console.log('Checkout successful:', response);
//           this.checkoutSuccess = true;
//           this.checkoutError = '';
//           this.cartService.clearCart();
// //           this.cartItems = this.cartService.getCartItems(); // **Update cartItems array after checkout (clear)**
// //           this.loadingCheckout = false;
// //           alert(`Order placed successfully! Order ID: ${response.orderId}`);
// //         },
// //         error: (errorResponse) => {
// //           console.error('Checkout failed:', errorResponse);
// //           this.checkoutError = errorResponse.error?.message || 'Checkout failed. Please try again.';
// //           this.checkoutSuccess = false;
// //           this.loadingCheckout = false;
// //         }
// //       });
// //   }

// //   calculateSubtotal(): number {
// //     let subtotal = 0;
// //     for (const item of this.cartItems) {
// //       const price = parseFloat(String(item.book.price));
// //       const quantity = parseInt(String(item.quantity), 10);

// //       if (!isNaN(price) && !isNaN(quantity)) {
// //         subtotal += price * quantity;
// //       } else {
// //         console.warn('Invalid price or quantity in cart item:', item);
// //       }
// // //     }
// // //     return subtotal;
// // //   }

// // //   calculateTotal(): number {
// // //     return this.calculateSubtotal() + this.shippingCost;
// // //   }
// // // }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CartService, CartItem } from '../cart.service'; // Import CartItem
// import { BookService } from '../book.service'; // Import BookService
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { CheckoutService } from '../checkout.service';

// @Component({
//     selector: 'app-cart',
//     templateUrl: './cart.component.html',
//     styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit, OnDestroy {

//     cartItems: any[] = []; // Array to hold *full book details* for display
//     shippingCost: number = 5.00;
//     checkoutError: string = '';
//     checkoutSuccess: boolean = false;
//     private cartSubscription?: Subscription;
//     paymentMethod: string = 'Cash on Delivery';
//     loadingCheckout: boolean = false;
//     private cartProductIds: CartItem[] = []; // Array to hold product_ids and quantities from CartService

//     constructor(
//         private cartService: CartService,
//         private bookService: BookService, // Inject BookService
//         private checkoutService: CheckoutService,
//         private router: Router
//     ) { }

//     ngOnInit(): void {
//         this.cartProductIds = this.cartService.getCartItems(); // Get cart items (product_ids and quantities)

//         // Fetch full book details for each product_id in the cart
//         this.cartItems = []; // Initialize cartItems as empty array
//         this.cartProductIds.forEach(cartItem => {
//             this.bookService.get(cartItem.product_id).subscribe(book => {
//                 this.cartItems.push({ book: book, quantity: cartItem.quantity }); // Push full book details and quantity
//             });
//         });

//         console.log('Cart Product IDs from CartService:', this.cartProductIds);
//         console.log('Cart Items in CartComponent (with Full Book Details):', this.cartItems);
//     }

//     ngOnDestroy(): void {
//         if (this.cartSubscription) {
//             this.cartSubscription.unsubscribe();
//         }
//     }

//     clearCart(): void {
//         this.cartService.clearCart();
//         this.cartProductIds = this.cartService.getCartItems(); // Update cartProductIds after clearing
//         this.cartItems = []; // Clear cartItems array as well
//         this.checkoutSuccess = false;
//         this.checkoutError = '';
//         alert('Cart cleared!');
//     }

//     proceedToCheckout(): void {
//         if (this.cartItems.length === 0) {
//             alert('Your cart is empty. Add items to checkout.');
//             return;
//         }

//         this.checkoutError = '';
//         this.checkoutSuccess = false;
//         this.loadingCheckout = true;

//         // Use cartProductIds (array of { product_id, quantity }) for checkout
//         const cartItemsForCheckout = this.cartProductIds.map(item => ({
//             book: {
//                 product_id: item.product_id
//             },
//             quantity: item.quantity
//         }));

//         this.checkoutService.checkout(cartItemsForCheckout, this.paymentMethod)
//             .subscribe({
//                 next: (response) => {
//                     console.log('Checkout successful:', response);
//                     this.checkoutSuccess = true;
//                     this.checkoutError = '';
//                     this.cartService.clearCart();
//                     this.cartProductIds = this.cartService.getCartItems(); // Update cartProductIds after checkout
//                     this.cartItems = []; // Clear cartItems after checkout
//                     this.loadingCheckout = false;
//                     alert(`Order placed successfully! Order ID: ${response.orderId}`);
//                 },
//                 error: (errorResponse) => {
//                     console.error('Checkout failed:', errorResponse);
//                     this.checkoutError = errorResponse.error?.message || 'Checkout failed. Please try again.';
//                     this.checkoutSuccess = false;
//                     this.loadingCheckout = false;
//                 }
//             });
//     }

//     calculateSubtotal(): number {
//         let subtotal = 0;
//         for (const item of this.cartItems) { // Iterate over cartItems (array of full book details)
//             const price = parseFloat(String(item.book.price));
//             const quantity = parseInt(String(item.quantity), 10);

//             if (!isNaN(price) && !isNaN(quantity)) {
//                 subtotal += price * quantity;
//             } else {
//                 console.warn('Invalid price or quantity in cart item:', item);
//             }
//         }
//         return subtotal;
//     }

//     calculateTotal(): number {
//         return this.calculateSubtotal() + this.shippingCost;
//     }
// }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CartService, CartItem } from '../cart.service';
// import { BookService } from '../book.service';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { CheckoutService } from '../checkout.service'; // Import CheckoutService

// @Component({
//     selector: 'app-cart',
//     templateUrl: './cart.component.html',
//     styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit, OnDestroy {

//     cartItems: any[] = []; // Array to hold *full book details* for display
//     shippingCost: number = 5.00;
//     checkoutError: string = '';
//     checkoutSuccess: boolean = false;
//     private cartSubscription?: Subscription;
//     paymentMethod: string = 'Cash on Delivery';
//     loadingCheckout: boolean = false;
//     private cartProductIds: CartItem[] = [];

//     constructor(
//         private cartService: CartService,
//         private bookService: BookService,
//         private checkoutService: CheckoutService, // Inject CheckoutService
//         private router: Router
//     ) { }

//     ngOnInit(): void {
//         this.cartProductIds = this.cartService.getCartItems();

//         this.cartItems = [];
//         this.cartProductIds.forEach(cartItem => {
//             this.bookService.get(cartItem.product_id).subscribe(book => {
//                 this.cartItems.push({ book: book, quantity: cartItem.quantity });
//             });
//         });

//         console.log('Cart Product IDs from CartService:', this.cartProductIds);
//         console.log('Cart Items in CartComponent (with Full Book Details):', this.cartItems);
//     }

//     ngOnDestroy(): void {
//         if (this.cartSubscription) {
//             this.cartSubscription.unsubscribe();
//         }
//     }

//     clearCart(): void {
//         this.cartService.clearCart();
//         this.cartProductIds = this.cartService.getCartItems();
//         this.cartItems = [];
//         this.checkoutSuccess = false;
//         this.checkoutError = '';
//         alert('Cart cleared!');
//     }

//     proceedToCheckout(): void {
//         if (this.cartItems.length === 0) {
//             alert('Your cart is empty. Add items to checkout.');
//             return;
//         }

//         this.checkoutError = '';
//         this.checkoutSuccess = false;
//         this.loadingCheckout = true;

//         const cartItemsForCheckout = this.cartProductIds.map(item => ({
//             product_id: item.product_id,
//             quantity: item.quantity
//         }));

//         // Use CheckoutService to call backend checkout API
//         this.checkoutService.checkout(cartItemsForCheckout, this.paymentMethod)
//             .subscribe({
//                 next: (response) => {
//                     console.log('Checkout successful:', response);
//                     this.checkoutSuccess = true;
//                     this.checkoutError = '';
//                     this.cartService.clearCart();
//                     this.cartProductIds = this.cartService.getCartItems();
//                     this.cartItems = [];
//                     this.loadingCheckout = false;
//                     alert(`Order placed successfully! Order ID: ${response.orderId}`);
//                     // Optionally, redirect to order confirmation page using this.router.navigate(['/order-confirmation', response.orderId]);
//                 },
//                 error: (errorResponse) => {
//                     console.error('Checkout failed:', errorResponse);
//                     this.checkoutError = errorResponse.error?.message || 'Checkout failed. Please try again.';
//                     this.checkoutSuccess = false;
//                     this.loadingCheckout = false;
//                 }
//             });
//     }

//     calculateSubtotal(): number {
//         let subtotal = 0;
//         for (const item of this.cartItems) {
//             const price = parseFloat(String(item.book.price));
//             const quantity = parseInt(String(item.quantity), 10);

//             if (!isNaN(price) && !isNaN(quantity)) {
//                 subtotal += price * quantity;
//             } else {
//                 console.warn('Invalid price or quantity in cart item:', item);
//             }
//         }
//         return subtotal;
//     }

//     calculateTotal(): number {
//         return this.calculateSubtotal() + this.shippingCost;
//     }
// }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CartService, CartItem } from '../cart.service';
// import { BookService } from '../book.service';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { CheckoutService } from '../checkout.service'; // Import CheckoutService

// @Component({
//     selector: 'app-cart',
//     templateUrl: './cart.component.html',
//     styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit, OnDestroy {

  
//     cartItems: any[] = []; // Array to hold *full book details* for display
//     shippingCost: number = 5.00;
//     checkoutError: string = '';
//     checkoutSuccess: boolean = false;
//     private cartSubscription?: Subscription;
//     paymentMethod: string = 'Cash on Delivery';
//     loadingCheckout: boolean = false;
//     private cartProductIds: CartItem[] = [];

//     constructor(
//         private cartService: CartService,
//         private bookService: BookService,
//         private checkoutService: CheckoutService, // Inject CheckoutService
//         private router: Router
//     ) { }

//     ngOnInit(): void {
//         this.loadCartDetails();
//     }

//     ngOnDestroy(): void {
//         if (this.cartSubscription) {
//             this.cartSubscription.unsubscribe();
//         }
//     }

//     private loadCartDetails(): void {
//         this.cartProductIds = this.cartService.getCartItems();

//         this.cartItems = [];
//         if (this.cartProductIds && this.cartProductIds.length > 0) { // Check if cartProductIds is valid and not empty
//             this.cartProductIds.forEach(cartItem => {
//                 this.bookService.get(cartItem.product_id).subscribe(book => {
//                     this.cartItems.push({ book: book, quantity: cartItem.quantity });
//                 });
//             });
//         } else {
//             console.log('Cart is empty.');
//         }

//         console.log('Cart Product IDs from CartService:', this.cartProductIds);
//         console.log('Cart Items in CartComponent (with Full Book Details):', this.cartItems);
//     }


//     clearCart(): void {
//         this.cartService.clearCart();
//         this.cartProductIds = this.cartService.getCartItems();
//         this.cartItems = [];
//         this.checkoutSuccess = false;
//         this.checkoutError = '';
//         this.loadCartDetails(); // Reload cart details to update the view
//         alert('Cart cleared!');
//     }

//     proceedToCheckout(): void {
//         if (this.cartItems.length === 0) {
//             alert('Your cart is empty. Add items to checkout.');
//             return;
//         }

//         this.checkoutError = '';
//         this.checkoutSuccess = false;
//         this.loadingCheckout = true;

//         // const cartItemsForCheckout = this.cartProductIds.map(item => ({
//         //     product_id: item.product_id,
//         //     quantity: item.quantity
//         // }));
//         const cartItemsForCheckout = this.cartItems.map(item => ({
//           book: item.book, // **ADD THIS LINE: Include the entire 'book' object**
//           quantity: item.quantity
//       }));
//         // // Use CheckoutService to call backend checkout API
//         // this.checkoutService.checkout(cartItemsForCheckout, this.paymentMethod)
//         //     .subscribe({
//         //         next: (response) => {
//         //             console.log('Checkout successful:', response);
//         //             this.checkoutSuccess = true;
//         //             this.checkoutError = '';
//         //             this.cartService.clearCart();
//         //             this.cartProductIds = this.cartService.getCartItems();
//         //             this.cartItems = [];
//         //             this.loadingCheckout = false;
//         //             this.loadCartDetails(); // Reload cart details to update the view
//         //             alert(`Order placed successfully! Order ID: ${response.orderId}`);
//         //             // Optionally, redirect to order confirmation page using this.router.navigate(['/order-confirmation', response.orderId]);
//         //         },
//         //         error: (errorResponse) => {
//         //             console.error('Checkout failed:', errorResponse);
//         //             this.checkoutError = errorResponse.error?.message || 'Checkout failed. Please try again.';
//         //             this.checkoutSuccess = false;
//         //             this.loadingCheckout = false;
//         //         }
//         //     });
        
        
//           this.loadingCheckout = true;
//           this.checkoutService.checkout(cartItemsForCheckout, this.paymentMethod)
//             .subscribe({
//               next: (response) => {
//                 console.log('Checkout successful:', response);
//                 this.checkoutSuccess = true;
//                 this.checkoutError = '';
//                 this.cartService.clearCart();
//                 this.cartProductIds = this.cartService.getCartItems();
//                 this.cartItems = [];
//                 this.loadingCheckout = false;
//                 this.loadCartDetails(); // Reload cart details to update the view
        
//                 // Navigate to OrderConfirmationComponent with orderId
//                // this.router.navigate(['/order-details/:orderId', response.orderId]); // <-- Navigation here!
        
//               },
//               error: (errorResponse) => {
//                 console.error('Checkout failed:', errorResponse);
//                 this.checkoutError = errorResponse.error?.message || 'Checkout failed. Please try again.';
//                 this.checkoutSuccess = false;
//                 this.loadingCheckout = false;
//               }
//             });
//         }
    

//     calculateSubtotal(): number {
//         let subtotal = 0;
//         for (const item of this.cartItems) {
//             const price = parseFloat(String(item.book.price));
//             const quantity = parseInt(String(item.quantity), 10);

//             if (!isNaN(price) && !isNaN(quantity)) {
//                 subtotal += price * quantity;
//             } else {
//                 console.warn('Invalid price or quantity in cart item:', item);
//             }
//         }
//         return subtotal;
//     }

//     calculateTotal(): number {
//         return this.calculateSubtotal() + this.shippingCost;
//     }
// }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CartService } from '../cart.service'; // Adjust path if needed
// import { Book } from '../book.model'; // Adjust path if needed
// import { Subscription } from 'rxjs';
// import { Router } from '@angular/router';

// interface CartItemDisplay {
//     book: Book;
//     quantity: number;
// }

// @Component({
//     selector: 'app-cart',
//     templateUrl: './cart.component.html',
//     styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit, OnDestroy {
//     cartItems: CartItemDisplay[] = [];
//     shippingCost: number = 5.00; // Example shipping cost
//     paymentMethod: string = 'Cash on Delivery'; // Default payment method
//     checkoutError: string | null = null;
//     checkoutSuccess: boolean = false;
//     loadingCheckout: boolean = false;

//     private cartSubscription?: Subscription;

//     constructor(private cartService: CartService, private router: Router) { }

//     ngOnInit(): void {
//         this.loadCartItems();
//     }

//     ngOnDestroy(): void {
//         if (this.cartSubscription) {
//             this.cartSubscription.unsubscribe();
//         }
//     }

//     loadCartItems(): void {
//         this.cartSubscription = this.cartService.getCartItemsWithBookDetails().subscribe({
//             next: (cartItemsWithDetails) => {
//                 this.cartItems = cartItemsWithDetails.map(item => ({
//                     book: item.book,
//                     quantity: item.quantity
//                 }));
//                 console.log('Cart Items in CartComponent (with Full Book Details):', this.cartItems); // Debug log

//                 // Debug: Check if book_condition is present in the first cart item (if cart is not empty)
//                 if (this.cartItems.length > 0 && this.cartItems[0].book) {
//                     console.log('First Cart Item Book Condition:', this.cartItems[0].book.book_condition); // Debug log
//                 }
//             },
//             error: (error) => {
//                 console.error('Error loading cart items:', error);
//                 // Handle error appropriately (e.g., display error message to user)
//             }
//         });
//     }

//     calculateSubtotal(): number {
//         return this.cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);
//     }

//     calculateTotal(): number {
//         return this.calculateSubtotal() + this.shippingCost;
//     }

//     clearCart(): void {
//         this.cartService.clearCart().subscribe({
//             next: () => {
//                 this.cartItems = []; // Clear cart in component
//                 this.cartService.resetCartInService(); // Clear cart in service state
//                 this.checkoutSuccess = false;
//                 this.checkoutError = null;
//                 console.log('Cart cleared successfully');
//             },
//             error: (error) => {
//                 console.error('Error clearing cart:', error);
//                 // Handle error (e.g., display error message to user)
//             }
//         });
//     }


//     proceedToCheckout(): void {
//         if (this.cartItems.length === 0) {
//             this.checkoutError = 'Your cart is empty. Please add items to checkout.';
//             return;
//         }

//         this.checkoutError = null;
//         this.checkoutSuccess = false;
//         this.loadingCheckout = true;

//         const orderDetails = {
//             cartItems: this.cartItems.map(item => ({ book_id: item.book.book_id, quantity: item.quantity })),
//             totalAmount: this.calculateTotal(),
//             paymentMethod: this.paymentMethod
//         };


//         this.cartService.checkoutCart(orderDetails).subscribe({
//             next: (response) => {
//                 this.loadingCheckout = false;
//                 this.checkoutSuccess = true;
//                 this.cartItems = []; // Clear cart after successful checkout
//                 this.cartService.resetCartInService(); // Clear cart in service state
//                 console.log('Checkout successful:', response);
//                 // Optionally redirect to order confirmation page
//                 // this.router.navigate(['/order-confirmation', response.orderId]);
//             },
//             error: (error) => {
//                 this.loadingCheckout = false;
//                 this.checkoutError = 'Checkout failed. Please try again later.';
//                 console.error('Checkout error:', error);
//                 // Handle checkout error (display error message)
//             }
//         });
//     }
// }
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CartService, CartItem } from '../cart.service';
// import { BookService } from '../book.service';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { CheckoutService } from '../checkout.service'; // Import CheckoutService

// @Component({
//     selector: 'app-cart',
//     templateUrl: './cart.component.html',
//     styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit, OnDestroy {

//     cartItems: any[] = []; // Array to hold *full book details* for display
//     shippingCost: number = 5.00;
//     checkoutError: string = '';
//     checkoutSuccess: boolean = false;
//     private cartSubscription?: Subscription;
//     paymentMethod: string = 'Cash on Delivery';
//     loadingCheckout: boolean = false;
//     private cartProductIds: CartItem[] = [];

//     constructor(
//         private cartService: CartService,
//         private bookService: BookService,
//         private checkoutService: CheckoutService, // Inject CheckoutService
//         private router: Router
//     ) { }

//     ngOnInit(): void {
//         this.loadCartDetails();
//     }

//     ngOnDestroy(): void {
//         if (this.cartSubscription) {
//             this.cartSubscription.unsubscribe();
//         }
//     }

//     private loadCartDetails(): void {
//         this.cartProductIds = this.cartService.getCartItems();

//         this.cartItems = [];
//         if (this.cartProductIds && this.cartProductIds.length > 0) { // Check if cartProductIds is valid and not empty
//             this.cartProductIds.forEach(cartItem => {
//                 this.bookService.get(cartItem.product_id).subscribe(book => {
//                     this.cartItems.push({ book: book, quantity: cartItem.quantity });
//                 });
//             });
//         } else {
//             console.log('Cart is empty.');
//         }

//         console.log('Cart Product IDs from CartService:', this.cartProductIds);
//         console.log('Cart Items in CartComponent (with Full Book Details):', this.cartItems);
//     }


//     clearCart(): void {
//         this.cartService.clearCart();
//         this.cartProductIds = this.cartService.getCartItems();
//         this.cartItems = [];
//         this.checkoutSuccess = false;
//         this.checkoutError = '';
//         this.loadCartDetails(); // Reload cart details to update the view
//         alert('Cart cleared!');
//     }

//     proceedToCheckout(): void {
//         if (this.cartItems.length === 0) {
//             alert('Your cart is empty. Add items to checkout.');
//             return;
//         }

//         this.checkoutError = '';
//         this.checkoutSuccess = false;
//         this.loadingCheckout = true;

//         const cartItemsForCheckout = this.cartItems.map(item => ({
//             book: item.book, // **Include the entire 'book' object**
//             quantity: item.quantity
//         }));

//         this.loadingCheckout = true;
//         this.checkoutService.checkout(cartItemsForCheckout, this.paymentMethod)
//             .subscribe({
//                 next: (response) => {
//                     console.log('Checkout successful:', response);
//                     this.checkoutSuccess = true;
//                     this.checkoutError = '';
//                     this.cartService.clearCart();
//                     this.cartProductIds = this.cartService.getCartItems();
//                     this.cartItems = [];
//                     this.loadingCheckout = false;
//                     this.loadCartDetails(); // Reload cart details to update the view

//                     // Navigate to OrderConfirmationComponent with orderId
//                 // this.router.navigate(['/order-details/:orderId', response.orderId]); // <-- Navigation here!
//                 this.router.navigate(['/order-confirmation', response.orderId]);
//                 },
//                 error: (errorResponse) => {
//                     console.error('Checkout failed:', errorResponse);
//                     this.checkoutError = errorResponse.error?.message || 'Checkout failed. Please try again.';
//                     this.checkoutSuccess = false;
//                     this.loadingCheckout = false;
//                 }
//             });
//     }


//     calculateSubtotal(): number {
//         let subtotal = 0;
//         for (const item of this.cartItems) {
//             const price = parseFloat(String(item.book.price));
//             const quantity = parseInt(String(item.quantity), 10);

//             if (!isNaN(price) && !isNaN(quantity)) {
//                 subtotal += price * quantity;
//             } else {
//                 console.warn('Invalid price or quantity in cart item:', item);
//             }
//         }
//         return subtotal;
//     }

//     calculateTotal(): number {
//         return this.calculateSubtotal() + this.shippingCost;
//     }

//     incrementQuantity(item: any): void {
//         const currentQuantity = item.quantity;
//         const stockQuantity = item.book.quantity_in_stock; // Use quantity_in_stock
//         if (currentQuantity < stockQuantity) {
//             item.quantity++;
//             this.cartService.updateCart(this.cartService.getCartItems()); // Update cart service
//         } else {
//             alert(`Maximum stock reached for ${item.book.title}. Only ${stockQuantity} available.`);
//         }
//     }

//     decrementQuantity(item: any): void {
//         if (item.quantity > 1) {
//             item.quantity--;
//             this.cartService.updateCart(this.cartService.getCartItems()); // Update cart service
//         } else if (item.quantity === 1) {
//             this.removeItem(item); // If quantity is 1, decrementing removes the item
//         }
//     }

//     removeItem(item: any): void {
//         this.cartService.removeItem(item.book.product_id);
//         this.loadCartDetails(); // Reload cart after removal
//         alert(`${item.book.title} removed from cart.`);
//     }
// }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CheckoutService } from '../checkout.service'; // Import CheckoutService

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

    cartItems: any[] = []; // Array to hold *full book details* for display
    shippingCost: number = 5.00;
    checkoutError: string = '';
    checkoutSuccess: boolean = false;
    private cartSubscription?: Subscription;
    paymentMethod: string = 'Cash on Delivery';
    loadingCheckout: boolean = false;
    private cartProductIds: CartItem[] = [];
    shippingCity: string = ''; // **NEW: Property to hold shipping city**

    constructor(
        private cartService: CartService,
        private bookService: BookService,
        private checkoutService: CheckoutService, // Inject CheckoutService
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadCartDetails();
    }

    ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }

    private loadCartDetails(): void {
        this.cartProductIds = this.cartService.getCartItems();

        this.cartItems = [];
        if (this.cartProductIds && this.cartProductIds.length > 0) { // Check if cartProductIds is valid and not empty
            this.cartProductIds.forEach(cartItem => {
                this.bookService.get(cartItem.product_id).subscribe(book => {
                    this.cartItems.push({ book: book, quantity: cartItem.quantity });
                });
            });
        } else {
            console.log('Cart is empty.');
        }

        console.log('Cart Product IDs from CartService:', this.cartProductIds);
        console.log('Cart Items in CartComponent (with Full Book Details):', this.cartItems);
    }


    clearCart(): void {
        this.cartService.clearCart();
        this.cartProductIds = this.cartService.getCartItems();
        this.cartItems = [];
        this.checkoutSuccess = false;
        this.checkoutError = '';
        this.loadCartDetails(); // Reload cart details to update the view
        alert('Cart cleared!');
    }

    proceedToCheckout(): void {
        if (this.cartItems.length === 0) {
            alert('Your cart is empty. Add items to checkout.');
            return;
        }
        if (!this.shippingCity) { // **NEW: Validate shippingCity is entered**
            this.checkoutError = 'Please enter your shipping city.';
            return;
        }

        this.checkoutError = '';
        this.checkoutSuccess = false;
        this.loadingCheckout = true;

        const cartItemsForCheckout = this.cartItems.map(item => ({
            book: item.book, // **Include the entire 'book' object**
            quantity: item.quantity
        }));

        this.loadingCheckout = true;
        this.checkoutService.checkout(cartItemsForCheckout, this.paymentMethod, this.shippingCity) // **NEW: Pass shippingCity to checkout service**
            .subscribe({
                next: (response) => {
                    console.log('Checkout successful:', response);
                    this.checkoutSuccess = true;
                    this.checkoutError = '';
                    this.cartService.clearCart();
                    this.cartProductIds = this.cartService.getCartItems();
                    this.cartItems = [];
                    this.loadingCheckout = false;
                    this.loadCartDetails(); // Reload cart details to update the view

                    this.router.navigate(['/order-confirmation', response.orderId]);
                },
                error: (errorResponse) => {
                    console.error('Checkout failed:', errorResponse);
                    this.checkoutError = errorResponse.error?.message || 'Checkout failed. Please try again.';
                    this.checkoutSuccess = false;
                    this.loadingCheckout = false;
                }
            });
    }


    calculateSubtotal(): number {
        let subtotal = 0;
        for (const item of this.cartItems) {
            const price = parseFloat(String(item.book.price));
            const quantity = parseInt(String(item.quantity), 10);

            if (!isNaN(price) && !isNaN(quantity)) {
                subtotal += price * quantity;
            } else {
                console.warn('Invalid price or quantity in cart item:', item);
            }
        }
        return subtotal;
    }

    calculateTotal(): number {
        return this.calculateSubtotal() + this.shippingCost;
    }

    incrementQuantity(item: any): void {
        const currentQuantity = item.quantity;
        const stockQuantity = item.book.quantity_in_stock; // Use quantity_in_stock
        if (currentQuantity < stockQuantity) {
            item.quantity++;
            this.cartService.updateCart(this.cartService.getCartItems()); // Update cart service
        } else {
            alert(`Maximum stock reached for ${item.book.title}. Only ${stockQuantity} available.`);
        }
    }

    decrementQuantity(item: any): void {
        if (item.quantity > 1) {
            item.quantity--;
            this.cartService.updateCart(this.cartService.getCartItems()); // Update cart service
        } else if (item.quantity === 1) {
            this.removeItem(item); // If quantity is 1, decrementing removes the item
        }
    }

    removeItem(item: any): void {
        this.cartService.removeItem(item.book.product_id);
        this.loadCartDetails(); // Reload cart after removal
        alert(`${item.book.title} removed from cart.`);
    }
}