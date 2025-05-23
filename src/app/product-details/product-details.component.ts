import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  quantity: number = 1;
  productQuantity: number = 1;
  constructor(private route: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
      });
    }
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

}
