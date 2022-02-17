import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser?: AppUser | null

  constructor(public authService: AuthService, public cartService: ShoppingCartService) { }

  ngOnInit(): void {
    // no need for unsubscribe only one instance
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.authService.Logout();
  }
}
