# Angular Multi Page Demo with OAuth2.0 OIDC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

###### Warning

If you came here looking for older version of the same, I have archived it. Going forward I will be creating newer
angular projects when a newer angular versions are released. Main Branch will always be pointing to the latest angular
version. While older versions will be branched out from main branch with Angular version as name. As said there will
not be any upgrade to the existing project other than bugfixes. If anyone would like to collaborate, please keep in
mind that for next version of angular we will be starting from scratch again.

## Development server

There are four (for each environment) dev server commands are added to `package.json` for ease of use. If you would like
to dig more read [NodeJs Custom Run Scripts](https://docs.npmjs.com/cli/run-script).

###### Running Project

`PLEASE NOTE: FOLLOWING PROXY SETUP IS NOT FOR PRODUCTION USE`

Run `npm run start:local` for a dev server with proxy to local API Service. Or Run `npm run start:dev` for a dev server
with dev hosted API Service.

If you are running `npm run start:local`, This has an assumption that you have already mapped local api path
in `proxy-config/local.config.json`. You may need to restart angular server whenever you are making a change to proxy
configuration.

While customizing `proxy-config` follow the instructions
from [proxying to backend server](https://angular.io/guide/build#proxying-to-a-backend-server) from Angular's
Documentation.

```json
{
  "/api": {
    "target": "https://domain.tld/v2/api/",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": true
  }
}
```

###### Important Notes

First you need to register your angular application with your OIDC Provider and get your `client Id` and paste it
inside `environment.ts` before you can run this application. While registering your angular application keep it is
recommended
to [use OAuth 2/OIDC using code flow + PKCE](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-13).

Common Mistakes while registering with OIDC Provider:
* Register as Web App rather than SPA.
* Incorrect callback urls. This demo requires you to add two urls for callback
  `https://localhost:4200/login` and `https://localhost:4200/silent-refresh.html`.
* Not adding CORS when RC Provider and Client are different.
* Issuer mismatch due to / at the end.

## Routes

Each of the below routes are Master Pages. First empty route accepts next level child by making use of `router-outlet`
in
`app.component.html`. Since it was immediate child of empty route it further acts as Master Page. Each of it again
having `router-outlet` inside of it. Which helps resolves child routes provided. An Auth Guard is Provided along with
Private Route this eliminates repeated use of Auth Guard in child routes.

```typescript
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PublicHomeComponent,
        children: PUBLIC_ROUTES,
      },
      {
        path: '',
        component: PrivateHomeComponent,
        canActivate: [AuthGuard],
        children: PRIVATE_ROUTES,
      },
    ],
  },
  {path: AUTH_ROUTES.login, component: LoginComponent},
  {path: AUTH_ROUTES.logout, component: LogoutComponent}
];
```

## Build

Run `rpm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod`
flag for a production build. Check `angular.json` for further customisation of the build configurations.

Following set of run commands `build`, `build:dev`, `build:int` and `build:prod` were added to `package.json` with CI/CD
pipeline in mind. Use it for `build without optimisation`, build for `dev server`, build for `int server` and build
for `Build for Production`.

You can take advantage of [Nodejs custom script](https://docs.npmjs.com/cli/run-script)
and [Angular Build Configurations](https://angular.io/guide/workspace-config#alternate-build-configurations) if you
wanted to create additional environments.

#### Other Assets

All files from `app/assets` are declared as assets by config provided in `angular.json`. If you have any other assets
that need to be included while building then you have to specify that in `angular.json`.

Eg: silent-refresh.html - An asset file which needed by Auth is declared an asset in angular.json therefore it will be
copied to output directory while building.

## Deployment

Angular application can be deployed to domain|sub-domain|sub-folder. For this demo, there is an assumption that API
service is available via `base-url/api`.

example: if `https://domain.tld` is Angular App
and `https://domain.tld/api/v1-21/products/9634/reviews?sort=date&order=desc` can be an API URI.

If you have any other special use
case [visit this stackoverflow thread](https://stackoverflow.com/questions/45970744/configure-base-url-depending-on-environment)
to learn & customise for your need.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

`NOTE:`  NOT WRITTEN YET - BE Careful with That.

## Running end-to-end tests

Earlier Protractor was first class e2e testing tool in Angular. From Angular 12 onwards e2e is removed from project
source. One among the most used tool is [Cypress](https://www.cypress.io/). Please feel free to use any e2e testing tool
that suites your team.

## Further help

To get more help please follow [Official Documentation from Angular](https://angular.io).
