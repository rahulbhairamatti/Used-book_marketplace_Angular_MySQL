// import { Injectable, inject } from '@angular/core'; // Import 'inject'
// import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'; // Import CanActivateFn
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';
// import { map } from 'rxjs/operators';
// // Export a function, not a class (Functional Guard)
// export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
//     const authService = inject(AuthService); // Inject AuthService using 'inject' function
//     const router = inject(Router); // Inject Router using 'inject' function

//     return authService.isLoggedIn().pipe( // Use isLoggedIn() which now returns Observable<boolean>
//         map(loggedIn => { // Use map operator to process the boolean value from Observable
//             if (loggedIn) {
//                 return true; // Allow access to the route
//             } else {
//                 // Not logged in, redirect to login page with the attempted URL
//                 return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } }); // Redirect and return UrlTree
//             }
//         })
//     );
// };
// // client/src/app/auth-guard.service.ts
// // 
// // client/src/app/auth-guard.service.ts
// import { Injectable, inject } from '@angular/core'; // Import 'inject'
// import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'; // Import CanActivateFn
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// // Export a function, not a class
// export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
//   const authService = inject(AuthService); // Inject AuthService using 'inject' function
//   const router = inject(Router); // Inject Router using 'inject' function

//   if (authService.isLoggedIn()) {
//     return true; // Allow access to the route
//   } else {
//     // Not logged in, redirect to login page with the attempted URL
//     return router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Redirect and return UrlTree
//   }
// };
// client/src/app/auth-guard.service.ts
// import { Injectable, inject } from '@angular/core';
// import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   console.log('AuthGuard: canActivate for route:', state.url); // Make sure you have THIS log

//   if (authService.isLoggedIn()) {
//     console.log('AuthGuard: isLoggedIn() returned true - allowing access'); // Make sure you have THIS log
//     return true; // Allow access
//   } else {
//     console.log('AuthGuard: isLoggedIn() returned false - redirecting to login'); // Make sure you have THIS log
//     return router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Redirect
//   }
// };

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Make sure path to your AuthService is correct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard { // Implement CanActivate interface (class-based)

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('AuthGuard (Class-Based): canActivate for route:', state.url); // Keep logging for debugging

    if (this.authService.isLoggedIn()) { // Use your AuthService's isLoggedIn method
      console.log('AuthGuard (Class-Based): isLoggedIn() returned true - allowing access');
      return true; // Allow access
    } else {
      console.log('AuthGuard (Class-Based): isLoggedIn() returned false - redirecting to login');
      return this.router.parseUrl('/login'); // Redirect to login using Router.parseUrl (UrlTree)
      // Alternatively, you can use:  return this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}