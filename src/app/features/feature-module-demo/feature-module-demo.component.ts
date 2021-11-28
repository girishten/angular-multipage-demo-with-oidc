import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-feature-module-demo',
  templateUrl: './feature-module-demo.component.html',
  styleUrls: ['./feature-module-demo.component.scss'],
})
export class FeatureModuleDemoComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
