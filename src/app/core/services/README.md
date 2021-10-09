# Services

Services That are active throughout the lifecycle of angular app should be added here. If there service that require
unique instance for each feature module use `providedIn: any`. Further,
read [here](https://angular.io/api/core/Injectable#options)

`Important: There is nothing as such shared service. There are only services that provided in root or provided only in a feature`

## Auth

OIDC Auth Service & Extended OAuthService of angular-oauth2-oidc Library for overriding to avoiding race conditions
while saving access token by different browser tabs.

## Guards

Auth Guard that checks and initiate login process. You may need additional guards such as role-guard.

## Interceptors

Provided to Demonstrate usage none of them are in use. Activate from `interceptors/index.ts` if required.
