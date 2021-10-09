import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { authModuleConfig } from './config/auth.module.conf';
import { authConfig } from './config/auth.conf';
import { AuthGuard } from './services/guards/auth.guard';
import { AuthService } from './services/auth/auth.service';

import { HTTP_INTERCEPTOR_PROVIDERS } from './services/interceptors';

import { PublicHomeComponent } from './public-home/public-home.component';
import { PublicNavbarComponent } from './public-home/public-navbar/public-navbar.component';
import { PublicFooterComponent } from './public-home/public-footer/public-footer.component';
import { P404Component } from './public-home/p404/p404.component';
import { P403Component } from './public-home/p403/p403.component';
import { P401Component } from './public-home/p401/p401.component';
import { E500Component } from './public-home/e500/e500.component';
import { LoginComponent } from './public-home/login/login.component';
import { LogoutComponent } from './public-home/logout/logout.component';

import { PrivateHomeComponent } from './private-home/private-home.component';
import { PrivateNavbarComponent } from './private-home/private-navbar/private-navbar.component';
import { PrivateFooterComponent } from './private-home/private-footer/private-footer.component';
import { DashboardComponent } from './private-home/dashboard/dashboard.component';

// We need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [
    // Public
    LoginComponent,
    LogoutComponent,
    PublicHomeComponent,
    PublicNavbarComponent,
    PublicFooterComponent,
    P404Component,
    P403Component,
    P401Component,
    E500Component,

    // Private
    PrivateHomeComponent,
    PrivateNavbarComponent,
    PrivateFooterComponent,
    DashboardComponent,
  ],
  imports: [
    // Vendor
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),

    // Local
  ],
  exports: [CommonModule],
  providers: [AuthGuard, HTTP_INTERCEPTOR_PROVIDERS, AuthService],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: AuthConfig, useValue: authConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
