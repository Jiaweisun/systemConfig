import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// import { UserService } from './services/user.service';
import { SystemService } from './services/system.service';
import { SystemConfigService } from './services/systemConfig.service';
import { SystemFilesService } from './services/systemFiles.service';
// import { logoSrc} from '';

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
  // title = '配置系统....';
}

  // <h2><img src='app/images/logo-header.png'/></h2>
    
   
  //   <router-outlet></router-outlet>
// <img src='app/images/logo-header.png'/> {{title}}
 // <nav>
 //    <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
 //    <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
 //    <a [routerLink]="['/cal']" routerLinkActive="active">Calculator</a>
 //    <a [routerLink]="['/users']" routerLinkActive="active">Users</a>
 //    <a [routerLink]="['/country']" routerLinkActive="active">Country</a>
 //    <a [routerLink]="['/contact']" routerLinkActive="active">Contact us</a>
 //    </nav>