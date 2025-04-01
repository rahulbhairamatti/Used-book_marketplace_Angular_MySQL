import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

    book: any = null;
    loading: boolean = false;
    error: string = '';
    isSold: boolean = false;
    // quantityToAdd: number = 1; // REMOVED - Quantity control can be simplified if not needed in details page

    constructor(
        private route: ActivatedRoute,
        private bookService: BookService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.getBookDetails();
    }

    getBookDetails(): void {
        this.loading = true;
        this.error = '';
        const productId = this.route.snapshot.paramMap.get('productId');
        if (productId) {
            this.bookService.get(productId).subscribe({
                next: (data) => {
                    this.book = data;
                    this.loading = false;
                    this.isSold = this.book.quantity_in_stock <= 0; // Set isSold based on quantity_in_stock
                    console.log(data);
                    if (this.book.image_url) {
                        this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
                    }
                },
                error: (error) => {
                    console.error('Error fetching book details:', error);
                    this.loading = false;
                    this.error = 'Failed to load book details.';
                }
            });
        } else {
            console.error('Product ID is missing.');
            this.loading = false;
            this.error = 'Product ID is missing in URL.';
        }
    }


    addToCart(): void {
        this.bookService.get(this.book.product_id).subscribe({  // Fetch product details using bookService.get (your service)
            next: (productDetails: any) => {
                const stockQuantity = productDetails.quantity_in_stock;
                const cartItem = this.cartService.getCartItems().find(item => item.product_id === this.book.product_id);
                const currentCartQuantity = cartItem ? cartItem.quantity : 0;
                const newQuantity = currentCartQuantity + 1;
                const quantityAddedInClick = 1; // Quantity added in this click

                if (newQuantity <= stockQuantity) {
                    if (cartItem) {
                        cartItem.quantity = newQuantity;
                        this.cartService.updateCart(this.cartService.getCartItems());
                    } else {
                        this.cartService.addToCart(this.book, 1); // **CORRECTED: Using addToCart, quantity 1**
                    }
                    alert(`Added ${quantityAddedInClick} ${this.book.title} to cart!`); // Dynamic alert message
                } else {
                    alert(`Maximum stock reached for ${this.book.title}. Only ${stockQuantity} available in stock. You already have ${currentCartQuantity} in your cart.`);
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
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({
//     selector: 'app-book-details',
//     templateUrl: './book-details.component.html',
//     styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent implements OnInit {

//     book: any = null;
//     loading: boolean = false;
//     error: string = '';
//     isSold: boolean = false;
//     // quantityToAdd: number = 1; // REMOVED - Quantity control can be simplified if not needed in details page

//     constructor(
//         private route: ActivatedRoute,
//         private bookService: BookService,
//         private cartService: CartService
//     ) { }

//     ngOnInit(): void {
//         this.getBookDetails();
//     }

//     getBookDetails(): void {
//         this.loading = true;
//         this.error = '';
//         const productId = this.route.snapshot.paramMap.get('productId');
//         if (productId) {
//             this.bookService.get(productId).subscribe({
//                 next: (data) => {
//                     this.book = data;
//                     this.loading = false;
//                     this.isSold = this.book.quantity_in_stock <= 0; // Set isSold based on quantity_in_stock
//                     console.log(data);
//                     if (this.book.image_url) {
//                         this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//                     }
//                 },
//                 error: (error) => {
//                     console.error('Error fetching book details:', error);
//                     this.loading = false;
//                     this.error = 'Failed to load book details.';
//                 }
//             });
//         } else {
//             console.error('Product ID is missing.');
//             this.loading = false;
//             this.error = 'Product ID is missing in URL.';
//         }
//     }

//     // increaseQuantity(): void { // REMOVED - Quantity control now handled in addToCart
//     //     if (this.quantityToAdd < this.book.quantity) {
//     //         this.quantityToAdd++;
//     //     } else {
//     //         alert(`Maximum available quantity for ${this.book.title} reached.`);
//     //     }
//     // }

//     // decreaseQuantity(): void { // REMOVED - Quantity control now handled in addToCart
//     //     if (this.quantityToAdd > 1) {
//     //         this.quantityToAdd--;
//     //     }
//     // }

//     addToCart(): void {
//         this.bookService.get(this.book.product_id).subscribe({  // Fetch product details using bookService.get (your service)
//             next: (productDetails: any) => {
//                 const stockQuantity = productDetails.quantity_in_stock;
//                 const cartItem = this.cartService.getCartItems().find(item => item.book.product_id === this.book.product_id);
//                 const currentCartQuantity = cartItem ? cartItem.quantity : 0;
//                 const newQuantity = currentCartQuantity + 1;
//                 const quantityAddedInClick = 1; // Quantity added in this click

//                 if (newQuantity <= stockQuantity) {
//                     if (cartItem) {
//                         cartItem.quantity = newQuantity;
//                         this.cartService.updateCart(this.cartService.getCartItems());
//                     } else {
//                         this.cartService.addItem({ book: this.book, quantity: 1 });
//                     }
//                     alert(`Added ${quantityAddedInClick} ${this.book.title} to cart!`); // Dynamic alert message
//                 } else {
//                     alert(`Maximum stock reached for ${this.book.title}. Only ${stockQuantity} available in stock. You already have ${currentCartQuantity} in your cart.`);
//                 }
//             },
//             error: (error: any) => {
//                 console.error('Error fetching product details:', error);
//                 alert('Could not add to cart. Please try again.');
//             }
//         });
//     }
// }


// // client/src/app/book-details/book-details.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent implements OnInit {

//   book: any = null;
//   loading: boolean = false;
//   error: string = '';
//   isSold: boolean = false;
//   quantityToAdd: number = 1; // For book details quantity control, default to 1

//   constructor(
//     private route: ActivatedRoute,
//     private bookService: BookService,
//     private cartService: CartService
//   ) { }

//   ngOnInit(): void {
//     this.getBookDetails();
//   }

//   getBookDetails(): void {
//     this.loading = true;
//     this.error = '';
//     const productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       this.bookService.get(productId).subscribe({
//         next: (data) => {
//           this.book = data;
//           this.loading = false;
//           this.isSold = this.book.quantity <= 0; // Set isSold based on quantity
//           console.log(data);
//           if (this.book.image_url) {
//             this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//           }
//         },
//         error: (error) => {
//           console.error('Error fetching book details:', error);
//           this.loading = false;
//           this.error = 'Failed to load book details.';
//         }
//       });
//     } else {
//       console.error('Product ID is missing.');
//       this.loading = false;
//       this.error = 'Product ID is missing in URL.';
//     }
//   }

//   increaseQuantity(): void {
//     if (this.quantityToAdd < this.book.quantity) {
//       this.quantityToAdd++;
//     } else {
//       alert(`Maximum available quantity for ${this.book.title} reached.`);
//     }
//   }

//   decreaseQuantity(): void {
//     if (this.quantityToAdd > 1) {
//       this.quantityToAdd--;
//     }
//   }

//   addToCart(): void {
//     if (!this.isSold) {
//       if (this.quantityToAdd <= this.book.quantity) {
//         this.cartService.addToCart(this.book, this.quantityToAdd); // Pass quantity to cart service
//         alert(`${this.quantityToAdd} ${this.book.title}(s) added to cart!`);
//         this.quantityToAdd = 1; // Reset quantity control after adding to cart
//       } else {
//          alert(`Not enough stock available for ${this.book.title}. Only ${this.book.quantity} available.`);
//       }
//     } else {
//       alert(`${this.book.title} is Sold and cannot be added to cart.`);
//     }
//   }
// }

// // client/src/app/book-details/book-details.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent implements OnInit {

//   book: any = null;
//   loading: boolean = false;
//   error: string = '';
//   isSold: boolean = false;

//   constructor(
//     private route: ActivatedRoute,
//     private bookService: BookService,
//     private cartService: CartService
//   ) {}

//   ngOnInit(): void {
//     this.getBookDetails();
//   }

//   getBookDetails(): void {
//     this.loading = true;
//     this.error = '';
//     const productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       this.bookService.get(productId).subscribe({
//         next: (data) => {
//           this.book = data;
//           this.loading = false;
//           //this.isSold = !this.book.is_available;
//           console.log(data);
//           if (this.book.image_url) {
//             this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//           }
//         },
//         error: (error) => {
//           console.error('Error fetching book details:', error);
//           this.loading = false;
//           this.error = 'Failed to load book details.';
//         }
//       });
//     } else {
//       console.error('Product ID is missing.');
//       this.loading = false;
//       this.error = 'Product ID is missing in URL.';
//     }
//   }

//   addToCart(book: any): void {
//     if (!this.isSold) {
//       this.cartService.addToCart(book);
//       alert(`${book.title} added to cart!`);
//     } else {
//       alert(`${book.title} is Sold and cannot be added to cart.`);
//     }
//   }
// }


// // client/src/app/book-details/book-details.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service'; // Assuming correct path to your BookService
// import { CartService } from '../cart.service';   // Assuming correct path to your CartService

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent implements OnInit {

//   book: any = null; // Initialize book as null
//   loading: boolean = false;
//   error: string = '';
//   isSold: boolean = false; // ADDED: Property to track if the book is sold

//   constructor(
//     private route: ActivatedRoute, // Inject ActivatedRoute
//     private bookService: BookService, // Inject BookService
//     private cartService: CartService   // Inject CartService
//   ) {
//     // No need to assign injected services to class properties here.
//     // Angular's dependency injection handles it.
//   }

//   ngOnInit(): void {
//     this.getBookDetails();
//   }

//   getBookDetails(): void {
//     this.loading = true;
//     this.error = '';
//     const productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       this.bookService.get(productId).subscribe({
//         next: (data) => {
//           this.book = data;
//           this.loading = false;
//           this.isSold = !this.book.is_available; // ADDED: Set isSold based on is_available
//           console.log(data);
//           if (this.book.image_url) {
//             this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//           }
//         },
//         error: (error) => {
//           console.error('Error fetching book details:', error);
//           this.loading = false;
//           this.error = 'Failed to load book details.';
//         }
//       });
//     } else {
//       console.error('Product ID is missing.');
//       this.loading = false;
//       this.error = 'Product ID is missing in URL.';
//     }
//   }

//   addToCart(book: any): void { // Type 'book' as 'any'
//     if (!this.isSold) { // Prevent adding to cart if sold
//       this.cartService.addToCart(book);
//       alert(`${book.title} added to cart!`);
//     } else {
//       alert(`${book.title} is Sold and cannot be added to cart.`); // Optional: Inform user book is sold
//     }
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service'; // Assuming correct path to your BookService
// import { CartService } from '../cart.service';  // Assuming correct path to your CartService

// @Component({
//     selector: 'app-book-details',
//     templateUrl: './book-details.component.html',
//     styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent implements OnInit {

//     book: any = null; // Initialize book as null
//     loading: boolean = false; // <-- ADD THIS LINE: Initialize loading to false
//     error: string = '';      // <-- ADD THIS LINE: Initialize error as empty string

//     constructor(
//         private route: ActivatedRoute, // Inject ActivatedRoute
//         private bookService: BookService, // Inject BookService
//         private cartService: CartService  // Inject CartService
//     ) {
//         // No need to assign injected services to class properties here.
//         // Angular's dependency injection handles it.
//     }

//     ngOnInit(): void {
//         this.getBookDetails();
//     }

//     getBookDetails(): void {
//         this.loading = true; // <-- SET loading to true when you START fetching data
//         this.error = '';     // <-- CLEAR any previous error when starting a new fetch
//         const productId = this.route.snapshot.paramMap.get('productId');
//         if (productId) {
//             this.bookService.get(productId).subscribe({
//                 next: (data) => {
//                     this.book = data;
//                     this.loading = false; // <-- SET loading to false when data is successfully received
//                     console.log(data);
//                     if (this.book.image_url) {
//                         this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//                     }
//                 },
//                 error: (error) => {
//                     console.error('Error fetching book details:', error);
//                     this.loading = false; // <-- SET loading to false even on error
//                     this.error = 'Failed to load book details.'; // <-- SET error message
//                 }
//             });
//         } else {
//             console.error('Product ID is missing.');
//             this.loading = false; // <-- SET loading to false if product ID is missing
//             this.error = 'Product ID is missing in URL.'; // <-- SET error message
//         }
//     }

//     addToCart(book: any): void { // Type 'book' as 'any'
//         this.cartService.addToCart(book);
//         alert(`${book.title} added to cart!`);
//     }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service'; // Import your BookService
// import { Book } from '../model/book.model';   // Import your Book model
// import { CartService } from '../cart.service'; // Import CartService for "Add to Cart"

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent implements OnInit {

//   book: Book | undefined; // To hold the book details (initially undefined)
//   loading: boolean = false;
//   error: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private bookService: BookService,
//     private cartService: CartService // Inject CartService
//   ) { }

//   ngOnInit(): void {
//     this.getBookDetails();
//   }

//   getBookDetails(): void {
//     this.loading = true;
//     this.error = null;
//     const id = Number(this.route.snapshot.paramMap.get('id')); // Get book ID from route params

//     if (isNaN(id)) {
//       console.error('Invalid book ID in route');
//       this.error = 'Invalid book ID.';
//       this.loading = false;
//       return;
//     }

//     this.bookService.get(id).subscribe({ // **Using bookService.get(id) here (as per your BookService)**
//       next: (data: Book) => {
//         this.book = data;
//         this.loading = false;
//         console.log('Book details fetched:', this.book);
//         if (this.book.image_url) {
//           this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//         }
//       },
//       error: (errorResponse: any) => {
//         console.error('Error fetching book details:', errorResponse);
//         this.error = 'Failed to load book details.';
//         this.loading = false;
//         if (errorResponse && errorResponse.message) {
//           this.error = errorResponse.message; // Use backend error message if available
//         }
//       }
//     });
//   }

//   addToCart(book: Book | undefined): void {
//     if (book) {
//       this.cartService.addToCart(book);
//       alert(`${book.title} has been added to your cart!`); // Simple feedback for now
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service'; // Import your BookService
// import { Book } from '../model/book.model';   // Import your Book model
// import { CartService } from '../cart.service'; // Import CartService for "Add to Cart"

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent implements OnInit {

//   book: Book | undefined; // To hold the book details (initially undefined)
//   loading: boolean = false;
//   error: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private bookService: BookService,
//     private cartService: CartService // Inject CartService
//   ) { }

//   ngOnInit(): void {
//     this.getBookDetails();
//   }

//   getBookDetails(): void {
//     this.loading = true;
//     this.error = null;
//     const id = Number(this.route.snapshot.paramMap.get('id')); // Get book ID from route params

//     if (isNaN(id)) {
//       console.error('Invalid book ID in route');
//       this.error = 'Invalid book ID.';
//       this.loading = false;
//       return;
//     }

//     this.bookService.get(id).subscribe({
//       next: (data: Book) => {
//         this.book = data;
//         this.loading = false;
//         console.log('Book details fetched:', this.book);
//         if (this.book.image_url) {
//           this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//         }
//       },
//       error: (errorResponse: any) => {
//         console.error('Error fetching book details:', errorResponse);
//         this.error = 'Failed to load book details.';
//         this.loading = false;
//         if (errorResponse && errorResponse.message) {
//           this.error = errorResponse.message; // Use backend error message if available
//         }
//       }
//     });
//   }

//   addToCart(book: Book | undefined): void {
//     if (book) {
//       this.cartService.addToCart(book);
//       alert(`${book.title} has been added to your cart!`); // Simple feedback for now
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';
// import { BookListComponent } from '../book-list/book-list.component'; // Import Book interface (if you have one)

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent implements OnInit {

//   book: BookListComponent | any = null; // Type as Book interface or 'any' if Book interface is not defined yet

//   constructor(
//     private route: ActivatedRoute,
//     private bookService: BookService,
//     private cartService: CartService
//   ) { }

//   ngOnInit(): void {
//     this.getBookDetails();
//   }

//   getBookDetails(): void {
//     const productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       this.bookService.get(productId).subscribe({
//         next: (data: BookListComponent | any) => { // Type data as Book or 'any'
//           this.book = data;
//           console.log('Book details:', data); // More descriptive log
//           if (this.book?.image_url) { // Use optional chaining for safety
//             this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//           }
//         },
//         error: (error: any) => {
//           console.error('Error fetching book details:', error);
//         }
//       });
//     } else {
//       console.error('Product ID is missing in route.'); // More informative error log
//     }
//   }

//   addToCart(bookToAdd: BookListComponent | any): void { // Type book parameter
//     if (bookToAdd) { // Check if book is valid
//       this.cartService.addToCart(bookToAdd);
//       alert(`${bookToAdd.title} added to cart!`); // Access title safely using optional chaining if needed: bookToAdd?.title
//     } else {
//       console.warn('Book object is null or undefined, cannot add to cart.');
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service'; // Assuming correct path to your BookService
// import { CartService } from '../cart.service';   // Assuming correct path to your CartService

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent implements OnInit {

//   book: any = null; // Initialize book as null, type 'any' for flexibility, adjust if you have a Book interface

//   constructor(
//     private route: ActivatedRoute, // Inject ActivatedRoute
//     private bookService: BookService, // Inject BookService
//     private cartService: CartService  // Inject CartService
//   ) {
//     // No need to assign injected services to class properties here.
//     // Angular's dependency injection handles it.
//   }

//   ngOnInit(): void {
//     this.getBookDetails();
//   }

//   getBookDetails(): void {
//     const productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       this.bookService.get(productId).subscribe({
//         next: (data) => {
//           this.book = data;
//           console.log(data);
//           if (this.book.image_url) {
//             this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//           }
//         },
//         error: (error) => {
//           console.error('Error fetching book details:', error);
//         }
//       });
//     } else {
//       console.error('Product ID is missing.');
//     }
//   }

//   addToCart(book: any): void { // Type 'book' as 'any' or your Book interface
//     this.cartService.addToCart(book);
//     alert(`${book.title} added to cart!`);
//   }
// }
// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router'; // Correct import: ActivatedRoute
// // import { BookService } from '../book.service';
// // import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent  implements OnInit { // Implement OnInit interface

//   book = null;
//   // route;  // No need to declare these here, already parameters in constructor
//   // bookService; // No need to declare these here
//   // cartService; // No need to declare these here

//   constructor(private route: ActivatedRoute, private bookService: BookService, private cartService: CartService) { // Inject with types (optional but good practice)
//     // this.route = route; // No need to assign here, Angular DI handles it
//     // this.bookService = bookService; // No need to assign here
//     // this.cartService = cartService; // No need to assign here
//   }

//   ngOnInit() {
//     this.getBookDetails();
//   }

//   getBookDetails() {
//     const productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       this.bookService.get(productId)
//         .subscribe({
//           next: (data) => {
//             this.book = data;
//             console.log(data);
//             if (this.book.image_url) {
//               this.book.image_url = this.bookService.getImageUrl(this.book.image_url);
//             }
//           },
//           error: (error) => {
//             console.error('Error fetching book details:', error);
//           }
//         });
//     } else {
//       console.error('Product ID is missing.');
//     }
//   }

//   addToCart(book) {
//     this.cartService.addToCart(book);
//     alert(`${book.title} added to cart!`);
//   }
// }

// BookDetailsComponent.ɵfac = function (t) { return new (t || BookDetailsComponent)(ActivatedRoute, BookService, CartService); };
// BookDetailsComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({
//   type: BookDetailsComponent,
//   selectors: [["app-book-details"]],
//   inputs: { route : "route" , bookService : "bookService" , cartService : "cartService" }, // Inputs are not needed for DI, remove them
//   features: [ ],
//   decls: 22,
//   vars: 7,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent { // Removed: implements OnInit

  

//   constructor(route, bookService, cartService) { // Removed parameter modifiers and types
//     this.route = route;
//     this.bookService = bookService;
//     this.cartService = cartService;
//     this.book=null;
//   }

//   ngOnInit() { // Kept ngOnInit method, just removed 'implements OnInit' from class
//     this.getBookDetails();
//   }

//   getBookDetails() {
//     const productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       const self = this;
//       this.bookService.get(productId)
//         .subscribe({
//           next: (data) => {
//             self.book = data;
//             console.log(data);
//             if (self.book.image_url) {
//               self.book.image_url = self.bookService.getImageUrl(self.book.image_url);
//             }
//           },
//           error: (error) => {
//             console.error('Error fetching book details:', error);
//           }
//         });
//     } else {
//       console.error('Product ID is missing.');
//     }
//   }

//   addToCart(book) {
//     this.cartService.addToCart(book);
//     alert(`${book.title} added to cart!`);
//   }
// }

// BookDetailsComponent.ɵfac = function (t) { return new (t || BookDetailsComponent)(ActivatedRoute, BookService, CartService); };
// BookDetailsComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({
//   type: BookDetailsComponent,
//   selectors: [["app-book-details"]],
//   features: [ ],
//   decls: 22,
//   vars: 7,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({ // Correct decorator placement ABOVE the class
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// })
// export class BookDetailsComponent  { // BookDetailsComponent is now a CLASS
//   book = null; // Initialize book as class property
//   route;
//   bookService;
//   cartService;

//   constructor(route, bookService, cartService) { // Class constructor with dependency injection
//     this.route = route;
//     this.bookService = bookService;
//     this.cartService = cartService;
//   }

//   ngOnInit() { // ngOnInit lifecycle hook as class method
//     this.getBookDetails();
//   }

//   getBookDetails() { // getBookDetails method as class method
//     const productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       const self = this;
//       this.bookService.get(productId)
//         .subscribe({
//           next: (data) => { // Using arrow function for 'this' context or keep 'function()' and use self.book = data;
//             self.book = data;
//             console.log(data);
//             if (self.book.image_url) {
//               self.book.image_url = self.bookService.getImageUrl(self.book.image_url);
//             }
//           },
//           error: (error) => {
//             console.error('Error fetching book details:', error);
//           }
//         });
//     } else {
//       console.error('Product ID is missing.');
//     }
//   }

//   addToCart(book) { // addToCart method as class method
//     this.cartService.addToCart(book);
//     alert(`${book.title} added to cart!`);
//   }
// }

// BookDetailsComponent.ɵfac = function (t) { return new (t || BookDetailsComponent)(ActivatedRoute, BookService, CartService); }; // Factory (Keep)
// BookDetailsComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition (Keep)
//   type: BookDetailsComponent,
//   selectors: [["app-book-details"]],
//   inputs: { route : "route" , bookService : "bookService" , cartService : "cartService" },
//   features: [ ],
//   decls: 22,
//   vars: 7,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });

 //export { BookDetailsComponent };



//  import { Component, Injector } from '@angular/core';
//  import { ActivatedRoute } from '@angular/router';
//  import { BookService } from '../services/book.service';
//  import { CartService } from '../services/cart.service';
 
//  @Component({
//    selector: 'app-book-details',
//    templateUrl: './book-details.component.html',
//    styleUrls: ['./book-details.component.css']
//  })
//  export class BookDetailsComponent {
//    constructor(injector) {
//      this.route = injector.get(ActivatedRoute);
//      this.bookService = injector.get(BookService);
//      this.cartService = injector.get(CartService);
//    }
//  }
 
// client/src/app/book-details/book-details.component.js
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from '../book.service';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-book-details',
//   templateUrl: './book-details.component.html',
//   styleUrls: ['./book-details.component.css']
// }) // Apply Component decorator

// export class BookDetailsComponent(route, bookService, cartService) { // Constructor
//   // this.route = route;
//   // this.bookService = bookService;
//   // this.cartService = cartService;
//   constructor(injector) {
//     this.route = injector.get(ActivatedRoute);
//     this.bookService = injector.get(BookService);
//     this.cartService = injector.get(CartService);
//   }
//   this.book = null; // Initialize book to null
// }

// BookDetailsComponent.prototype = {
//   constructor: BookDetailsComponent,
//   ngOnInit: function() {
//     this.getBookDetails();
//   },
//   getBookDetails: function() {
//     var productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       var self = this;
//       this.bookService.get(productId)
//         .subscribe({
//           next: function(data) {
//             self.book = data;
//             console.log(data);
//             if (self.book.image_url) {
//               self.book.image_url = self.bookService.getImageUrl(self.book.image_url);
//             }
//           },
//           error: function(error) {
//             console.error('Error fetching book details:', error);
//           }
//         });
//     } else {
//       console.error('Product ID is missing.');
//     }
//   },
//   addToCart: function(book) {
//     this.cartService.addToCart(book);
//     alert(`${book.title} added to cart!`);
//   }
// };

// BookDetailsComponent.ɵfac = function (t) { return new (t || BookDetailsComponent)(ActivatedRoute, BookService, CartService); }; // Factory
// BookDetailsComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition
//   type: BookDetailsComponent,
//   selectors: [["app-book-details"]],
//    NgOnChangesFeature: false, ngOnDestroy: null, ngDoCheck: null, ngAfterContentInit: null, ngAfterContentChecked: null, ngAfterViewInit: null, ngAfterViewChecked: null, ɵprov: undefined, changeDetection: 0,
//   inputs: { route : "route" , bookService : "bookService" , cartService : "cartService" },
//   features: [  ],
//   decls: 22,
//   vars: 7,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });


// export { BookDetailsComponent };