// // client/src/app/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private apiUrl = '/api'; // Adjust this to your backend API base URL if needed

//   constructor(private http: HttpClient) { }

//   register(username: string, password: string): Observable<any> {
//     const registrationData = {
//       username: username,
//       password: password
//     };
//     return this.http.post(`${this.apiUrl}/register`, registrationData);
//   }

//   // You can add other authentication-related methods here later (e.g., login, logout)

// }
// // client/src/app/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private apiUrl = '/api'; // Adjust if your backend API base URL is different

//   constructor(private http: HttpClient) { }

//   register(username: string, password: string, email?: string): Observable<any> { // Added optional email
//     const registrationData = {
//       username: username,
//       password: password,
//       email: email // Include email in registration data
//     };
//     return this.http.post(`${this.apiUrl}/register`, registrationData);
//   }

//   login(username: string, password: string): Observable<any> {
//     const loginData = {
//       username: username,
//       password: password
//     };
//     return this.http.post(`${this.apiUrl}/login`, loginData);
//   }
// }
// client/src/app/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs'; // Make sure 'tap' is imported
//  const baseUrl = 'http://localhost:4000/api/auth';
//     const backendBaseUrl = 'http://localhost:4000'
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//    ;
//    private apiUrl = '/api/auth'; // Adjust if needed
//   private loggedInUsername: string | null = null; // <-- VERY IMPORTANT: Is this line present?

//   constructor(private http: HttpClient) { }

//   register(username: string, password: string, email?: string): Observable<any> {
//     const registrationData = {
//       username: username,
//       password: password,
//       email: email
//     };
//     return this.http.post(`${baseUrl}/register`, registrationData);
//   }

//    login(username: string, password: string): Observable<any> {
//      const loginData = {
//        username: username,
//        password: password
//      };
//      return this.http.post(`${baseUrl}/login`, loginData).pipe(
//        tap(response => {
//          this.setLoggedInUsername(username);
//        })
//      );
//    }

//    logout(): void {
//      this.setLoggedInUsername(null);
//    }

//    setLoggedInUsername(username: string | null): void { // <-- VERY IMPORTANT: Is this method present?
//      this.loggedInUsername = username;
//    }

//    isLoggedIn(): boolean { // <-- VERY IMPORTANT: Is THIS METHOD present and spelled exactly like this?
//      return !!this.loggedInUsername;
//    }
// }
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, from, Observable, of } from 'rxjs';
// import { environment } from '../environments/environment';
// import { tap, catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private url: string = environment.url;

// //   constructor(private http: HttpClient) { }
  
  
// //   getHeaders() {
// //     return {
// //       headers: new HttpHeaders({
// //         'content-type': 'application/json',
// //       }),
// //       withCredentials: false,
// //     };
// //   }

// //   getPrivateHeaders() {
// //     return {
// //       headers: new HttpHeaders({
// //         'content-type': 'application/json',
// //         Authorization: 'Bearer ' + localStorage.getItem('token'),
// //       }),
// //       withCredentials: false,
// //     };
// //   }
  
  
// //   login(data: any): Observable<any> {
// //     return this.http
// //       .post(this.url + 'api/auth/login', data, this.getHeaders())
// //       .pipe(
// //         tap((response) => {
// //           localStorage.setItem('token', response.token);
// //         })
// //       );
// //   }
  
// //   register(data: any): Observable<any> {
// //     return this.http
// //       .post(this.url + 'auth/register', data, this.getHeaders())
// //       .pipe(
// //         tap((response) => console.log(response)),
// //         catchError(this.handleError('register'))
// //       );
// //   }
  
// //   private handleError<T>(result?: T) {
// //     return (error: any): Observable<T> => {
// //       if (error.status == 401) {
// //         console.log('NU MAI AI ACCES!');
// //       }
// //       return of(result as T);
// //     };
// //   }
  
  
// // }
// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // // import { environment } from 'src/environments/environment'; // Import environment
// // // import { environment } from 'src/environments/environment.ts';
// // import { environment } from 'src/environments/environment'; // <-- Remove '.ts' here
// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {

// //   private apiUrl = environment.apiUrl + '/auth'; // API base URL from environment + '/auth'

// //   constructor(private http: HttpClient) { }

// //   register(username: string, password: string, email?: string): Observable<any> {
// //     const registrationData = { username, password, email };
// //     return this.http.post(`${this.apiUrl}/register`, registrationData);
// //   }

