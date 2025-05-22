import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined ;
  errorAddProductMessage: string | undefined ;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    // Initialization logic here
  }

  submit(data: product) {
    console.warn('Product data:', data);
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product added successfully';
      } else {
        this.errorAddProductMessage = 'Product not added';
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
        this.errorAddProductMessage = undefined;
      }, 3000);
    })
  }

}
