// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { OrderService } from '../order.service';

// @Component({
//   selector: 'app-order-confirmation',
//   templateUrl: './order-confirmation.component.html',
//   styleUrls: ['./order-confirmation.component.css']
// })
// export class OrderConfirmationComponent implements OnInit {
//   orderId: number = 0;
//   orderDetails: any;
//   loading: boolean = true;
//   error: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private orderService: OrderService
//   ) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.orderId = +params['orderId']; // Get orderId from route params
//       if (this.orderId) {
//         this.loadOrderDetails(this.orderId);
//       } else {
//         this.error = 'Order ID is invalid.';
//         this.loading = false;
//       }
//     });
//   }

//   loadOrderDetails(orderId: number): void {
//     this.loading = true;
//     this.error = null;
//     this.orderService.getOrderDetails(orderId).subscribe({
//       next: (data) => {
//         this.orderDetails = data.orderDetails;
//         this.loading = false;
//       },
//       error: (errorResponse) => {
//         this.error = 'Failed to load order details.';
//         console.error('Error fetching order details:', errorResponse);
//         this.loading = false;
//       }
//     });
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { OrderService } from '../order.service'; // Adjust path if necessary

// @Component({
//   selector: 'app-order-confirmation',
//   templateUrl: './order-confirmation.component.html',
//   styleUrls: ['./order-confirmation.component.css']
// })
// export class OrderConfirmationComponent implements OnInit {
//   orderId: number = 0;
//   orderDetails: any; // Type this more specifically if you have an OrderDetails interface
//   loading: boolean = true;
//   error: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private orderService: OrderService
//   ) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.orderId = +params['orderId']; // Get orderId from route parameters
//       if (this.orderId) {
//         this.loadOrderDetails(this.orderId);
//       } else {
//         this.error = 'Order ID is invalid.';
//         this.loading = false;
//       }
//     });
//   }

//   loadOrderDetails(orderId: number): void {
//     this.loading = true;
//     this.error = null;
//     this.orderService.getOrderDetails(orderId).subscribe({
//       next: (data) => {
//         this.orderDetails = data.orderDetails; // Assuming your backend response is { orderDetails: ... }
//         this.loading = false;
//       },
//       error: (errorResponse) => {
//         this.error = 'Failed to load order details.';
//         console.error('Error fetching order details:', errorResponse);
//         this.loading = false;
//       }
//     });
//   }
   // New function to update order status to "Completed"
  //  updateStatusToCompleted(): void {
  //   if (this.orderId) {
  //     this.statusUpdateMessage = 'Updating status...';
  //     this.orderService.updateOrderStatusToCompleted(this.orderId).subscribe({
  //       next: (response) => {
  //         console.log('Order status updated:', response);
  //         this.statusUpdateMessage = response.message; // Display success message
  //         // Optionally, reload order details to reflect status change
  //         this.loadOrderDetails(this.orderId);
  //       },
  //       error: (errorResponse) => {
  //         console.error('Error updating order status:', errorResponse);
  //         this.statusUpdateMessage = 'Failed to update order status.'; // Display error message
  //       }
  //     });
  //   } else {
  //     this.statusUpdateMessage = 'No order ID to update.';
  //   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
  }
}