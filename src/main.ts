import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

/*
TODO
----
- Change src="{{x}}" to [src]="x" where possible
- Fix checkboxes not showing up if you navigate to the dashboard page
  - move light-bootstrap-dashboard.js code into service or guard or something
- Add simple unit & e2e test
*/
