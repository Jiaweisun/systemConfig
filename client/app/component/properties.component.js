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
var systemFiles_service_1 = require('../services/systemFiles.service');
var system_service_1 = require('../services/system.service');
var SystemFiles_1 = require('../entity/SystemFiles');
var system_1 = require('../entity/system');
var PropertiesComponent = (function () {
    function PropertiesComponent(router, systemConfigService, systemFileService, systemService, route) {
        this.router = router;
        this.systemConfigService = systemConfigService;
        this.systemFileService = systemFileService;
        this.systemService = systemService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.system = new system_1.System('', '');
        this.systemFile = new SystemFiles_1.SystemFile('', '', '');
        this.systemConfigs = [];
        this.propertiesCondition = new PropertiesCondition_1.PropertiesCondition('', '', '', 'text');
        this.sysName = '';
        this.fileName = '';
        this.navigated = false;
    }
    PropertiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['system_id'] !== undefined && params['file_id'] !== undefined && params['p'] !== undefined) {
                var id = +params['system_id'];
                var file_id = +params['file_id'];
                _this.profile = +params['p'];
                _this.navigated = true;
                _this.listPropertites(id, file_id);
            }
            else {
                _this.navigated = false;
            }
        });
    };
    PropertiesComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    // list properties
    PropertiesComponent.prototype.listPropertites = function (sys_id, file_id) {
        var _this = this;
        this.systemService.getSystem(sys_id)
            .subscribe(function (systems) {
            if (systems.length == 1) {
                _this.system = systems[0];
                _this.systemFileService.getSystemFile(file_id)
                    .subscribe(function (files) {
                    if (files.length == 1) {
                        _this.systemFile = files[0];
                        if (_this.profile == '0') {
                            _this.propertiesCondition = new PropertiesCondition_1.PropertiesCondition(_this.system.name, 'dev', _this.systemFile.name, 'text');
                        }
                        if (_this.profile == '1') {
                            _this.propertiesCondition = new PropertiesCondition_1.PropertiesCondition(_this.system.name, 'qa', _this.systemFile.name, 'text');
                        }
                        if (_this.profile == '2') {
                            _this.propertiesCondition = new PropertiesCondition_1.PropertiesCondition(_this.system.name, 'prod', _this.systemFile.name, 'text');
                        }
                        _this.systemConfigService.listProperties(_this.propertiesCondition)
                            .subscribe(function (results) { if (results != null) {
                            _this.systemConfigs = results;
                        } }, function (err) { alert(err); }, function () { return console.log(' results are null.'); });
                    }
                }, function (err) { console.log(err); });
            }
        }, function (err) { console.log(err); });
    };
    //返回上一页
    PropertiesComponent.prototype.goBack = function (systemFile) {
        if (systemFile === void 0) { systemFile = null; }
        this.close.emit(systemFile);
        if (this.navigated) {
            window.history.back();
        }
    };
    //返回首页
    PropertiesComponent.prototype.backToIndex = function () {
        var link = ['/dashboard'];
        this.router.navigate(link);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PropertiesComponent.prototype, "close", void 0);
    PropertiesComponent = __decorate([
        core_1.Component({
            selector: 'system-config-detail',
            templateUrl: 'app/html/system-config-detail.component.html',
            styleUrls: ['app/css/systemConfig.component.css'],
            providers: [systemConfig_service_1.SystemConfigService]
        }), 
        __metadata('design:paramtypes', [router_2.Router, systemConfig_service_1.SystemConfigService, systemFiles_service_1.SystemFilesService, system_service_1.SystemService, router_1.ActivatedRoute])
    ], PropertiesComponent);
    return PropertiesComponent;
}());
exports.PropertiesComponent = PropertiesComponent;
