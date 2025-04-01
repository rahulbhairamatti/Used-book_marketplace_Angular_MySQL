// client/src/app/home/home.component.js
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })(HomeComponent); // Apply Component decorator

// function HomeComponent(route) { // Constructor
//   this.route = route;
//   this.username = null; // Initialize username
// }

// HomeComponent.prototype = {
//   constructor: HomeComponent,
//   ngOnInit: function() {
//     var self = this;
//     this.route.queryParams.subscribe(function(params) {
//       self.username = params['username'] || null;
//     });
//   }
// };


// HomeComponent.ɵfac = function (t) { return new (t || HomeComponent)(ActivatedRoute); }; // Factory
// HomeComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition
//   type: HomeComponent,
//   selectors: [["app-home"]],
//    NgOnChangesFeature: false, ngOnDestroy: null, ngDoCheck: null, ngAfterContentInit: null, ngAfterContentChecked: null, ngAfterViewInit: null, ngAfterViewChecked: null, ɵprov: undefined, changeDetection: 0,
//   inputs: { route : "route" },
//   features: [  ],
//   decls: 9,
//   vars: 1,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });

//  export { HomeComponent };
// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';

// // @Component({ // Correct decorator placement ABOVE the class
// //   selector: 'app-home',
// //   templateUrl: './home.component.html',
// //   styleUrls: ['./home.component.css']
// // })
// // export class HomeComponent { // HomeComponent is now a CLASS
// //   username = null; // Initialize username as class property
// //   route;

// //   constructor(route) { // Class constructor with dependency injection
// //     this.route = route;
// //   }
// client/src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Correct import

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string | null = null; // Initialize username, type string or null

  constructor(private route: ActivatedRoute) { // Inject ActivatedRoute
    // No need to assign, Angular DI handles it
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || null;
    });
  }
}
//   ngOnInit() { // ngOnInit lifecycle hook as class method
//     const self = this;
//     this.route.queryParams.subscribe(params => { // Using arrow function for 'this' context or keep 'function(params)' and use self.username = params['username'] || null;
//       self.username = params['username'] || null;
//     });
//   }
// }

// HomeComponent.ɵfac = function (t) { return new (t || HomeComponent)(ActivatedRoute); }; // Factory (Keep)
// HomeComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition (Keep)
//   type: HomeComponent,
//   selectors: [["app-home"]],
//   inputs: { route : "route" },
//   features: [ ],
//   decls: 9,
//   vars: 1,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });

 //export { HomeComponent };
//  import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent { // Removed: implements OnInit
//   username = null;

//   constructor(route) { // Removed parameter modifiers and types
//     this.route = route;
//   }

//   ngOnInit() { // Kept ngOnInit method, just removed 'implements OnInit' from class
//     const self = this;
//     this.route.queryParams.subscribe(params => {
//       self.username = params['username'] || null;
//     });
//   }
// }

// HomeComponent.ɵfac = function (t) { return new (t || HomeComponent)(ActivatedRoute); };
// HomeComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({
//   type: HomeComponent,
//   selectors: [["app-home"]],
//   features: [ ],
//   decls: 9,
//   vars: 1,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });