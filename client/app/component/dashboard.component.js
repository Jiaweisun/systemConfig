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
var DashboardComponent = (function () {
    function DashboardComponent(router, systemService) {
        this.router = router;
        this.systemService = systemService;
        this.systems = [];
        this.fileUrl = '/files';
    }
    DashboardComponent.prototype.loadSystems = function () {
        var _this = this;
        this.systemService.listSystem()
            .subscribe(function (systems) { return _this.systems = systems; }, //Bind to view
        function (//Bind to view
            err) { console.log(err); }, function () { return console.log('done'); });
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.loadSystems();
    };
    DashboardComponent.prototype.addSys = function (sys) {
        this.systems.push(sys);
    };
    DashboardComponent.prototype.addSystem = function () {
        var link = ['/addSystem'];
        this.router.navigate(link);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: '/app/html/dashboard.component.html',
            styleUrls: ['app/css/systemConfig.component.css'],
            providers: [system_service_1.SystemService],
            directives: [router_2.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, system_service_1.SystemService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
