// import { Component } from '@angular/core';
// import { BookService } from '../book.service';

// @Component({
//   selector: 'app-sell-book',
//   templateUrl: './sell-book.component.html',
//   styleUrls: ['./sell-book.component.css']
// })
// export class SellBookComponent {
//   book = {
//     title: '',
//     author: '',
//     genre: '',
//     condition: 'Good',
//     price: 0,
//     description: '',
//     image_url: ''
//   };
//   message = '';
//   priceSuggestion = '';

//   constructor(bookService) { // Removed parameter modifiers and types
//     this.bookService = bookService;
//   }

//   onSubmit() {
//     const data = {
//       title: this.book.title,
//       author: this.book.author,
//       genre: this.book.genre,
//       condition: this.book.condition,
//       price: this.book.price,
//       description: this.book.description,
//       image_url: this.book.image_url
//     };

//     const self = this;
//     this.bookService.create(data)
//       .subscribe({
//         next: (res) => {
//           console.log(res);
//           self.message = res.message ? res.message : 'Book listed successfully!';
//           self.book = {
//             title: '',
//             author: '',
//             genre: '',
//             condition: 'Good',
//             price: 0,
//             description: '',
//             image_url: ''
//           };
//           self.priceSuggestion = '';
//         },
//         error: (e) => {
//           console.error(e);
//           self.message = 'Error listing book.';
//           self.priceSuggestion = '';
//         }
//       });
//   }

//   suggestPrice() {
//     let basePrice = 20;
//     let conditionMultiplier = 1;

//     switch (this.book.condition) {
//       case 'Like New':
//         conditionMultiplier = 1.2;
//         break;
//       case 'Good':
//         conditionMultiplier = 1.0;
//         break;
//       case 'Acceptable':
//         conditionMultiplier = 0.7;
//         break;
//       case 'Worn':
//         conditionMultiplier = 0.5;
//         break;
//       default:
//         conditionMultiplier = 1.0;
//     }

//     let suggestedPrice = basePrice * conditionMultiplier;
//     this.priceSuggestion = `Suggested price for '${this.book.condition}' condition: $${suggestedPrice.toFixed(2)}`;
//     this.book.price = parseFloat(suggestedPrice.toFixed(2)); // Optionally, set suggested price in the price input
//   }
// }

// SellBookComponent.ɵfac = function (t) { return new (t || SellBookComponent)(BookService); };
// SellBookComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({
//   type: SellBookComponent,
//   selectors: [["app-sell-book"]],
//   features: [ ],
//   decls: 31,
//   vars: 11,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before, but add price suggestion display and button) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });

// import { Component } from '@angular/core';
// import { BookService } from '../book.service';

// @Component({ // CORRECT DECORATOR PLACEMENT ABOVE CLASS
//   selector: 'app-sell-book',
//   templateUrl: './sell-book.component.html',
//   styleUrls: ['./sell-book.component.css']
// })
// export class SellBookComponent { // SellBookComponent is now a CLASS
//   book = { // Initialize book object as class property
//     title: '',
//     author: '',
//     genre: '',
//     condition: 'Good',
//     price: 0,
//     description: '',
//     image_url: ''
//   };
//   message = ''; // Initialize message as class property
//   priceSuggestion = ''; // Initialize priceSuggestion as class property
//   bookService; // Declare bookService

//   constructor(bookService) { // Class constructor with dependency injection
//     this.bookService = bookService;
//   }

//   onSubmit() { // onSubmit method as class method
//     const data = {
//       title: this.book.title,
//       author: this.book.author,
//       genre: this.book.genre,
//       condition: this.book.condition,
//       price: this.book.price,
//       description: this.book.description,
//       image_url: this.book.image_url
//     };

//     const self = this;
//     this.bookService.create(data)
//       .subscribe({
//         next: (res) => { // Using arrow function for 'this' context or keep 'function()' and use self.message = res.message;
//           console.log(res);
//           self.message = res.message ? res.message : 'Book listed successfully!';
//           self.book = {
//             title: '',
//             author: '',
//             genre: '',
//             condition: 'Good',
//             price: 0,
//             description: '',
//             image_url: ''
//           };
//           self.priceSuggestion = ''; // Clear suggestion on success
//         },
//         error: (e) => {
//           console.error(e);
//           self.message = 'Error listing book.';
//           self.priceSuggestion = ''; // Clear suggestion on error too
//         }
//       });
//   }

