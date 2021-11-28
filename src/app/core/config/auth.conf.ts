import { environment } from '../../../environments/environment';

export const AuthConfig = {
  domain: environment.oidc.idpUrl,
  clientId: environment.oidc.clientId
}
