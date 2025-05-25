import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['/seller-home']);
        console.warn("result", result);
     });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    }
  }
  userLogin(data: login) {
    console.warn(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result:any) => {
      this.isSellerLoggedIn.next(true);
      if (result && result.body && result.body.length) {
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['/seller-home']);
        
      } else{
        console.warn("Login failed");
        this.isLoginError.emit(true);
        this.isSellerLoggedIn.next(false);
        this.router.navigate(['/seller-auth']);
      }
    });
  }
}
