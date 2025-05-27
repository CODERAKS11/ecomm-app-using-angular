import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  cart, product } from '../data-type';
import { map, Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData= new EventEmitter<product[]| []>()
  constructor(private http:HttpClient) { }
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data, { observe: 'response' })

  }
  productList() { 
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(data: product) {
     console.warn(data);
    return this.http.put<product>(`http://localhost:3000/products/${data.id}`, data);
  }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
  searchProducts(query: string): Observable<product[]> {
  return this.http.get<product[]>(`http://localhost:3000/products`).pipe(
    map((products: product[]) =>
      products.filter((item: product) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    )
  );
  }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: number) {
  let cartData = localStorage.getItem('localCart');
  if (cartData) {
    let parsedCart: any;
    try {
      parsedCart = JSON.parse(cartData);
    } catch (e) {
      console.error("Invalid cart data in localStorage", e);
      parsedCart = [];
    }

    let items: product[] = Array.isArray(parsedCart) ? parsedCart : [parsedCart];

    items = items.filter((item: product) => productId !== item.id);

    localStorage.setItem('localCart', JSON.stringify(items));
    this.cartData.emit(items);
  }
}
addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData);
   }
 
}
