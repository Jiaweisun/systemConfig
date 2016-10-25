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
var router_2 = require('@angular/router');
var system_service_1 = require('../services/system.service');
var system_1 = require('../entity/system');
// import { DashboardComponent } from './dashboard.component'
var SystemAddingComponent = (function () {
    function SystemAddingComponent(router, systemService, route) {
        this.router = router;
        this.systemService = systemService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        // sub: any;
        this.navigated = false;
    }
    SystemAddingComponent.prototype.ngOnInit = function () {
        this.system = new system_1.System('', '');
    };
    SystemAddingComponent.prototype.goBack = function (savedSystem) {
        if (savedSystem === void 0) { savedSystem = null; }
        this.close.emit(savedSystem);
        if (this.navigated) {
            window.history.back();
        }
    };
    SystemAddingComponent.prototype.save = function () {
        var _this = this;
        // let systemOperation:Observable<System[]>;
        if (this.system.title === "" || this.system.title === null || this.system.name === "" || this.system.name === null) {
            return;
        }
        this.systemService.addSystem(this.system).
            subscribe(function (systems) {
            _this.system = systems[0];
        }, function (err) {
            console.log(err);
            _this.router.navigate(['/dashboard']);
        });
    };
    SystemAddingComponent.prototype.cancel = function () {
        var link = ['/dashboard'];
        this.router.navigate(link);
    };
    __decorate([
        //, OnDestroy
        core_1.Input(), 
        __metadata('design:type', system_1.System)
    ], SystemAddingComponent.prototype, "system", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SystemAddingComponent.prototype, "close", void 0);
    SystemAddingComponent = __decorate([
        core_1.Component({
            selector: 'adding-system',
            templateUrl: 'app/html/system-adding.component.html',
            styleUrls: ['app/css/systemConfig.component.css'],
            providers: [system_service_1.SystemService]
        }), 
        __metadata('design:paramtypes', [router_2.Router, system_service_1.SystemService, router_1.ActivatedRoute])
    ], SystemAddingComponent);
    return SystemAddingComponent;
}());
exports.SystemAddingComponent = SystemAddingComponent;
