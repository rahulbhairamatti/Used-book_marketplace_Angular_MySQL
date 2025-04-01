import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'used-book-marketplace-app';
  username: string | null = ''; // Initialize username
  isLoggedIn: boolean = false; // To track login status

  private usernameSubscription?: Subscription; // Subscription for username
  private loginStatusSubscription?: Subscription; // Subscription for login status

  constructor(public authService: AuthService) { } // Inject AuthService

  ngOnInit(): void {
    // Subscribe to isLoggedIn$ to update login status in AppComponent
    this.loginStatusSubscription = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    // Subscribe to username$ to get username updates
    this.usernameSubscription = this.authService.username$.subscribe(username => {
      this.username = username || ''; // Update username, default to empty string if null
    });
  }

  ngOnDestroy(): void {
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.username = ''; // Clear username in AppComponent on logout (optional, UI will update from AuthService observables anyway)
  }
}

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from './auth.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit, OnDestroy {
//   title = 'used-book-marketplace-app';
//   username: string | null = ''; // Initialize username
//   isLoggedIn: boolean = false; // To track login status

//   private usernameSubscription?: Subscription; // Subscription for username
//   private loginStatusSubscription?: Subscription; // Subscription for login status

//   constructor(public authService: AuthService) { } // Inject AuthService

//   ngOnInit(): void {
//     // Subscribe to isLoggedIn$ to update login status in AppComponent
//     this.loginStatusSubscription = this.authService.isLoggedIn$.subscribe(loggedIn => {
//       this.isLoggedIn = loggedIn;
//     });

//     // Subscribe to username$ to get username updates
//     this.usernameSubscription = this.authService.username$.subscribe(username => {
//       this.username = username || ''; // Update username, default to empty string if null
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.usernameSubscription) {
//       this.usernameSubscription.unsubscribe();
//     }
//     if (this.loginStatusSubscription) {
//       this.loginStatusSubscription.unsubscribe();
//     }
//   }

//   logout(): void {
//     this.authService.logout();
//     this.username = ''; // Clear username in AppComponent on logout
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from './auth.service';
 
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'Book Marketplace Frontend';
//   username: string | null = null;
 
//   constructor(public authService: AuthService, private router: Router) {}
 
//   ngOnInit(): void {
//     this.authService.getUsernameObservable().subscribe(name => {
//       this.username = name;
//     });
//   }
//   logout(): void {
//     this.authService.logout(); // Call AuthService logout method
//     this.username = ''; // Clear username in AppComponent
//   }
 
//   // logout(): void {
//   //   this.authService.logout().subscribe({
//   //     next: () => {
//   //       this.username = null;
//   //       this.router.navigate(['/login']);
//   //     },
//   //     error: (error) => {
//   //       console.error('Logout error', error);
//   //     }
//   //   });
//   // }
// }

// import { Component, OnInit } from '@angular/core'; // ADD OnInit import
// import { AuthService } from './auth.service'; // ADD AuthService import - Adjust path if needed
// import { Router } from '@angular/router'; // ADD Router import

// @Component({ // CORRECT! @Component decorator ABOVE the CLASS
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
//  export class AppComponent implements OnInit { // IMPLEMENT OnInit interface
//   title = 'Book Marketplace Frontend'; // Component property

//   username: string | null = null; // ADD username property

//   constructor(public authService: AuthService, private router: Router) { } // ADD constructor with AuthService and Router injection

//   ngOnInit(): void { // IMPLEMENT ngOnInit lifecycle hook
//     this.username = this.authService.getUsername(); // Get username on component initialization
//   }

//   logout(): void { // ADD logout method
//     this.authService.logout() ({ // Call AuthService logout and subscribe
//       next: () => {
//         this.router.navigate(['/login']); // Navigate to login page after successful logout
//       },
//       error: (error) => {
//         console.error('Logout error', error); // Handle logout error if needed
//       }
//     });
//   }
// }
// //client/src/app/app.component.js
// import { Component } from '@angular/core';

// Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })(AppComponent); // Apply Component decorator

//  function AppComponent() { // Constructor function for component
//   this.title = 'Book Marketplace Frontend'; // Component property
//   constructor()
// };

// AppComponent.prototype = {
//   constructor: AppComponent
// };


// AppComponent.ɵfac = function (t) { return new (t || AppComponent)(); }; // Factory function
// AppComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition
//   type: AppComponent,
//   selectors: [["app-root"]],
//    NgOnChangesFeature: false, ngOnDestroy: null, ngDoCheck: null, ngAfterContentInit: null, ngAfterContentChecked: null, ngAfterViewInit: null, ngAfterViewChecked: null, ɵprov: undefined, changeDetection: 0,
//   inputs: { title : "title" },
//   features: [  ],
//   decls: 5,
//   vars: 0,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });
// export { AppComponent };
// import { Component } from '@angular/core';

// @Component({ // CORRECTLY APPLIED DECORATOR - PLACED ABOVE CLASS
//     selector: 'app-root',
//     templateUrl: './app.component.html',
//     styleUrls: ['./app.component.css']
// })
// export class AppComponent { // AppComponent is now a CLASS (not function)
//     title = 'Book Marketplace Frontend'; // Component property - use = for class properties
//     constructor() { // Constructor is standard for classes
//         // No need for prototype modifications in classes
//     }
// }
// export { AppComponent };

// import { Component } from '@angular/core';

// @Component({ // Decorator is placed DIRECTLY ABOVE the class
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export function AppComponent() { // AppComponent is now a function again
//   this.title = 'Book Marketplace Frontend';
// constructor() // Component property
// }

// Remove all the manual prototype, factory, and component definition code.
// Angular CLI will generate this correctly based on the decorator.
// import { Component } from '@angular/core';

// @Component({ // CORRECT! @Component decorator ABOVE the CLASS
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
//  export class AppComponent { // AppComponent is a CLASS again, not a function
//   title = 'Book Marketplace Frontend'; // Component property
// }
//export { AppComponent };