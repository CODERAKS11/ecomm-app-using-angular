import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Route, Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {
  isLoginMode = true;
  email = '';
  password = '';
  errorMessage = '';
  showLogin = false;
  authError: string = '';
  constructor(private seller:SellerService, private router: Router) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }

  login(data: SignUp): void {
    this.authError = '';
    console.warn(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Invalid email or password';
      } 
    });
  }

  openLogin(): void {
    this.showLogin = true;

  }
  openSignUp(): void {
    this.showLogin = false;
  }

}