//   suggestPrice() { // suggestPrice method as class method
//     let basePrice = 20; // Example base price
//     let conditionMultiplier = 1;

//     switch (this.book.condition) {
//       case 'Like New':
//         conditionMultiplier = 1.2;
//         break;
//       case 'Good':
//         conditionMultiplier = 1.0;
//         break;
//       case 'Acceptable':
//         conditionMultiplier = 0.7;
//         break;
//       case 'Worn':
//         conditionMultiplier = 0.5;
//         break;
//       default:
//         conditionMultiplier = 1.0;
//     }

//     let suggestedPrice = basePrice * conditionMultiplier;
//     this.priceSuggestion = `Suggested price for '${this.book.condition}' condition: $${suggestedPrice.toFixed(2)}`;
//     this.book.price = parseFloat(suggestedPrice.toFixed(2)); // Optionally, set suggested price in the price input
//   }
// }

// SellBookComponent.ɵfac = function (t) { return new (t || SellBookComponent)(BookService); }; // Factory (Keep)
// SellBookComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition (Keep)
//   type: SellBookComponent,
//   selectors: [["app-sell-book"]],
//   inputs: { bookService : "bookService" },
//   features: [ ],
//   decls: 31,
//   vars: 11,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before, but add price suggestion display and button) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });

// //export { SellBookComponent };

// // // client/src/app/sell-book/sell-book.component.js
// // import { Component } from '@angular/core';
// // import { BookService } from '../book.service';

// Component({
//   selector: 'app-sell-book',
//   templateUrl: './sell-book.component.html',
//   styleUrls: ['./sell-book.component.css']
// })(SellBookComponent);

// function SellBookComponent(bookService) {
//   this.bookService = bookService;
//   this.book = {
//     title: '',
//     author: '',
//     genre: '',
//     condition: 'Good',
//     price: 0,
//     description: '',
//     image_url: ''
//   };
//   this.message = '';
//   this.priceSuggestion = ''; // Added for price suggestion
// }

// SellBookComponent.prototype = {
//   constructor: SellBookComponent,
//   onSubmit: function() {
//     var data = {
//       title: this.book.title,
//       author: this.book.author,
//       genre: this.book.genre,
//       condition: this.book.condition,
//       price: this.book.price,
//       description: this.book.description,
//       image_url: this.book.image_url
//     };

//     var self = this;
//     this.bookService.create(data)
//       .subscribe({
//         next: function(res) {
//           console.log(res);
//           self.message = res.message ? res.message : 'Book listed successfully!';
//           self.book = {
//             title: '',
//             author: '',
//             genre: '',
//             condition: 'Good',
//             price: 0,
//             description: '',
//             image_url: ''
//           };
//           self.priceSuggestion = ''; // Clear suggestion on success
//         },
//         error: function(e) {
//           console.error(e);
//           self.message = 'Error listing book.';
//           self.priceSuggestion = ''; // Clear suggestion on error too
//         }
//       });
//   },
//   suggestPrice: function() { // Price suggestion logic
//     let basePrice = 20; // Example base price
//     let conditionMultiplier = 1;

//     switch (this.book.condition) {
//       case 'Like New':
//         conditionMultiplier = 1.2;
//         break;
//       case 'Good':
//         conditionMultiplier = 1.0;
//         break;
//       case 'Acceptable':
//         conditionMultiplier = 0.7;
//         break;
//       case 'Worn':
//         conditionMultiplier = 0.5;
//         break;
//       default:
//         conditionMultiplier = 1.0;
//     }

//     let suggestedPrice = basePrice * conditionMultiplier;
//     this.priceSuggestion = `Suggested price for '${this.book.condition}' condition: $${suggestedPrice.toFixed(2)}`;
//     this.book.price = parseFloat(suggestedPrice.toFixed(2)); // Optionally, set suggested price in the price input
//   }
// };

// SellBookComponent.ɵfac = function (t) { return new (t || SellBookComponent)(BookService); };
// SellBookComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({
//   type: SellBookComponent,
//   selectors: [["app-sell-book"]],
//    NgOnChangesFeature: false, ngOnDestroy: null, ngDoCheck: null, ngAfterContentInit: null, ngAfterContentChecked: null, ngAfterViewInit: null, ngAfterViewChecked: null, ɵprov: undefined, changeDetection: 0,
//   inputs: { bookService : "bookService" },
//   features: [  ],
//   decls: 31,
//   vars: 11,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before, but add price suggestion display and button) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });


// export { SellBookComponent };




