import { Component, OnInit } from '@angular/core';
import { IdentityClaims } from 'src/app/core/models/identity-claims';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-feature-module-demo',
  templateUrl: './feature-module-demo.component.html',
  styleUrls: ['./feature-module-demo.component.scss'],
})
export class FeatureModuleDemoComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get identityClaims(): IdentityClaims {
    return this.authService.identityClaims;
  }
}
