import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData = Object.values(result);
      this.updatePriceSummary();
    });
  }

  removeCart(cartId: number) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    this.product.removeToCart(cartId).subscribe(() => {
      this.product.currentCart().subscribe((cartItems) => {
        const updatedCart = Object.values(cartItems);
        this.cartData = updatedCart;
        this.updatePriceSummary();
        this.product.cartData.emit(updatedCart);
      });
    });
  }

  updatePriceSummary() {
    let totalPrice = 0;

    if (this.cartData && this.cartData.length) {
      this.cartData.forEach((item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        totalPrice += price * quantity;
      });
    }

    this.priceSummary.price = totalPrice;
    this.priceSummary.tax = this.priceSummary.price * 0.02;
    this.priceSummary.discount = this.priceSummary.price * 0.1;
    this.priceSummary.delivery = totalPrice > 0 ? 100 : 0;
    this.priceSummary.total =
      this.priceSummary.price +
      this.priceSummary.tax +
      this.priceSummary.delivery -
      this.priceSummary.discount;
    if (!this.cartData || this.cartData.length === 0) {
      this.router.navigate(['/']);
    } // navigate to home when cart is empty
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
}
