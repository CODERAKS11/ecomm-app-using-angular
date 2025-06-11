import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  totalPrice:number|undefined;
  constructor(private product:ProductService, private router: Router){

  }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result:any)=>{

      let price=0;
      result.forEach((item:any)=>{
        if(item.quantity){
          price=price+ (+item.price* +item.quantity)
        }
      })
      this.totalPrice=price+(price*0.02)+100-(price*0.1);

      console.warn(this.totalPrice);
      
    })

  }

  orderNow(data:{email:string,address:string,contact:string}){
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
    if(this.totalPrice){
     let orderData:order={
        id: undefined,
        ...data,
       totalPrice:this.totalPrice,
       userId
      }

      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          alert('Order placed')
          this.router.navigate(['/my-orders']);
        }
        
      })
    }
  }
}
