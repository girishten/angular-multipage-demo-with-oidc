import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {AUTH_ROUTES} from '../../config/auth.route.conf';
import {IdentityClaims} from '../../models/identity-claims';
import {ExtendedOAuthService} from './extended-oauth.service';
import {ERROR_ROUTES} from "../../config/error.route.conf";

/**
 * Based on: https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/
 * Credits: https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/graphs/contributors
 * Further Read: https://infi.nl/nieuws/spa-necromancy/
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  private sessionErrorBlocker = false;

  /**
   * Publishes `true` if and only if
   * (a) all the asynchronous initial login calls have completed or errored, and
   * (b) the user ended up being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([this.isAuthenticated$, this.isDoneLoading$]).pipe(
    map((values) => values.every((b) => b))
  );

  private navigateToLoginPage(): void {
    this.router.navigateByUrl('/' + AUTH_ROUTES.login).then(() => {
    });
  }

  constructor(private oauthService: ExtendedOAuthService, private router: Router) {

    window.addEventListener('storage', (event) => {
      if ((event.key === 'auth_data_updated' && event.newValue !== null) || event.key === null) {
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
        if (!this.oauthService.hasValidAccessToken()) {
          this.navigateToLoginPage();
        }
      }
    });

    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
    });

    // Login Errors
    const IRRECOVERABLE_ERRORS = [
      'jwks_load_error',
      'discovery_document_load_error',
      'discovery_document_validation_error'
    ];
    this.oauthService.events
      .pipe(filter((e) => IRRECOVERABLE_ERRORS.includes(e.type)))
      .subscribe((e) => this.router.navigate([`/${ERROR_ROUTES.e500}`]));

    // User Profile Error
    this.oauthService.events
      .pipe(filter((e) => ['user_profile_load_error'].includes(e.type)))
      .subscribe((e) => this.router.navigate([`/${ERROR_ROUTES.p401}`]));

    // Token Received
    this.oauthService.events
      .pipe(filter((e) => ['token_received'].includes(e.type)))
      .subscribe((e) => this.oauthService.loadUserProfile());

    // Session Error
    this.oauthService.events
      .pipe(filter((e) => ['session_terminated', 'session_error'].includes(e.type)))
      .pipe(filter(() => !this.sessionErrorBlocker))
      .subscribe((e) => this.navigateToLoginPage());

    this.oauthService.setupAutomaticSilentRefresh();
  }

  public runInitialLoginSequence(): Promise<void> {
    // 0. LOAD CONFIG:
    // First we have to check to see how the IdServer is currently configured:
    return (
      this.oauthService
        .loadDiscoveryDocument()

        // For demo purposes, we pretend the previous call was very slow
        .then(() => new Promise<void>((resolve) => setTimeout(() => resolve(), 1000)))

        // 1. HASH LOGIN:
        // Try to log in via hash fragment after redirect back from IdServer from initImplicitFlow:
        .then(() => this.oauthService.tryLogin())

        .then(() => {
          if (this.oauthService.hasValidAccessToken()) {
            return Promise.resolve();
          }

          // 2. SILENT LOGIN:
          // Try to log in via a refresh because then we can prevent needing to redirect the user:
          return this.oauthService
            .silentRefresh()
            .then(() => Promise.resolve())
            .catch((result) => {
              // Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
              // Only the ones where it's reasonably sure that sending the user to the IdServer will help.
              const errorResponsesRequiringUserInteraction = [
                'interaction_required',
                'login_required',
                'account_selection_required',
                'consent_required',
              ];

              if (result && result.reason && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {
                // 3. ASK FOR LOGIN:
                // At this point we know for sure that we have to ask the user to log in,
                // so we redirect them to the IdServer to enter credentials.
                return Promise.resolve();
              }

              // We can't handle the truth, just pass on the problem to the next handler.
              return Promise.reject(result);
            });
        })

        .then(() => {
          this.isDoneLoadingSubject$.next(true);

          // Check for the strings 'undefined' and 'null' just to be sure. Our current
          // login(...) should never have this, but in case someone ever calls
          // initImplicitFlow(undefined | null) this could happen.
          if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
            let stateUrl = this.oauthService.state;
            if (!stateUrl.startsWith('/')) {
              stateUrl = decodeURIComponent(stateUrl);
            }
            this.router.navigateByUrl(stateUrl).then(() => {
            });
          }
        })
        .catch(() => this.isDoneLoadingSubject$.next(true))
    );
  }

  public login(targetUrl?: string): void {
    this.sessionErrorBlocker = false;
    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  public async logout(): Promise<void> {
    this.sessionErrorBlocker = true;
    await this.oauthService
      .revokeTokenAndLogout(
        {
          client_id: this.oauthService.clientId,
          returnTo: this.oauthService.redirectUri,
        },
        true
      )
      .then(() => {
      });
  }

  public get identityClaims(): IdentityClaims {
    return this.oauthService.getIdentityClaims() as IdentityClaims;
  }

  public refresh(): void {
    this.oauthService.silentRefresh().then(() => {
    });
  }

  public hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
