import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: product[] | undefined;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.productList().subscribe((result) => {
      this.productList = result;
    });
  }

  // Add any additional methods or properties as needed

}
