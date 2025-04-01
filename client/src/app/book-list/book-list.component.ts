import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: any[] = [];
    // cartQuantities: { [productId: number]: number } = {}; // REMOVED - Not needed with new approach

    constructor(
        private bookService: BookService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.retrieveBooks();
    }

    retrieveBooks(): void {
        this.bookService.getAll().subscribe({
            next: (data: any) => {
                this.books = data
                    .map(book => {
                        return {
                            ...book,
                            isSold: book.quantity_in_stock <= 0 // isSold based on quantity_in_stock
                        };
                    });
                console.log('All books fetched (including sold status based on quantity_in_stock):', this.books);
                this.books.forEach(book => {
                    if (book.image_url) {
                        book.image_url = this.bookService.getImageUrl(book.image_url);
                    }
                    // this.cartQuantities[book.product_id] = 0; // REMOVED - Not needed
                });
            },
            error: (error: any) => {
                console.error('Error fetching books:', error);
            }
        });
    }


    addToCart(book: any): void {
        this.bookService.get(book.product_id).subscribe({ // Fetch product details using bookService.get (your service)
            next: (productDetails: any) => {
                const stockQuantity = productDetails.quantity_in_stock;
                const cartItem = this.cartService.getCartItems().find(item => item.product_id === book.product_id);
                const currentCartQuantity = cartItem ? cartItem.quantity : 0;
                const newQuantity = currentCartQuantity + 1;
                const quantityAddedInClick = 1; // Quantity added in this click

                if (newQuantity <= stockQuantity) {
                    if (cartItem) {
                        cartItem.quantity = newQuantity;
                        this.cartService.updateCart(this.cartService.getCartItems());
                    } else {
                        this.cartService.addToCart(book, 1); // **CORRECTED: Using addToCart, quantity 1**
                    }
                    alert(`Added ${quantityAddedInClick} ${book.title} to cart!`); // Dynamic alert message
                } else {
                    alert(`Maximum stock reached for ${book.title}. Only ${stockQuantity} available in stock. You already have ${currentCartQuantity} in your cart.`);
                }
            },
            error: (error: any) => {
                console.error('Error fetching product details:', error);
                alert('Could not add to cart. Please try again.');
            }
        });
    }
}


// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({
//     selector: 'app-book-list',
//     templateUrl: './book-list.component.html',
//     styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent implements OnInit {
//     books: any[] = [];
//     // cartQuantities: { [productId: number]: number } = {}; // REMOVED - Not needed with new approach

//     constructor(
//         private bookService: BookService,
//         private cartService: CartService
//     ) { }

//     ngOnInit(): void {
//         this.retrieveBooks();
//     }

//     retrieveBooks(): void {
//         this.bookService.getAll().subscribe({
//             next: (data: any) => {
//                 this.books = data
//                     .map(book => {
//                         return {
//                             ...book,
//                             isSold: book.quantity_in_stock <= 0 // isSold based on quantity_in_stock
//                         };
//                     });
//                 console.log('All books fetched (including sold status based on quantity_in_stock):', this.books);
//                 this.books.forEach(book => {
//                     if (book.image_url) {
//                         book.image_url = this.bookService.getImageUrl(book.image_url);
//                     }
//                     // this.cartQuantities[book.product_id] = 0; // REMOVED - Not needed
//                 });
//             },
//             error: (error: any) => {
//                 console.error('Error fetching books:', error);
//             }
//         });
//     }

//     // increaseQuantity(book: any): void { // REMOVED - Quantity control now handled in addToCart
//     //     if (this.cartQuantities[book.product_id] < book.quantity) { // Check against available quantity
//     //         this.cartQuantities[book.product_id]++;
//     //     } else {
//     //         alert(`Maximum available quantity for ${book.title} reached.`);
//     //     }
//     // }

//     // decreaseQuantity(book: any): void { // REMOVED - Quantity control now handled in addToCart
//     //     if (this.cartQuantities[book.product_id] > 0) {
//     //         this.cartQuantities[book.product_id]--;
//     //     }
//     // }

//     addToCart(book: any): void {
//         this.bookService.get(book.product_id).subscribe({ // Fetch product details using bookService.get (your service)
//             next: (productDetails: any) => {
//                 const stockQuantity = productDetails.quantity_in_stock;
//                 const cartItem = this.cartService.getCartItems().find(item => item.book.product_id === book.product_id);
//                 const currentCartQuantity = cartItem ? cartItem.quantity : 0;
//                 const newQuantity = currentCartQuantity + 1;
//                 const quantityAddedInClick = 1; // Quantity added in this click

