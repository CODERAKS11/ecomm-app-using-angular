import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName:string="";
  searchResult:undefined|product[];
  cartItems=0;
  
  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    
    this.route.events.subscribe((val: any) => {
      console.warn(val.url);//logging the route change events
      if(val.url){
        if(localStorage.getItem('seller') && (val.url.includes('seller-auth') || val.url.includes('seller'))) {
          this.menuType = 'seller';
          if(localStorage.getItem('seller')) {
            let sellerStore:any = localStorage.getItem('seller');
            let sellerData:any = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            
          }
        } else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = "user";
          this.product.getCartList(userData.id);
        }
         else{
          this.menuType = 'default';
        }
      }
    });
    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems= items.length;
    })
  }
  
  
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      if(element.value.length > 2){
        this.product.searchProducts(element.value).subscribe((result:product[])=>{
          console.warn(result);
          if(result.length>5){
            result.length=5;
          }
          this.searchResult=Object.values(result);
          
        })
      }

    }
  }   
  hideSearch(){
    this.searchResult = undefined;
  } 
  submitSearch(val:string){
    this.route.navigate([`search/${val}`]);
    this.hideSearch();
  }
  redirectToDetails(id:number){
    this.route.navigate([`details/${id}`]);
  }
}
