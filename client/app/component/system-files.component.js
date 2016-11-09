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
var systemFiles_service_1 = require('../services/systemFiles.service');
var system_service_1 = require('../services/system.service');
var system_1 = require('../entity/system');
var SystemFiles_1 = require('../entity/SystemFiles');
var SystemFileComponent = (function () {
    function SystemFileComponent(router, systemFileService, systemConfigService, systemService, route) {
        this.router = router;
        this.systemFileService = systemFileService;
        this.systemConfigService = systemConfigService;
        this.systemService = systemService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.system = new system_1.System('', '');
        this.systemFiles = [];
        this.systemFile = new SystemFiles_1.SystemFile('', '', '');
        this.navigated = false;
        this.title = "----文件配置列表";
    }
    SystemFileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.navigated = true;
                _this.getSystemFile(id);
                _this.getSystemById(id);
            }
            else {
                _this.navigated = false;
            }
        });
    };
    SystemFileComponent.prototype.getSystemFile = function (system_id) {
        var _this = this;
        this.systemFileService.getSystemFileBySysId(system_id)
            .subscribe(function (systemFiles) { if (systemFiles.length >= 1) {
            _this.systemFiles = systemFiles;
        } }, function (err) { console.log(err); }, function () { return console.log('systemConfigs info is null.'); });
    };
    SystemFileComponent.prototype.getSystemById = function (id) {
        var _this = this;
        this.systemService.getSystem(id)
            .subscribe(function (systems) { if (systems.length == 1) {
            _this.system = systems[0];
        } }, function (err) { console.log(err); });
    };
    SystemFileComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SystemFileComponent.prototype.goBack = function (savedSystemConfig) {
        if (savedSystemConfig === void 0) { savedSystemConfig = null; }
        this.close.emit(savedSystemConfig);
        if (this.navigated) {
            window.history.back();
        }
    };
    SystemFileComponent.prototype.back = function () {
        var link = ['/dashboard'];
        this.router.navigate(link);
    };
    SystemFileComponent.prototype.save = function (systemConfig) {
        var _this = this;
        this.systemFileService.addSystemFile(systemConfig, this.system.id)
            .subscribe(function (systemFiles) { _this.systemFile = systemFiles[0]; }, function (err) { console.log(err); }, function () { return console.log(' none'); });
    };
    SystemFileComponent.prototype.add = function (system) {
        var link = ['/addSystemFile/' + system.id];
        this.router.navigate(link);
    };
    SystemFileComponent.prototype.editCurrent = function (system, systemFile) {
        var link = [];
        if (systemFile.type == "xml" || systemFile.type == "text/xml") {
            link = ['/xml/' + system.id + '/' + systemFile.id];
        }
        if (systemFile.type == "properties" || systemFile.type == "propertites") {
            link = ['/config/' + system.id + "/" + systemFile.id];
        }
        this.router.navigate(link);
    };
    SystemFileComponent.prototype.deleteCurrent = function (system, systemFile) {
        var _this = this;
        if (systemFile.type == "xml" || systemFile.type == "text/xml") {
            //delete file 
            this.systemFileService.deleteSystemFile(systemFile.id).subscribe(function (systemFiles) { if (systemFiles.length == 1) {
                _this.systemFile = systemFiles[0];
            } }, function (err) { console.log(err); }, function () { return console.log(' none'); });
        }
        if (systemFile.type == "properties" || systemFile.type == "propertites") {
            this.systemFileService.deletePropertiesFile(systemFile.id).subscribe(function (systemFiles) { if (systemFiles.length == 1) {
                _this.systemFile = systemFiles[0];
            } }, function (err) { console.log(err); }, function () { return console.log(' none'); });
        }
        this.systemFiles.length--;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SystemFileComponent.prototype, "close", void 0);
    SystemFileComponent = __decorate([
        core_1.Component({
            selector: 'system-config',
            templateUrl: 'app/html/system-files.component.html',
            styleUrls: ['app/css/systemConfig.component.css'],
            providers: [system_service_1.SystemService, systemFiles_service_1.SystemFilesService]
        }), 
        __metadata('design:paramtypes', [router_2.Router, systemFiles_service_1.SystemFilesService, systemConfig_service_1.SystemConfigService, system_service_1.SystemService, router_1.ActivatedRoute])
    ], SystemFileComponent);
    return SystemFileComponent;
}());
exports.SystemFileComponent = SystemFileComponent;