//                 if (newQuantity <= stockQuantity) {
//                     if (cartItem) {
//                         cartItem.quantity = newQuantity;
//                         this.cartService.updateCart(this.cartService.getCartItems());
//                     } else {
//                         this.cartService.addItem({ book: book, quantity: 1 });
//                     }
//                     alert(`Added ${quantityAddedInClick} ${book.title} to cart!`); // Dynamic alert message
//                 } else {
//                     alert(`Maximum stock reached for ${book.title}. Only ${stockQuantity} available in stock. You already have ${currentCartQuantity} in your cart.`);
//                 }
//             },
//             error: (error: any) => {
//                 console.error('Error fetching product details:', error);
//                 alert('Could not add to cart. Please try again.');
//             }
//         });
//     }
// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent implements OnInit {
//   books: any[] = [];

//   constructor(private http: HttpClient, private cartService: CartService) { }

//   ngOnInit(): void {
//     this.fetchBooks();
//   }

//   fetchBooks(): void {
//     this.http.get<any[]>('/api/products').subscribe(
//       (data) => {
//         this.books = data;
//       },
//       (error) => {
//         console.error('Error fetching books:', error);
//       }
//     );
//   }
// // ... inside your booklist.component.ts or bookdetails.component.ts ...

// addToCart(book: any): void {
//   this.http.get<any>(`/api/products/${book.product_id}`).subscribe({ // Fetch product details FIRST
//       next: (productDetails) => {
//           const stockQuantity = productDetails.quantity_in_stock;
//           const cartItem = this.cartService.getCartItems().find(item => item.book.product_id === book.product_id); // Check if item is already in cart
//           const currentCartQuantity = cartItem ? cartItem.quantity : 0; // Get current quantity in cart, default to 0 if not in cart
//           const newQuantity = currentCartQuantity + 1; // Calculate new quantity if we add one more
//           const quantityAddedInClick = 1; // **Quantity added in this click is always 1**

//           if (newQuantity <= stockQuantity) { // **Check if new quantity is within stock**
//               if (cartItem) {
//                   // Item already in cart, increment quantity
//                   cartItem.quantity = newQuantity;
//                   this.cartService.updateCart(this.cartService.getCartItems()); // Update cart with incremented quantity
//               } else {
//                   // Item not in cart, add it with quantity 1
//                   this.cartService.addItem({ book: book, quantity: 1 });
//               }
//               alert(`Added ${quantityAddedInClick} ${book.title} to cart!`); // **Dynamic Alert Message with quantity**
//           } else {
//               alert(`Maximum stock reached for ${book.title}. Only ${stockQuantity} available in stock. You already have ${currentCartQuantity} in your cart.`); // Inform user about stock limit
//           }
//       },
//       error: (error) => {
//           console.error('Error fetching product details:', error);
//           alert('Could not add to cart. Please try again.'); // Handle error
//       }
//   });
// }
  // addToCart(book: any): void {
  //   this.http.get<any>(`/api/products/${book.product_id}`).subscribe({ // Fetch product details FIRST
  //       next: (productDetails) => {
  //           const stockQuantity = productDetails.quantity_in_stock;
  //           const cartItem = this.cartService.getCartItems().find(item => item.book.product_id === book.product_id); // Check if item is already in cart
  //           const currentCartQuantity = cartItem ? cartItem.quantity : 0; // Get current quantity in cart, default to 0 if not in cart
  //           const newQuantity = currentCartQuantity + 1; // Calculate new quantity if we add one more

  //           if (newQuantity <= stockQuantity) { // **Check if new quantity is within stock**
  //               if (cartItem) {
  //                   // Item already in cart, increment quantity
  //                   cartItem.quantity = newQuantity;
  //                   this.cartService.updateCart(this.cartService.getCartItems()); // Update cart with incremented quantity
  //               } else {
  //                   // Item not in cart, add it with quantity 1
  //                   this.cartService.addItem({ book: book, quantity: 1 });
  //               }
  //               alert(`Added 1 ${book.title} to cart!`); // **Updated Alert Message - Quantity is now mentioned**
  //           } else {
  //               alert(`Maximum stock reached for ${book.title}. Only ${stockQuantity} available in stock. You already have ${currentCartQuantity} in your cart.`); // Inform user about stock limit
  //           }
  //       },
  //       error: (error) => {
  //           console.error('Error fetching product details:', error);
  //           alert('Could not add to cart. Please try again.'); // Handle error
  //       }
  //   });
  // }