// //   login(username: string, password: string): Observable<any> {
// //     const loginData = { username, password };
// //     return this.http.post(`${this.apiUrl}/login`, loginData);
// //   }
// // }
// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable, BehaviorSubject } from 'rxjs';
// // import { environment } from 'src/environments/environment';
// // import { map, tap } from 'rxjs/operators';

// // @Injectable({
// //     providedIn: 'root'
// // })
// // export class AuthService {

// //     private apiUrl = environment.apiUrl + '/auth'; // API base URL from environment + '/auth'
// //     // private loggedInUsername: string | null = null; // To store logged-in username
// //     private loggedInUsername = new BehaviorSubject<string | null>(null);
// //     constructor(private http: HttpClient) {
// //         // No token handling - session-based auth
// //     }


// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable, BehaviorSubject } from 'rxjs';
// // import { environment } from 'src/environments/environment';
// // import { map } from 'rxjs/operators';
// // import { Router } from '@angular/router';

// // const backendUrl = environment.apiUrl; // Use apiUrl from environment

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {
// //   private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Initially set to false (or based on initial check)
// //   isLoggedIn$ = this.isLoggedInSubject.asObservable();

// //   constructor(private http: HttpClient, private router: Router) {
// //     this.checkInitialLoginStatus(); // Call check on service initialization
// //   }

// //   private checkInitialLoginStatus(): void {
// //     // Call session-status endpoint to check initial login state on app load
// //     this.http.get(`${backendUrl}/auth/session-status`).subscribe({
// //       next: (response: any) => { // Adjust type of response if needed
// //         // Assuming backend returns something like { isLoggedIn: true/false } in response
// //         this.isLoggedInSubject.next(response.isLoggedIn === true); // Update based on backend response
// //       },
// //       error: (error) => {
// //         // If session-status check fails (e.g., 401, 404), assume not logged in initially
// //         console.warn('Initial session status check failed, assuming not logged in', error);
// //         this.isLoggedInSubject.next(false); // Default to not logged in on error
// //       }
// //     });
// //   }

// //     register(username: string, password: string, email?: string): Observable<any> { // **register Function - UNCHANGED**
// //         const registrationData = { username, password, email };
// //         return this.http.post(`${backendUrl}/auth/register`, registrationData);
// //     }
// //   login(username: string, password: string): Observable<any> {
// //     return this.http.post(`${backendUrl}/auth/login`, { username, password }).pipe(
// //       map((response: any) => { // Adjust type of response if needed
// //         // After successful login, backend likely sets a session cookie automatically.
// //         // We just need to update isLoggedInSubject to true on frontend.
// //         this.isLoggedInSubject.next(true);
// //         return response; // Return the response from login endpoint
// //       })
// //     );
// //   }

// //   logout(): void {
// //     // Call backend logout endpoint to invalidate session (and possibly clear cookie)
// //     this.http.post(`${backendUrl}/auth/logout`, {}).subscribe({ // Or http.get if logout is a GET request
// //       next: (response) => {
// //         this.isLoggedInSubject.next(false); // Update isLoggedInSubject to false after successful logout
// //         this.router.navigate(['/']); // Redirect to home
// //       },
// //       error: (error) => {
// //         console.error('Logout request failed', error);
// //         // Even if logout request fails, still try to update frontend state to logged out
// //         this.isLoggedInSubject.next(false);
// //         this.router.navigate(['/']); // Still redirect to home (logout attempt)
// //       }
// //     });
// //   }

// //   isLoggedIn(): boolean {
// //     return this.isLoggedInSubject.value;
// //   }
// // }
// // //     login(username: string, password: string): Observable<any> { // **login Function - UNCHANGED**
// // //         const loginData = { username, password };
// // //         return this.http.post(`${this.apiUrl}/login`, loginData);
// // //     }
// // //     logout(): Observable<any> {
// // //         return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
// // //               tap(() => {
// // //         this.loggedInUsername.next(null);
// // //               })
// // //             );
// // //           }
         
// // //           isLoggedIn(): Observable<boolean> {
// // //             return this.http.get<{ loggedIn: boolean }>(`${this.apiUrl}/session-status`).pipe(
// // //               map(response => response.loggedIn === true)
// // //             );
// // //           }
         
// //           getUsernameObservable(): Observable<string | null> {
// //             return this.loggedInUsername.asObservable();
// //           }
         
// //           setLoggedInUsername(username: string): void {
// //         this.loggedInUsername.next(username);
// //           }
// //           getOrderHistory(): Observable<any> { // New method to fetch order history
// //                     return this.http.get<any>(`${this.apiUrl}/orders/history`); // Make GET request to backend endpoint
// //                  }
// //         }
// // //     logout(): Observable<any> {
// // //         return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}); // Call backend logout endpoint
// // //     }

// // //     isLoggedIn(): Observable<boolean> {
// // //         return this.http.get<{ loggedIn: boolean }>(`${this.apiUrl}/session-status`) // Call backend session-status endpoint
// // //             .pipe(
// // //                 map(response => {
// // //                     return response.loggedIn === true; // Return boolean login status
// // //                 })
// // //             );
// // //     }

// // //     getUsername(): string | null {
// // //         return this.loggedInUsername;
// // //     }

// //     setLoggedInUsername(username: string) {
// //         this.loggedInUsername = username;
// //     }
// //     getOrderHistory(): Observable<any> { // New method to fetch order history
// //         return this.http.get<any>(`${this.apiUrl}/orders/history`); // Make GET request to backend endpoint
// //     }
// // }
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { map } from 'rxjs/operators';
// import { Router } from '@angular/router';

// const backendUrl = environment.apiUrl; // Use apiUrl from environment

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Initially set to false
//   isLoggedIn$ = this.isLoggedInSubject.asObservable();
//   private usernameSubject = new BehaviorSubject<string>(''); // For username display
//   username$ = this.usernameSubject.asObservable();


//   constructor(private http: HttpClient, private router: Router) {
//    // this.checkInitialLoginStatus(); // Call check on service initialization
//   }
//   sessionStatus(): Observable<any> {
//     return this.http.get(`${backendUrl}/session-status`, { withCredentials: true }); // **Correct URL**
//   }

// //   private checkInitialLoginStatus(): void {
// //     // Call session-status endpoint to check initial login state on app load
// //     this.http.get(`${backendUrl}/auth/session-status`).subscribe({
// //       next: (response: any) => { // Adjust type of response if needed
// //         // Assuming backend returns something like { loggedIn: true/false, username?: string }
// //         this.isLoggedInSubject.next(response.loggedIn === true); // Update login status
// //         if (response.loggedIn === true && response.username) {
// //           this.usernameSubject.next(response.username); // Update username if logged in
// //         } else {
// //           this.usernameSubject.next(''); // Clear username if not logged in
// //         }
// //       },
// //       error: (error) => {
// //         // If session-status check fails, assume not logged in initially
// //         console.warn('Initial session status check failed, assuming not logged in', error);
// //         this.isLoggedInSubject.next(false); // Default to not logged in
// //         this.usernameSubject.next(''); // Clear username on error
// //       }
// //     });
// //   }
//     register(username: string, password: string, email?: string): Observable<any> { // **register Function - UNCHANGED**
//         const registrationData = { username, password, email };
//         return this.http.post(`${backendUrl}/auth/register`, registrationData);
//     }
//     login(username: string, password: string): Observable<any> {
//         return this.http.post(`${backendUrl}/auth/login`, { username, password }, { withCredentials: true }).pipe( ... );
//       }
//     // login(username: string, password: string): Observable<any> {
//     //     return this.http.post(`${backendUrl}/auth/login`, { username, password }, { withCredentials: true }).pipe(
//     //       map((response: any) => { // Use map operator from rxjs/operators
//     //         this.isLoggedInSubject.next(true);
//     //         this.usernameSubject.next(username);
//     //         return response;
//     //       })
//     //     );
//     //   }
//     // login(username: string, password: string): Observable<any> { // **login Function - UNCHANGED**
//     //              const loginData = { username, password };
//     //              return this.http.post(`${backendUrl}/auth/login`, loginData);
//     //        }
// //   login(username: string, password: string): Observable<any> {
// //     return this.http.post(`${backendUrl}/auth/login`, { username, password }, { withCredentials: true }).pipe( // **withCredentials: true is important**
// //       map((response: any) => { // Adjust type of response if needed
// //         // After successful login, backend likely sets a session cookie automatically.
// //         // We just need to update isLoggedInSubject to true on frontend.
// //         this.isLoggedInSubject.next(true);
// //         this.usernameSubject.next(username); // Store username on login
// //         return response; // Return the response from login endpoint
// //       })
// //     );
// //   }
// logout(): void {
//     this.http.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true }).subscribe(() => {
//       this.isLoggedInSubject.next(false);
//       this.usernameSubject.next('');
//       this.router.navigate(['/']);
//     });
//   }
// //   logout(): void {
// //     // Call backend logout endpoint to invalidate session (and possibly clear cookie)
// //     this.http.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true }).subscribe({ // **withCredentials: true for logout too**
// //       next: (response) => {
// //         this.isLoggedInSubject.next(false); // Update isLoggedInSubject to false after successful logout
// //         this.usernameSubject.next(''); // Clear username on logout
// //         this.router.navigate(['/']); // Redirect to home
// //       },
// //       error: (error) => {
// //         console.error('Logout request failed', error);
// //         // Even if logout request fails, still try to update frontend state to logged out
// //         this.isLoggedInSubject.next(false);
// //         this.usernameSubject.next(''); // Clear username on logout in case of error too
// //         this.router.navigate(['/']); // Still redirect to home (logout attempt)
// //       }
// //     });
// //   }

//   isLoggedIn(): boolean {
//     return this.isLoggedInSubject.value;
//   }

//   getUsername(): Observable<string> { // Expose username as observable
//     return this.usernameSubject.asObservable();
//   }
 
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const backendUrl = environment.apiUrl; // Backend base URL from environment
//const backendUrl = '/api';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // --- Login Status tracking ---
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Initial state: not logged in
  isLoggedIn$ = this.isLoggedInSubject.asObservable();           // Observable for login status changes

  // --- Username tracking ---
  private usernameSubject = new BehaviorSubject<string>('');      // Initial state: no username
  username$ = this.usernameSubject.asObservable();              // Observable for username changes

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkInitialSessionStatus(); // Check session status when AuthService is initialized
  }

  // --- Session Status Check (on app init) ---
  private checkInitialSessionStatus(): void {
    this.sessionStatus().pipe( // Call sessionStatus() to check backend session
      tap(response => { // Use tap to perform side effects (update state) without changing response
        if (response && response.loggedIn) {
          // If backend says logged in
          this.isLoggedInSubject.next(true);               // Update isLoggedIn to true
          this.usernameSubject.next(response.username || ''); // Set username from response (if available)
        } else {
          // If backend says not logged in
          this.isLoggedInSubject.next(false);              // Update isLoggedIn to false
          this.usernameSubject.next('');                  // Clear username
        }
      })
    ).subscribe({ // Subscribe to the Observable chain to trigger the HTTP request
      error: () => {
        // If session status check fails (e.g., 404, backend error)
        this.isLoggedInSubject.next(false);              // Assume not logged in
        this.usernameSubject.next('');                  // Clear username
        console.warn('Initial session status check failed, assuming not logged in.');
      }
    });
  }
  register(username: string, password: string, email?: string): Observable<any> { // **register Function - UNCHANGED**
             const registrationData = { username, password, email };
             return this.http.post(`${backendUrl}/auth/register`, registrationData);
         }
         login(username: string, password: string): Observable<any> {
            return this.http.post(`${backendUrl}/auth/login`, { username, password }, { withCredentials: true }).pipe(
              map((response: any) => {
                this.isLoggedInSubject.next(true);
                this.usernameSubject.next(username);
                return response;
              })
            );
          }
  // --- Session Status Endpoint Call ---
  sessionStatus(): Observable<any> {
    return this.http.get(`${backendUrl}/session-status`, { withCredentials: true }); // GET to session status endpoint
  }
  logout(): void {
        this.http.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true }).subscribe(() => { // POST to logout endpoint
          this.isLoggedInSubject.next(false);              // Update isLoggedIn to false
          this.usernameSubject.next('');                  // Clear username
          this.router.navigate(['/login']);                 // Redirect to login page after logout
        });
    }
  // --- Logout ---
//   logout(): void {
//     this.http.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true }).subscribe(() => { // POST to logout endpoint
//       this.isLoggedInSubject.next(false);              // Update isLoggedIn to false
//       this.usernameSubject.next('');                  // Clear username
//       this.router.navigate(['/']);                      // Redirect to home page after logout
//     });
//   }

//   // --- Synchronous Login Status Check ---
//   isLoggedIn(): boolean {
//     return this.isLoggedInSubject.value; // Get current login status from BehaviorSubject
//   }
isLoggedIn(): boolean {
    const isLoggedInValue = this.isLoggedInSubject.value; // Get current login status from BehaviorSubject
    console.log('AuthService: isLoggedIn() called - returning:', isLoggedInValue); // ADD THIS LOG
    return isLoggedInValue;
  }
  // --- Get Username Observable ---
  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable(); // Expose username as Observable for components to subscribe
  }
}