// import { Component, Inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })(LoginComponent);
//  function LoginComponent {
//   constructor( http, router) {
//     this.http = http;
//     this.router = router;
//     this.loginData = { username: '', password: '' };
//     this.message = '';
//     this.loginError = false;
//   }

//   onSubmit() {
//     this.loginError = false;
//     this.http.post('http://localhost:4000/api/auth/login', this.loginData)
//       .subscribe({
//         next: (response) => {
//           this.message = response.message;
//           this.loginError = false;
//           this.router.navigate(['/home'], { queryParams: { username: response.username } });
//         },
//         error: (error) => {
//           console.error('Login error:', error);
//           this.message = error.error.message || 'Login failed. Please check your credentials.';
//           this.loginError = true;
//         }
//       });
//   }
// }

// // Angular-specific metadata
// LoginComponent.ɵfac = function (t) { return new (t || LoginComponent)(HttpClient, Router); };
// LoginComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({
//   type: LoginComponent,
//   selectors: [["app-login"]],
//   features: [],
//   decls: 16,
//   vars: 4,
//   consts: [],
//   template: function(rf, ctx) { /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });




// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginData = { username: '', password: '' };
//   message = '';
//   loginError = false;

//   constructor(http, router) { // Removed parameter modifiers and types
//     this.http = http;
//     this.router = router;
//   }

//   onSubmit() {
//     this.loginError = false;
//     this.http.post('http://localhost:5000/api/auth/login', this.loginData)
//       .subscribe({
//         next: (response) => {
//           this.message = response.message;
//           this.loginError = false;
//           this.router.navigate(['/home'], { queryParams: { username: response.username } });
//         },
//         error: (error) => {
//           console.error('Login error:', error);
//           this.message = error.error.message || 'Login failed. Please check your credentials.';
//           this.loginError = true;
//         }
//       });
//   }
// }

// LoginComponent.ɵfac = function (t) { return new (t || LoginComponent)(HttpClient, Router); };
// LoginComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({
//   type: LoginComponent,
//   selectors: [["app-login"]],
//   features: [ ],
//   decls: 16,
//   vars: 4,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });


// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({ // Correct decorator placement ABOVE the class
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
//  export class LoginComponent { // LoginComponent is now a CLASS
//   loginData = { username: '', password: '' }; // Initialize loginData as class property
//   message = ''; // Initialize message as class property
//   loginError = false; // Initialize loginError as class property
//   http;
//   router;

//   constructor(http, router) { // Class constructor with dependency injection
//     this.http = http;
//     this.router = router;
//   }

//   onSubmit() { // onSubmit method as class method
//     this.loginError = false;
//     const self = this;
//     this.http.post('http://localhost:5000/api/auth/login', this.loginData)
//       .subscribe({
//         next: (response) => { // Using arrow function for 'this' context or keep 'function()' and use self.message = response.message;
//           self.message = response.message;
//           self.loginError = false;
//           self.router.navigate(['/home'], { queryParams: { username: response.username } });
//         },
//         error: (error) => {
//           console.error('Login error:', error);
//           self.message = error.error.message || 'Login failed. Please check your credentials.';
//           self.loginError = true;
//         }
//       });
//   }
// }

// LoginComponent.ɵfac = function (t) { return new (t || LoginComponent)(HttpClient, Router); }; // Factory (Keep)
// LoginComponent.ɵcmp = /*@__PURE__*/ Component.ɵcmp({ // Component Definition (Keep)
//   type: LoginComponent,
//   selectors: [["app-login"]],
//   inputs: { http : "http" , router : "router" },
//   features: [ ],
//   decls: 16,
//   vars: 4,
//   consts: [ ],
//   template: function(rf, ctx){ /* ... (Angular Template Function - as before) ... */ },
//   encapsulation: 2,
//   changeDetection: 0
// });

 //export { LoginComponent };
// // client/src/app/login/login.component.ts
// import { Component } from '@angular/core';

