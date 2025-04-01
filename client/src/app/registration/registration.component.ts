// // client/src/app/registration/registration.component.ts
// // import { Component } from '@angular/core';
// // import { AuthService } from '../auth.service'; // Assuming you'll create an AuthService for registration/auth
// // import { Router } from '@angular/router'; // To navigate after successful registration

// // @Component({
// //   selector: 'app-registration',
// //   templateUrl: './registration.component.html',
// //   styleUrls: ['./registration.component.css']
// // })
// // export class RegistrationComponent {
// //   registrationData = {
// //     username: '',
// //     password: '' // For simplicity, we'll start with username and password. Add email, etc., later if needed.
// //   };
// //   message: string = '';
// //   isRegistered: boolean = false; // To track if registration was successful

// //   constructor(
// //     private authService: AuthService, // Inject AuthService (you'll create this service)
// //     private router: Router // Inject Router for navigation
// //   ) { }

// //   onSubmit(): void {
// //     this.authService.register(this.registrationData.username, this.registrationData.password)
// //       .subscribe({
// //         next: (response) => {
// //           console.log('Registration successful', response);
// //           this.message = 'Registration successful! You can now log in.';
// //           this.isRegistered = true; // Set registration success flag
// //           // Optionally, redirect to login page after successful registration
// //           // this.router.navigate(['/login']);
// //         },
// //         error: (error) => {
// //           console.error('Registration failed', error);
// //           this.message = 'Registration failed. Please try again.'; // More specific error handling from backend would be better
// //           this.isRegistered = false;
// //         }
// //       });
// //   }
// // }
// // client/src/app/registration/registration.component.ts
// // import { Component } from '@angular/core';
// // import { AuthService } from '../auth.service';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-registration',
// //   templateUrl: './registration.component.html',
// //   styleUrls: ['./registration.component.css']
// // })
// // export class RegistrationComponent {
// //   registrationData = {
// //     username: '',
// //     password: ''
// //   };
// //   message: string = '';
// //   isRegistered: boolean = false;

// //   constructor(
// //     private authService: AuthService,
// //     private router: Router
// //   ) { }

// //   onSubmit(): void {
// //     this.authService.register(this.registrationData.username, this.registrationData.password)
// //       .subscribe({
// //         next: (response) => {
// //           console.log('Registration successful', response);
// //           this.message = 'Registration successful! You can now log in.';
// //           this.isRegistered = true;
// //           this.router.navigate(['/login']); // Redirect to login after successful registration
// //         },
// //         error: (error) => {
// //           console.error('Registration failed', error);
// //           this.message = 'Registration failed. Please try again.';
// //           this.isRegistered = false;
// //         }
// //       });
// //   }
// // }
// // client/src/app/registration/registration.component.ts
// // import { Component } from '@angular/core';
// // import { AuthService } from '../auth.service';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-registration',
// //   templateUrl: './registration.component.html',
// //   styleUrls: ['./registration.component.css']
// // })
// // export class RegistrationComponent {
// //   registrationData = {
// //     username: '',
// //     password: '',
// //     email: '' // <-- Make sure 'email' property is here and initialized (e.g., to '')
// //   };
// //   message: string = '';
// //   registrationFailed: boolean = false;

// //   constructor(
// //     private authService: AuthService,
// //     private router: Router
// //   ) { }

// //   onSubmit(): void {
// //     this.authService.register(
// //       this.registrationData.username,
// //       this.registrationData.password,
// //       this.registrationData.email // <-- Pass registrationData.email to the register function
// //     )
// //     .subscribe({
// //       next: (response) => {
// //         console.log('Registration successful', response);
// //         this.message = 'Registration successful! Please log in.';
// //         this.registrationFailed = false;
// //         // Optionally redirect to login page after successful registration
// //         this.router.navigate(['/login']);
// //       },
// //       error: (error) => {
// //         console.error('Registration failed', error);
// //         this.message = 'Registration failed. Please try again.';
// //         this.registrationFailed = true;
// //       }
// //     });
// //   }
// // }
// // import { Component, OnInit } from '@angular/core'; // Import OnInit
// // import { AuthService } from '../auth.service';
// // import { Router } from '@angular/router';
// // import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, Validators
// // import { ReactiveFormsModule } from '@angular/forms';
// // @Component({
// //     selector: 'app-registration',
// //     templateUrl: './registration.component.html',
// //     styleUrls: ['./registration.component.css']
// // })
// // export class RegistrationComponent implements OnInit { // Implement OnInit

// //     registrationForm: FormGroup; // Use FormGroup for form management
// //     message: string = '';
// //     registrationFailed: boolean = false;

