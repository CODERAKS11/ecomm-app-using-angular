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
  productMessage: string | undefined;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.productList().subscribe((result) => {
      if (result) {
      this.productList = result ;
      }
    });
  }

  deleteProduct(id: number) {
    console.warn(id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productList = this.productList?.filter(product => product.id !== id);
        this.productMessage = "Product deleted successfully";
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

}
