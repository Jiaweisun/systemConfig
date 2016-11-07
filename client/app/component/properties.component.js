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
var systemConfig_service_1 = require('../services/systemConfig.service');
var PropertiesCondition_1 = require('../entity/PropertiesCondition');
var PropertiesComponent = (function () {
    function PropertiesComponent(router, systemConfigService, route) {
        this.router = router;
        this.systemConfigService = systemConfigService;
        this.route = route;
        this.propertiesCondition = new PropertiesCondition_1.PropertiesCondition('', '', '', 'text');
    }
    PropertiesComponent.prototype.ngOnInit = function () {
        //通过参数传过来
        // this.propertiesCondition = new PropertiesCondition(this.system.name,'dev',this.systemFile.name,'text');
        this.listPropertites(this.propertiesCondition);
    };
    PropertiesComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    // list properties
    PropertiesComponent.prototype.listPropertites = function (condition) {
        // this.systemConfigService.listProperties(condition).subscribe(results => this.propertiesDetails = results);
    };
    PropertiesComponent = __decorate([
        core_1.Component({
            selector: 'system-config-detail',
            templateUrl: 'app/html/system-config-detail.component.html',
            styleUrls: ['app/css/systemConfig.component.css'],
            providers: [systemConfig_service_1.SystemConfigService]
        }), 
        __metadata('design:paramtypes', [router_2.Router, systemConfig_service_1.SystemConfigService, router_1.ActivatedRoute])
    ], PropertiesComponent);
    return PropertiesComponent;
}());
exports.PropertiesComponent = PropertiesComponent;
