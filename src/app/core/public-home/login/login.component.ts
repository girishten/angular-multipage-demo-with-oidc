import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTH_ROUTES } from '../../config/auth.route.conf';
import { homeRoute } from '../../config/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const redirectReq = this.route.snapshot.paramMap.get('redirect');

    if (redirectReq && !redirectReq.startsWith(`/${AUTH_ROUTES.login}`)) {
      this.router.navigateByUrl(redirectReq).then(() => {});
    } else {
      this.router.navigate(['/' + homeRoute]).then(() => {});
    }
  }
}
