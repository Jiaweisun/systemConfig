import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SystemService } from './services/system.service';
import { SystemConfigService } from './services/systemConfig.service';
import { SystemFilesService } from './services/systemFiles.service';

import './rxjs-extensions';

@Component({
  selector: 'my-app',

  template: `
  		<router-outlet></router-outlet>
  `,
  styleUrls: ['/app/css/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [SystemService, SystemConfigService, SystemFilesService]
})
export class AppComponent {

}