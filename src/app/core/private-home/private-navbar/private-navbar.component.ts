import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.scss'],
})
export class PrivateNavbarComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