// // client/src/app/sell-book/sell-book.component.js
// import { Component } from '@angular/core';
// import { BookService } from '../book.service';

// Component({
//   selector: 'app-sell-book',
//   templateUrl: './sell-book.component.html',
//   styleUrls: ['./sell-book.component.css']
// })(SellBookComponent); // Apply Component decorator

// function SellBookComponent(bookService) { // Constructor
//   this.bookService = bookService;
//   this.book = {
//     title: '',
//     author: '',
//     genre: '',
//     condition: 'Good',
//     price: 0,
//     description: '',
//     image_url: ''
//   };
//   this.message = '';
// }

// SellBookComponent.prototype = {
//   constructor: SellBookComponent,
//   onSubmit: function() {
//     var data = {
//       title: this.book.title,
//       author: this.book.author,
//       genre: this.book.genre,
//       condition: this.book.condition,
//       price: this.book.price,
//       description: this.book.description,
//       image_url: this.book.image_url
//     };

//     var self = this;
//     this.bookService.create(data)
//       .subscribe({
//         next: function(res) {
//           console.log(res);
//           self.message = res.message ? res.message : 'Book listed successfully!';
//           self.book = { // Reset the form
//             title: '',
//             author: '',
//             genre: '',
//             condition: 'Good',
//             price: 0,
//             description: '',
//             image_url: ''
//           };
//         },
//         error: function(e) {
//           console.error(e);
//           self.message = 'Error listing book.';
//         }
//       });
//   }
// };


// SellBookComponent.ɵfac = function (t) { return new (t || SellBookComponent)(BookService); }; // Factory
// SellBookComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition
//   type: SellBookComponent,
//   selectors: [["app-sell-book"]],
//    NgOnChangesFeature: false, ngOnDestroy: null, ngDoCheck: null, ngAfterContentInit: null, ngAfterContentChecked: null, ngAfterViewInit: null, ngAfterViewChecked: null, ɵprov: undefined, changeDetection: 0,
//   inputs: { bookService : "bookService" },
//   features: [  ],
//   decls: 29,
//   vars: 10,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });

// export { SellBookComponent };
// client/src/app/sell-book/sell-book.component.ts


// import { Component } from '@angular/core';
// import { BookService } from '../book.service'; // Assuming correct path

// interface Book { // Define an interface for the book object
//   title: string;
//   author: string;
//   genre: string;
//   condition: string;
//   price: number;
//   description: string;
//   image_url: string;
// }

// @Component({
//   selector: 'app-sell-book',
//   templateUrl: './sell-book.component.html',
//   styleUrls: ['./sell-book.component.css']
// })
// export class SellBookComponent {
//   book: Book = { // Type 'book' with the Book interface and initialize
//     title: '',
//     author: '',
//     genre: '',
//     condition: 'Good',
//     price: 0,
//     description: '',
//     image_url: ''
//   };
//   message: string = ''; // Initialize message, type string
//   priceSuggestion: string = ''; // <-- ADD THIS LINE: Initialize priceSuggestion, type string
//   constructor(private bookService: BookService) { // Inject BookService
//     // No need to assign, Angular DI handles it
//   }

//   onSubmit(): void {
//     var data = { // Type 'data' object - can use Book interface or keep it inline
//       title: this.book.title,
//       author: this.book.author,
//       genre: this.book.genre,
//       condition: this.book.condition,
//       price: this.book.price,
//       description: this.book.description,
//       image_url: this.book.image_url
//     };
//     var self = this;
//     this.bookService.create(data).subscribe({
//       next: (res: any) => { // Type 'res' as 'any' or a proper response interface
//         console.log(res);
//         self.message = res.message ? res.message : 'Book listed successfully!';
//         self.book = { // Reset the form, type 'book' again
//           title: '',
//           author: '',
//           genre: '',
//           condition: 'Good',
//           price: 0,
//           description: '',
//           image_url: ''
//         };
//       },
//       error: (e: any) => { // Type 'e' as 'any' or HttpErrorResponse
//         console.error(e);
//         self.message = 'Error listing book.';
//       }
//     });
//   }
//   // suggestPrice(): void { // <-- ADD THIS METHOD
//   //   console.log("Suggest Price function called"); // Placeholder logic for now
//   //   this.priceSuggestion = "Suggested price is a placeholder."; // Example suggestion message
//   //   // In a real application, you would implement logic here to calculate a suggested price
//   //   // and update this.priceSuggestion based on book condition, genre, etc. <--- THIS LINE IS A COMMENT - OKAY TO KEEP
//   // }
//   suggestPrice(): void {
//     console.log("Suggest Price function called - Condition:", this.book.condition); // Log condition for debugging

