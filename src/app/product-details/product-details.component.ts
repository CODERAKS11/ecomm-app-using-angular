import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  quantity: number = 1;
  productQuantity: number = 1;
  removeCart = false;
  cartData:product|undefined;
  constructor(private route: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId'); //to get product id from url

    if (productId) {
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items: product[] = [];
          try {
            const parsed = JSON.parse(cartData);
            if (Array.isArray(parsed)) {
              items = parsed;
            } else {
              items = [parsed]; // wrap single object into array
            }
          } catch (e) {
            console.error("Error parsing localCart", e);
            items = [];
          }

          items = items.filter(
            (item: product) => productId === item.id?.toString()
          );

          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if(user){
            let userId = user && JSON.parse(user).id;
            this.product.getCartList(userId);
            this.product.cartData.subscribe((result)=>{
              let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
              this.cartData = item[0];
              if(item.length){
                this.removeCart = true;
              }
            })
        }
        

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
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        let cartData:cart={
          ...this.productData,
          productId:this.productData.id,
          userId
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        }) 
      }
    }
  }
  removeToCart(productId: number) {
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(productId);
      
    } else{
      let user = localStorage.getItem('user');
      let userId= user && JSON.parse(user).id;
      // console.warn(this.cartData)
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        this.product.getCartList(userId);
      })
    }
    this.removeCart = false;
  }
}
