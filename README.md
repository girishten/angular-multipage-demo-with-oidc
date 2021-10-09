# AngularMultipageDemoWithOidc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

## Development server
There are two custom dev server commands added to `package.json` for ease of use.
If you would like to dig more read [NodeJs Custom Run Scripts](https://docs.npmjs.com/cli/run-script).

###### Running Project

`PLEASE NOTE: FOLLOWING PROXY SETUP IS NOT FOR PRODUCTION USE`

Run `npm run start:local` for a dev server with proxy to local API Service. Or Run `npm run start:dev` for a dev server with dev hosted API Service.

If you are running `npm run start:local`, This has an assumption that you have already mapped local api path in `proxy-config/local.config.json`. You may need to restart angular server whenever you are making a change to proxy configuration.

While customizing `proxy-config` follow the instructions from [proxying to backend server](https://angular.io/guide/build#proxying-to-a-backend-server) from Angular's Documentation.

```json
{
  "/api" : {
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

First you need to register your angular application with your OIDC Provider and get your `client Id` and paste it inside `environment.ts` before you can run this application. While registering your angular application keep it is recommended to [use OAuth 2/OIDC using code flow + PKCE](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-13).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `rpm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. Check `angular.json` for futher customisation of the build configurations.

Following set of run commands `build`, `build:dev`, `build:int` and `build:prod` were added to `package.json` with CI/CD pipeline in mind. Use it for `build without optimisation`, build for `dev server`, build for `int server` and build for `Build for Production`.

You can take advantage of [Nodejs custom script](https://docs.npmjs.com/cli/run-script) and [Angular Build Configurations](https://angular.io/guide/workspace-config#alternate-build-configurations) if you wanted to create additional environments.

## Deployment

Angular application can be deployed to domain|sub-domain|sub-folder.
For this demo, there is an assumption that API service is available via `base-url/api`.

example: if `https://domain.tld` is Angular App and `https://domain.tld/api/v1-21/products/9634/reviews?sort=date&order=desc` can be an API URI.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

`NOTE:`  NOT WRITTEN YET - BE Careful with That.

## Running end-to-end tests

Earlier Angular used to come with Protractor. Then Cypress become famous and it became very handy. So no more e2e folder or command.
Please feel free to use any E2E testing that suites your team. If that tool is cypress then [Cypress](https://www.cypress.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
