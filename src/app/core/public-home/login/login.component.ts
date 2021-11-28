import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTH_ROUTES } from '../../config/auth.route.conf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const redirectReq = this.route.snapshot.paramMap.get('redirect');

    if (redirectReq && !redirectReq.startsWith(`/${AUTH_ROUTES.login}`)) {
      this.auth.loginWithRedirect({ redirect_uri: redirectReq });
    } else {
      this.auth.loginWithRedirect();
    }
  }
}
