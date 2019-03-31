// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  redirectUri: window.location.origin,
  clientId: '{yourClientId}',
};

export const environment = {
  production: false,
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
  },
  mattermost: {
    url: 'http://localhost',
  },
  functions: {
    auth: 'http://localhost:3000',
  },
  oauth2: {
    issuer: 'http://localhost:3000/login',
    redirectLink: window.location.origin + '/index.html',
    // clientId: 'nokpaqiuttnxbr39porcqirjhh',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
