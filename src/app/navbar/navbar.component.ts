import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser?: AppUser | null

  constructor(public authService: AuthService) {
    // no need for unsubscribe only one instance
    authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(): void { }

  logout() {
    this.authService.Logout();
  }
}
