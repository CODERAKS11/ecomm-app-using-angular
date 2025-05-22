import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService,private router:Router ) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.params['id'];
    console.warn(productId);
    //only string will pass no null or undefined
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data;
      console.warn(this.productData);
    });
  }

  submit(data: product) {
    console.warn(data);
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((response) => {
      if(response){
        this.productMessage = "Product updated successfully";
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.router.navigate(['seller-home']);
    }, 3000);
  }

}