// // client/src/app/book-list/book-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent implements OnInit {
//   books: any[] = [];
//   cartQuantities: { [productId: number]: number } = {}; // Track quantities in cart for each book

//   constructor(
//     private bookService: BookService,
//     private cartService: CartService
//   ) { }

//   ngOnInit(): void {
//     this.retrieveBooks();
//   }

//   retrieveBooks(): void {
//     this.bookService.getAll().subscribe({
//       next: (data: any) => {
//         this.books = data
//           .map(book => {
//             return {
//               ...book,
//               isSold: book.quantity <= 0 // isSold based on quantity
//             };
//           });
//         console.log('All books fetched (including sold):', this.books);
//         this.books.forEach(book => {
//           if (book.image_url) {
//             book.image_url = this.bookService.getImageUrl(book.image_url);
//           }
//           this.cartQuantities[book.product_id] = 0; // Initialize cart quantity for each book
//         });
//       },
//       error: (error: any) => {
//         console.error('Error fetching books:', error);
//       }
//     });
//   }

//   increaseQuantity(book: any): void {
//     if (this.cartQuantities[book.product_id] < book.quantity) { // Check against available quantity
//       this.cartQuantities[book.product_id]++;
//     } else {
//       alert(`Maximum available quantity for ${book.title} reached.`);
//     }
//   }

//   decreaseQuantity(book: any): void {
//     if (this.cartQuantities[book.product_id] > 0) {
//       this.cartQuantities[book.product_id]--;
//     }
//   }

//   addToCart(book: any): void {
//     if (book.quantity <= 0) {
//       alert(`${book.title} is Sold and cannot be added to cart.`);
//       return;
//     }

//     if (this.cartQuantities[book.product_id] > 0) {
//       const quantityToAdd = this.cartQuantities[book.product_id];
//       if (quantityToAdd <= book.quantity) {
//         this.cartService.addToCart(book, quantityToAdd); // Pass quantity to cart service
//         alert(`${quantityToAdd} ${book.title}(s) added to cart!`);
//         this.cartQuantities[book.product_id] = 0; // Reset quantity control after adding to cart
//       } else {
//         alert(`Not enough stock available for ${book.title}. Only ${book.quantity} available.`);
//       }
//     } else {
//       // If quantity control is 0 and Add to cart button clicked (initial click) - set quantity to 1 and show controls
//       this.cartQuantities[book.product_id] = 1;
//     }
//   }
// }

// // client/src/app/book-list/book-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent implements OnInit {
//   books: any[] = [];

//   constructor(
//     private bookService: BookService,
//     private cartService: CartService
//   ) { }

//   ngOnInit(): void {
//     this.retrieveBooks();
//   }

//   retrieveBooks(): void {
//     this.bookService.getAll().subscribe({
//       next: (data: any) => {
//         // **REMOVED FILTERING - NOW SHOWING ALL BOOKS (Available and Sold)**
//         this.books = data
//           // **FILTER LINE REMOVED:** .filter(book => book.is_available === true)
//           .map(book => {       // Map to add isSold property to each book
//             return {
//               ...book,          // Keep all existing book properties
//               isSold: !book.is_available // Add isSold property based on is_available
//             };
//           });

//         console.log('All books fetched (including sold):', this.books); // Updated console log
//         this.books.forEach(book => {
//           if (book.image_url) {
//             book.image_url = this.bookService.getImageUrl(book.image_url);
//           }
//         });
//       },
//       error: (error: any) => {
//         console.error('Error fetching books:', error);
//       }
//     });
//   }

