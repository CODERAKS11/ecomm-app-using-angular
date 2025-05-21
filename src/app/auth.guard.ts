import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  
  if (localStorage.getItem('seller')) {
      return true;
    }
  return sellerService.isSellerLoggedIn;
};
