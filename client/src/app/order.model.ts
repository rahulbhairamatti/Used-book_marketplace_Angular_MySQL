// order.model.ts
export interface Order {
    order_id: string;
    order_date: string;
    total_amount: number;
    payment_method: string;
    orderItems: OrderItem[];
    shipping_city: string;
  }
  
  export interface OrderItem {
    product_title: string;
    quantity: number;
    price_at_purchase: number;
  }
  