//   addToCart(book: any): void {
//     if (!book.isSold) { // Check book.isSold before adding to cart
//       this.cartService.addToCart(book);
//       alert(`${book.title} added to cart!`);
//     } else {
//       alert(`${book.title} is Sold and cannot be added to cart.`); // Inform user if book is sold
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';
// import { Book } from './book-list.component'; // Import Book interface if defined here

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent implements OnInit {
//   books: Book[] | any[] = []; // Type as Book[] or 'any[]'

//   constructor(
//     private bookService: BookService,
//     private cartService: CartService
//   ) { }

//   ngOnInit(): void {
//     this.retrieveBooks();
//   }

//   retrieveBooks(): void {
//     this.bookService.getAll().subscribe({
//       next: (data: Book[] | any[]) => { // Type data as Book[] or 'any[]'
//         this.books = data;
//         console.log('Books fetched:', data); // More descriptive log
//         this.books.forEach(book => {
//           if (book.image_url) {
//             book.image_url = this.bookService.getImageUrl(book.image_url);
//           }
//         });
//       },
//       error: (error: any) => {
//         console.error('Error fetching books:', error);
//       }
//     });
//   }

//   addToCart(bookToAdd: Book | any): void { // Type book parameter
//     if (bookToAdd) { // Check if book is valid
//       this.cartService.addToCart(bookToAdd);
//       alert(`${bookToAdd.title} added to cart!`); // Use optional chaining if needed: bookToAdd?.title
//     } else {
//       console.warn('Book object is null or undefined, cannot add to cart.');
//     }
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';
// import { Book } from '../model/book.model'; // Correct import for Book model

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent implements OnInit {
//   books: Book[] | any[] = []; // Type as Book[] or 'any[]'

//   constructor(
//     private bookService: BookService,
//     private cartService: CartService
//   ) { }

//   ngOnInit(): void {
//     this.retrieveBooks();
//   }

//   retrieveBooks(): void {
//     this.bookService.getAll().subscribe({
//       next: (data: Book[] | any[]) => { // Type data as Book[] or 'any[]'
//         this.books = data;
//         console.log('Books fetched:', data);
//         this.books.forEach(book => {
//           if (book.image_url) {
//             book.image_url = this.bookService.getImageUrl(book.image_url);
//           }
//         });
//       },
//       error: (error: any) => {
//         console.error('Error fetching books:', error);
//       }
//     });
//   }

//   addToCart(bookToAdd: Book | any): void { // Type book parameter
//     if (bookToAdd) {
//       this.cartService.addToCart(bookToAdd);
//       alert(`${bookToAdd.title} added to cart!`);
//     } else {
//       console.warn('Book object is null or undefined, cannot add to cart.');
//     }
//   }
// }
// // import { Component, OnInit } from '@angular/core';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({ // CORRECTLY APPLIED DECORATOR - PLACED ABOVE CLASS
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent { // BookListComponent is now a CLASS
//   books = []; // Initialize books array as class property
//   bookService; // Declare bookService
//   cartService; // Declare cartService

//   constructor(bookService, cartService) { // Constructor for class, with dependency injection
//     this.bookService = bookService;
//     this.cartService = cartService;
//   }

//   ngOnInit() { // ngOnInit lifecycle hook as class method
//     this.retrieveBooks();
//   }

//   retrieveBooks() { // retrieveBooks method as class method
//     const self = this; // Keep 'this' context for callbacks (though arrow functions could also be used in subscribe)
//     this.bookService.getAll()
//       .subscribe({
//         next: function(data) {
//           self.books = data;
//           console.log(data);
//           self.books.forEach(function(book) {
//             if (book.image_url) {
//               book.image_url = self.bookService.getImageUrl(book.image_url);
//             }
//           });
//         },
//         error: function(error) {
//           console.error('Error fetching books:', error);
//         }
//       });
//   }

//   addToCart(book) { // addToCart method as class method
//     this.cartService.addToCart(book);
//     alert(`${book.title} added to cart!`);
//   }
// }
//export { BookListComponent };
// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent { // Removed: implements OnInit
//   books = [];

//   constructor(bookService, cartService) { // Removed parameter modifiers and types
//     this.bookService = bookService;
//     this.cartService = cartService;
//   }

//   ngOnInit() { // Kept ngOnInit method, just removed 'implements OnInit' from class
//     this.retrieveBooks();
//   }

//   retrieveBooks() {
//     const self = this;
//     this.bookService.getAll()
//       .subscribe({
//         next: function(data) {
//           self.books = data;
//           console.log(data);
//           self.books.forEach(function(book) {
//             if (book.image_url) {
//               book.image_url = self.bookService.getImageUrl(book.image_url);
//             }
//           });
//         },
//         error: function(error) {
//           console.error('Error fetching books:', error);
//         }
//       });
// //   }

// //   addToCart(book) {
// //     this.cartService.addToCart(book);
// //     alert(`${book.title} added to cart!`);
// //   }
// // }
// // client/src/app/book-list/book-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../book.service'; // Assuming correct path
// import { CartService } from '../cart.service'; // Assuming correct path

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent implements OnInit {
//   books: any[] = []; // Initialize books as an empty array, type 'any[]' or create a Book interface

//   constructor(
//     private bookService: BookService, // Inject BookService
//     private cartService: CartService  // Inject CartService
//   ) { }

//   ngOnInit(): void {
//     this.retrieveBooks();
//   }
   
//   // retrieveBooks(): void {
//   //   this.bookService.getAll().subscribe({
//   //     next: (data: any) => { // Type 'data' as 'any' or create a Book interface array type
//   //       this.books = data;
//   //       console.log(data);
//   //       this.books.forEach(book => {
//   //         if (book.image_url) {
//   //           book.image_url = this.bookService.getImageUrl(book.image_url);
//   //         }
//   //       });
//   //     },
//   //     error: (error: any) => { // Type 'error' as 'any' or HttpErrorResponse
//   //       console.error('Error fetching books:', error);
//   //     }
//   //   });
//   // }

//   // addToCart(book: any): void { // Type 'book' as 'any' or Book interface
//   //   this.cartService.addToCart(book);
//   //   alert(`${book.title} added to cart!`);
//   // }
//   retrieveBooks(): void {
//     this.bookService.getAll().subscribe({
//       next: (data: any) => {
//         // Filter books to only show available ones AND set isSold property
//         this.books = data
//           .filter(book => book.is_available === true) // Keep filtering available books
//           .map(book => {       // Map to add isSold property to each book
//             return {
//               ...book,          // Keep all existing book properties
//               isSold: !book.is_available // Add isSold property based on is_available (though in this filtered list, isSold will always be false, but good to have)
//             };
//           });
  
//         console.log('Available books fetched:', this.books);
//         this.books.forEach(book => {
//           if (book.image_url) {
//             book.image_url = this.bookService.getImageUrl(book.image_url);
//           }
//         });
//       },
//       error: (error: any) => {
//         console.error('Error fetching books:', error);
//       }
//     });
//   }
//   addToCart(book: any): void {
//     if (!book.isSold) { // Check book.isSold before adding to cart
//       this.cartService.addToCart(book);
//       alert(`${book.title} added to cart!`);
//     } else {
//       alert(`${book.title} is Sold and cannot be added to cart.`); // Inform user if book is sold
//     }
//   }
// }


// // client/src/app/book-list/book-list.component.js
// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })(BookListComponent); // Apply Component decorator

// function BookListComponent(bookService, cartService) { // Constructor
//   this.bookService = bookService;
//   this.cartService = cartService;
//   this.books = []; // Initialize books array
// }

// BookListComponent.prototype = {
//   constructor: BookListComponent,
//   ngOnInit: function() {
//     this.retrieveBooks();
//   },
//   retrieveBooks: function() {
//     var self = this; // Capture 'this' for use inside subscribe callback
//     this.bookService.getAll()
//       .subscribe({
//         next: function(data) {
//           self.books = data;
//           console.log(data);
//           self.books.forEach(function(book) {
//             if (book.image_url) {
//               book.image_url = self.bookService.getImageUrl(book.image_url);
//             }
//           });
//         },
//         error: function(error) {
//           console.error('Error fetching books:', error);
//         }
//       });
//   },
//   addToCart: function(book) {
//     this.cartService.addToCart(book);
//     alert(`${book.title} added to cart!`);
//   }
// };


// BookListComponent.ɵfac = function (t) { return new (t || BookListComponent)(BookService, CartService); }; // Factory
// BookListComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition
//   type: BookListComponent,
//   selectors: [["app-book-list"]],
//    NgOnChangesFeature: false, ngOnDestroy: null, ngDoCheck: null, ngAfterContentInit: null, ngAfterContentChecked: null, ngAfterViewInit: null, ngAfterViewChecked: null, ɵprov: undefined, changeDetection: 0,
//   inputs: { books : "books" ,  bookService : "bookService" ,  cartService : "cartService"  },
//   features: [  ],
//   decls: 14,
//   vars: 7,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });


// export { BookListComponent };