// //     constructor(
// //         private authService: AuthService,
// //         private router: Router,
// //         private formBuilder: FormBuilder // Inject FormBuilder
// //     ) { }

// //     ngOnInit(): void { // Initialize form in ngOnInit
// //         this.registrationForm = this.formBuilder.group({
// //             username: ['', Validators.required], // Add validators
// //             password: ['', Validators.required], // Add validators
// //             email: ['', [Validators.email]]      // Add email validator (optional)
// //         });
// //     }

// //     onSubmit(): void {
// //         if (this.registrationForm.invalid) { // Check form validity
// //             return; // Do not submit if form is invalid
// //         }

// //         const username = this.registrationForm.get('username')?.value; // Get values from FormGroup
// //         const password = this.registrationForm.get('password')?.value; // Get values from FormGroup
// //         const email = this.registrationForm.get('email')?.value;       // Get values from FormGroup

// //         this.authService.register(username, password, email)
// //             .subscribe({
// //                 next: (response) => {
// //                     console.log('Registration successful', response);
// //                     this.message = 'Registration successful! Please log in.';
// //                     this.registrationFailed = false;
// //                     this.router.navigate(['/login']); // Optionally redirect to login page after successful registration
// //                 },
// //                 error: (error) => {
// //                     console.error('Registration failed', error);
// //                     this.message = 'Registration failed. Please try again.';
// //                     this.registrationFailed = true;
// //                     // Optionally handle specific error codes from the backend
// //                     if (error.status === 409) {
// //                         this.message = 'Username already taken. Please choose a different username.'; // More specific message for 409
// //                     } else {
// //                         this.message = 'Registration failed. Please try again.'; // Generic error message
// //                     }
// //                 }
// //             });
// //     }
// // }
// // import { Component, OnInit } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { AuthService } from '../auth.service';

// // @Component({
// //   selector: 'app-register',
// //   templateUrl: './registration.component.html',
// //   styleUrls: ['./registration.component.css'],
// // })
// // export class RegistrationComponent implements OnInit {
// //   public user: any = {};
// //   constructor(private authService: AuthService, private router: Router) {}

// //   ngOnInit(): void {}

// //   register() {
// //     console.log(this.user);
// //     const { name, email, password, confirm_password } = this.user;
// //     const data = {
// //       name,
// //       email,
// //       passwords: {
// //         password,
// //         confirm_password,
// //       },
// //     };

// //     this.authService.register(data).subscribe((res) => {
// //       console.log(res);
// //       if (res && res.doc._id) {
// //         this.router.navigate(['/login']);
// //       }
// //     });
// //   }

// //   isValid() {
// //     const { name, email, password, confirm_password } = this.user;
// //     return !(name && email && password && confirm_password);
// //   }

// //   validateEmail(mail: string) {
// //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
// //       return true;
// //     }
// //     return false;
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service'; // Use AuthService
// import { Router } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent implements OnInit {

//   registrationForm: FormGroup;
//   message: string = '';
//   registrationFailed: boolean = false;

//   constructor(
//     private authService: AuthService, // Use AuthService
//     private router: Router,
//     private formBuilder: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.registrationForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.registrationForm.invalid) {
//       return;
//     }

//     const username = this.registrationForm.get('username')?.value;
//     const password = this.registrationForm.get('password')?.value;
//     const email = this.registrationForm.get('email')?.value;

//     this.authService.register(username, password, email) // Use AuthService for registration
//       .subscribe({
//         next: (response) => {
//           console.log('Registration successful', response);
//           this.message = 'Registration successful! Please log in.';
//           this.registrationFailed = false;
//           this.router.navigate(['/login']); // Redirect to login after registration
//         },
//         error: (error) => {
//           console.error('Registration failed', error);
//           this.message = 'Registration failed. Please try again.';
//           this.registrationFailed = true;
//           if (error.status === 409) {
//             this.message = 'Username already taken. Please choose a different username.';
//           } else {
//             this.message = 'Registration failed. Please try again.';
//           }
//         }
//       });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  message: string = '';
  registrationFailed: boolean = false;
  isRegistered: boolean = false; // ADD THIS LINE: Declare isRegistered property**

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const username = this.registrationForm.get('username')?.value;
    const password = this.registrationForm.get('password')?.value;

    this.authService.register(username, password)
      .subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.message = 'Registration successful!';
          this.registrationFailed = false;
          this.isRegistered = true; // Set isRegistered to true on successful registration**
          // Optionally, redirect after successful registration
         this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.message = 'Registration failed. Please try again.';
          this.registrationFailed = true;
          this.isRegistered = false; // Ensure isRegistered is false on registration failure
          if (error.status === 409) {
            this.message = 'Username already taken. Please choose a different username.';
          }
        }
      });
  }
}