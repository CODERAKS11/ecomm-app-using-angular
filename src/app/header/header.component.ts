import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  constructor(private route: Router) { }

  ngOnInit(): void {
    
    this.route.events.subscribe((val: any) => {
      console.warn(val.url);//logging the route change events
      if(val.url){
        if(localStorage.getItem('seller') && (val.url.includes('seller-auth') || val.url.includes('seller'))) {
          this.menuType = 'seller';
        } else{
          this.menuType = 'default';
        }
      }
    });
  }

}
