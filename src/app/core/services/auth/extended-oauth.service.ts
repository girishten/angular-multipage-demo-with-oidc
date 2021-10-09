import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class ExtendedOAuthService extends OAuthService {

  /**
   * @override storeAccessTokenResponse of OAuthService to include auth_data_updated event for tab sync
   * @param accessToken
   * @param refreshToken
   * @param expiresIn
   * @param grantedScopes
   * @param customParameters
   * @protected
   */
  protected storeAccessTokenResponse(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    grantedScopes: string,
    customParameters?: Map<string, string>
  ) {
    super.storeAccessTokenResponse(accessToken, refreshToken, expiresIn, grantedScopes, customParameters);
    // Signal that the auth data is updated only after __all__ auth-related fields are written to the storage.
    this._storage.setItem('auth_data_updated', accessToken);
    this._storage.removeItem('auth_data_updated');
  }

  /**
   * @override logOut of OAuthService to include auth_data_updated event for tab sync
   * @param customParameters
   * @param state
   */
  public logOut(customParameters: boolean | object = {}, state = ''): void {
    // @ts-ignore
    super.logOut(customParameters, state);
    this._storage.setItem('auth_data_updated', Date.now().toString());
    this._storage.removeItem('auth_data_updated');
  }
}
