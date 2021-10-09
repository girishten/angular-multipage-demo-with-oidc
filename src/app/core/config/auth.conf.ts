import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { AUTH_ROUTES } from './auth.route.conf';

export const authConfig: AuthConfig = {
  issuer: environment.issuer,
  clientId: environment.clientId,
  responseType: 'code',
  redirectUri: `${window.location.origin}/${AUTH_ROUTES.login}`,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email api offline_access',
  useSilentRefresh: true,
  // silentRefreshTimeout: 5000,
  timeoutFactor: 0.9,
  sessionChecksEnabled: true,
  showDebugInformation: true,
  clearHashAfterLogin: false,
  nonceStateSeparator: 'semicolon',
};
