import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  orderData: order[] = [];
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: string | undefined) {
    orderId &&
      this.product.deleteOrder(orderId).subscribe((result) => {
        this.getOrderList();
      });
  }
  getOrderList() {
    this.product.orderList().subscribe((result) => {
      if (Array.isArray(result)) {
        this.orderData = result;
      } else if (result) {
        this.orderData = [result];
      } else {
        this.orderData = [];
      }
    });
  }
}