// import { Router } from '@angular/router';
// import { LoginService } from '../login.service';
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginData = {
//     username: '',
//     password: ''
//   };
//   message: string = '';
//   loginFailed: boolean = false;

//   constructor(
//     private loginService : LoginService,
//     private router: Router
//   ) { }

//   onSubmit(): void {
//     this.loginService.login(this.loginData.username, this.loginData.password)
//       .subscribe({
//         next: (response) => {
//           console.log('Login successful', response);
//           this.message = 'Login successful!';
//           this.loginFailed = false;
//           this.router.navigate(['/books']); // Redirect to books page after login
//         },
//         error: (error) => {
//           console.error('Login failed', error);
//           this.message = 'Login failed. Please check your credentials.';
//           this.loginFailed = true; // To apply error styling
//         }
//       });
//   }
// }

// // // 
//client/src/app/login/login.component.ts
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginData = { username: '', password: '' }; // Type loginData object
//   message: string = ''; // Initialize message, type string
//   loginError: boolean = false; // Initialize loginError, type boolean

//   constructor(
//     private http: HttpClient, // Inject HttpClient
//     private router: Router     // Inject Router
//   ) {
//     // No need to assign, Angular DI handles it
//   }

//   onSubmit(): void {
//     this.loginError = false;
//     this.http.post<any>('http://localhost:4000/api/auth/login', this.loginData) // Type the response as <any> or a LoginResponse interface
//       .subscribe({
//         next: (response) => {
//           this.message = response.message;
//           this.loginError = false;
//           this.router.navigate(['/home'], { queryParams: { username: response.username } });
//         },
//         error: (error: any) => { // Type 'error' as 'any' or HttpErrorResponse
//           console.error('Login error:', error);
//           this.message = error.error.message || 'Login failed. Please check your credentials.';
//           this.loginError = true;
//         }
//       });
//    } }
// import { Component, OnInit } from '@angular/core'; // Import OnInit
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, Validators

// @Component({
//     selector: 'app-login',
//     templateUrl: './login.component.html',
//     styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit { // Implement OnInit

//     loginForm: FormGroup; // Use FormGroup for form management
//     message: string = '';
//     loginFailed: boolean = false;

//     constructor(
//         private authService: AuthService, // Correct dependency injection
//         private router: Router,
//         private formBuilder: FormBuilder // Inject FormBuilder
//     ) { }

//     ngOnInit(): void { // Initialize form in ngOnInit
//         this.loginForm = this.formBuilder.group({
//             username: ['', Validators.required], // Add validators
//             password: ['', Validators.required]  // Add validators
//         });
//     }

//     onSubmit(): void {
//         if (this.loginForm.invalid) { // Check form validity
//             return; // Do not submit if form is invalid
// //         }

// //         const username = this.loginForm.get('username')?.value; // Get values from FormGroup
// //         const password = this.loginForm.get('password')?.value; // Get values from FormGroup

// //         this.authService.login(username, password)
// //             .subscribe({
// //                 next: (response) => {
// //                     console.log('Login successful', response);
// //                     this.message = 'Login successful!';
// //                     this.loginFailed = false;
// //                     this.router.navigate(['/books']); // Redirect to books page after login
// //                 },
// //                 error: (error) => {
// //                     console.error('Login failed', error);
// //                     this.message = 'Login failed. Please check your credentials.';
// //                     this.loginFailed = true; // To apply error styling
// //                     // Optionally, handle specific error codes from the backend
// //                     if (error.status === 401) {
// //                         this.message = 'Invalid username or password.'; // More specific message for 401
// //                     } else {
// //                         this.message = 'Login failed. Please try again.'; // Generic error message
// //                     }
// //                 }
// //             });
// //     }
// // }
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service'; // Use AuthService instead of LoginService (merged for simplicity)
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   loginForm: FormGroup;
//   message: string = '';
//   loginFailed: boolean = false;

//   constructor(
//     private authService: AuthService, // Use AuthService
//     private router: Router,
//     private formBuilder: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     const username = this.loginForm.get('username')?.value;
//     const password = this.loginForm.get('password')?.value;

//     this.authService.login(username, password) // Use AuthService for login
//       .subscribe({
//         next: (response) => {
//           console.log('Login successful', response);
//           this.message = 'Login successful!';
//           this.loginFailed = false;
//           this.router.navigate(['/']); // Redirect to books page after login
//         },
//         error: (error) => {
//           console.error('Login failed', error);
//           this.message = 'Login failed. Please check your credentials.';
//           this.loginFailed = true;
//           if (error.status === 401) {
//             this.message = 'Invalid username or password.';
//           } else {
//             this.message = 'Login failed. Please try again.';
//           }
//         }
//       });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string = '';
  loginFailed: boolean = false;
  private redirectURL: string | null = null; // Store the redirect URL

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Get the redirectURL query parameter from the route
    this.route.queryParams.subscribe(params => {
      this.redirectURL = params['redirectURL'] || null; // Get redirectURL or default to null if not present
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username, password)
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.message = 'Login successful!';
          this.loginFailed = false;

          // Redirect to the stored redirectURL if it exists, otherwise to home page
          const destinationURL = this.redirectURL || '/';
          this.router.navigateByUrl(destinationURL); // Use navigateByUrl to handle relative URLs correctly
        },
        error: (error) => {
          console.error('Login failed', error);
          this.message = 'Login failed. Please check your credentials.';
          this.loginFailed = true;
          if (error.status === 401) {
            this.message = 'Invalid username or password.';
          } else {
            this.message = 'Login failed. Please try again.';
          }
        }
      });
  }
}