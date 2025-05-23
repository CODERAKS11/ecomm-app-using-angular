import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  product } from '../data-type';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
 
}
