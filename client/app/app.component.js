"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
// import { UserService } from './services/user.service';
var system_service_1 = require('./services/system.service');
var systemConfig_service_1 = require('./services/systemConfig.service');
var systemFiles_service_1 = require('./services/systemFiles.service');
// import { logoSrc} from '';
require('./rxjs-extensions');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  \t\t<router-outlet></router-outlet>\n  ",
            styleUrls: ['/app/css/app.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [system_service_1.SystemService, systemConfig_service_1.SystemConfigService, systemFiles_service_1.SystemFilesService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
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
//# sourceMappingURL=app.component.js.map