//     let suggestedPriceValue: number = 0; // Initialize suggested price to 0

//     switch (this.book.condition) {
//       case 'Like New':
//         suggestedPriceValue = 20;
//         break;
//       case 'Good':
//         suggestedPriceValue = 15;
//         break;
//       case 'Acceptable':
//         suggestedPriceValue = 10;
//         break;
//       case 'Worn':
//         suggestedPriceValue = 5;
//         break;
//       default:
//         suggestedPriceValue = 0; // Or you can set a default suggestion or message if condition is unknown
//         this.priceSuggestion = "Condition not recognized for price suggestion.";
//         return; // Exit function if condition is not recognized
//     }

//     // Format the suggested price as currency (e.g., "$20")
//     this.priceSuggestion = `Suggested price: $${suggestedPriceValue}`;
//   }
// }
import { Component } from '@angular/core';
import { BookService } from '../book.service'; // Assuming correct path

interface Book { // Define an interface for the book object
  title: string;
  author: string;
  genre: string;
  condition: string;
  price: number;
  description: string;
  image_url: string;
  quantity: number; // <-- ADD QUANTITY PROPERTY TO INTERFACE
  seller_name: string; // <-- ADD seller_name PROPERTY TO INTERFACE
}

@Component({
  selector: 'app-sell-book',
  templateUrl: './sell-book.component.html',
  styleUrls: ['./sell-book.component.css']
})
export class SellBookComponent {
  book: Book = { // Type 'book' with the Book interface and initialize
    title: '',
    author: '',
    genre: '',
    condition: 'Good',
    price: 0,
    description: '',
    image_url: '',
    quantity: 1, // <-- INITIALIZE QUANTITY PROPERTY (default to 1 or 0 as needed)
    seller_name: '' // <-- INITIALIZE seller_name PROPERTY
  };
  message: string = ''; // Initialize message, type string
  priceSuggestion: string = ''; // <-- ADD THIS LINE: Initialize priceSuggestion, type string
  constructor(private bookService: BookService) { // Inject BookService
    // No need to assign, Angular DI handles it
  }

  onSubmit(): void {
    var data = { // Type 'data' object - can use Book interface or keep it inline
      title: this.book.title,
      author: this.book.author,
      genre: this.book.genre,
      condition: this.book.condition,
      price: this.book.price,
      description: this.book.description,
      image_url: this.book.image_url,
      quantity: this.book.quantity, // <-- INCLUDE QUANTITY IN DATA OBJECT
      seller_name: this.book.seller_name // <-- INCLUDE seller_name IN DATA OBJECT
    };
    var self = this;
    this.bookService.create(data).subscribe({
      next: (res: any) => { // Type 'res' as 'any' or a proper response interface
        console.log(res);
        self.message = res.message ? res.message : 'Book listed successfully!';
        self.book = { // Reset the form, type 'book' again
          title: '',
          author: '',
          genre: '',
          condition: 'Good',
          price: 0,
          description: '',
          image_url: '',
          quantity: 1 ,// <-- RESET QUANTITY IN BOOK OBJECT ALSO
          seller_name: '' // <-- RESET seller_name IN BOOK OBJECT ALSO
        };
      },
      error: (e: any) => { // Type 'e' as 'any' or HttpErrorResponse
        console.error(e);
        self.message = 'Error listing book.';
      }
    });
  }
  suggestPrice(): void {
    console.log("Suggest Price function called - Condition:", this.book.condition); // Log condition for debugging

    let suggestedPriceValue: number = 0; // Initialize suggested price to 0

    switch (this.book.condition) {
      case 'Like New':
        suggestedPriceValue = 20;
        break;
      case 'Good':
        suggestedPriceValue = 15;
        break;
      case 'Acceptable':
        suggestedPriceValue = 10;
        break;
      case 'Worn':
        suggestedPriceValue = 5;
        break;
      default:
        suggestedPriceValue = 0; // Or you can set a default suggestion or message if condition is unknown
        this.priceSuggestion = "Condition not recognized for price suggestion.";
        return; // Exit function if condition is not recognized
    }

    // Format the suggested price as currency (e.g., "$20")
    this.priceSuggestion = `Suggested price: $${suggestedPriceValue}`;
  }
}