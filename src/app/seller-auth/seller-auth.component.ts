import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  signup(data: object): void {
    console.warn('Signing up with', data);
  }

}
