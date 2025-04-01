// client/src/app/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4000/api/products';
const backendBaseUrl = 'http://localhost:4000';
//const baseUrl ='/api/products';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // create(data: any): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data); // <-- Is this line EXACTLY like this?
}
  getImageUrl(imagePath: string): string {
    return `${backendBaseUrl}${imagePath}`;
  }
}

// // client/src/app/book.service.ts  <-- IMPORTANT: File extension must be .ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// const baseUrl = 'http://localhost:4000/api/products';
// const backendBaseUrl = 'http://localhost:4000';

// @Injectable({ // <-- Correct decorator placement ABOVE the class
//   providedIn: 'root'
// })
// export class BookService { // <-- Defined as a CLASS using 'class' keyword

//   constructor(private http: HttpClient) { // <-- Constructor in TypeScript class
//     // No need to assign, Angular DI handles it
//   }

//   getAll(): Observable<any> { // <-- Methods as class members
//     return this.http.get(baseUrl);
//   }

//   get(id: any): Observable<any> {
//     return this.http.get(`${baseUrl}/${id}`);
//   }

//   create(data: any): Observable<any> {
//     return this.http.post(baseUrl, data);
//   }

//   getImageUrl(imagePath: string): string {
//     return `${backendBaseUrl}${imagePath}`;
//   }
// }
// // client/src/app/book.service.js
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// const baseUrl = 'http://localhost:4000/api/products'; // Backend API URL  <-- CHANGED to 4000
// const backendBaseUrl = 'http://localhost:4000'; // Base URL for backend  <-- CHANGED to 4000

// Injectable({
//   providedIn: 'root'
// })(BookService); // Apply Injectable decorator

// function BookService(http) { // Constructor
//   this.http = http;

//   this.getAll = function() {
//     return this.http.get(baseUrl);
//   };

//   this.get = function(id) {
//     return this.http.get(`${baseUrl}/${id}`);
//   };

//   this.create = function(data) {
//     return this.http.post(baseUrl, data);
//   };

//   this.getImageUrl = function(imagePath) {
//     return `${backendBaseUrl}${imagePath}`;
//   };
// }

// BookService.prototype = {
//   constructor: BookService,
//   getAll: BookService.prototype.getAll,
//   get: BookService.prototype.get,
//   create: BookService.prototype.create,
//   getImageUrl: BookService.prototype.getImageUrl
// };


// BookService.ɵfac = function (t) { return new (t || BookService)(HttpClient); }; // Factory Function (for Angular DI)
// BookService.ɵprov = /*@__PURE__*/ Injectable.ɵprov({ token: BookService, factory: BookService.ɵfac, providedIn: 'root' }); // Provider definition


//  export { BookService };
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// const baseUrl = 'http://localhost:4000/api/products'; // Backend API URL  <-- CHANGED to 4000 (Keep this if it's your backend port)
// const backendBaseUrl = 'http://localhost:4000'; // Base URL for backend  <-- CHANGED to 4000 (Keep this if it's your backend port)

// @Injectable({ // Correct decorator placement ABOVE the class
//   providedIn: 'root'
// })
// export class BookService { // BookService is now a CLASS
  

//   constructor(http) { // Class constructor with dependency injection
//     this.http = http;
//   }

//   getAll() { // getAll method as class method
//     return this.http.get(baseUrl);
//   }

//   get(id) { // get method as class method
//     return this.http.get(`${baseUrl}/${id}`);
//   }

//   create(data) { // create method as class method
//     return this.http.post(baseUrl, data);
//   }

//   getImageUrl(imagePath) { // getImageUrl method as class method
//     return `${backendBaseUrl}${imagePath}`;
//   }
// }

// BookService.ɵfac = function (t) { return new (t || BookService)(HttpClient); }; // Factory Function (for Angular DI) (Keep)
// BookService.ɵprov = /*@__PURE__*/ Injectable.ɵprov({ token: BookService, factory: BookService.ɵfac, providedIn: 'root' }); // Provider definition (Keep)

//  //export { BookService };