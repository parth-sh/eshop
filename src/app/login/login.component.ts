import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authUserSub?: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.authUserSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.authUserSub = this.authService.user$.subscribe(user => {
      if (user) {
        this.userService.save(user)
        this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') || '/')
      }
    });
  }

  login() {
    this.authService.login();
  }
}
