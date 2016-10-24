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
var systemFiles_1 = require('../entity/systemFiles');
var SystemXmlConfigComponent = (function () {
    function SystemXmlConfigComponent(router, systemConfigService, systemFileService, systemService, route) {
        this.router = router;
        this.systemConfigService = systemConfigService;
        this.systemFileService = systemFileService;
        this.systemService = systemService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.systemFiles = [];
        this.system = new system_1.System('', '');
        this.systemFile = new systemFiles_1.SystemFile('', '', '');
        this.navigated = false;
    }
    SystemXmlConfigComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['system_id'] !== undefined && params['file_id'] !== undefined) {
                console.log('system_id::' + params['system_id']);
                var id = +params['system_id'];
                var file_id = +params['file_id'];
                _this.navigated = true;
                _this.getSystemById(id);
                _this.getFileById(file_id);
            }
            else {
                _this.navigated = false;
            }
        });
    };
    //获取系统
    SystemXmlConfigComponent.prototype.getSystemById = function (id) {
        var _this = this;
        this.systemService.getSystem(id)
            .subscribe(function (systems) { if (systems.length == 1) {
            _this.system = systems[0];
        } }, function (err) { console.log(err); });
    };
    //获取文件信息
    SystemXmlConfigComponent.prototype.getFileById = function (file_id) {
        var _this = this;
        this.systemFileService.getSystemFile(file_id)
            .subscribe(function (files) { if (files.length == 1) {
            _this.systemFile = files[0];
        } }, function (err) { console.log(err); });
    };
    SystemXmlConfigComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    //返回上一页
    SystemXmlConfigComponent.prototype.goBack = function (systemFile) {
        if (systemFile === void 0) { systemFile = null; }
        this.close.emit(systemFile);
        if (this.navigated) {
            window.history.back();
        }
    };
    //返回首页
    SystemXmlConfigComponent.prototype.backToIndex = function () {
        var link = ['/dashboard'];
        this.router.navigate(link);
    };
    //对已有数据更新
    SystemXmlConfigComponent.prototype.update = function (systemFile) {
        var _this = this;
        this.systemFileService.updateSystemFile(systemFile)
            .subscribe(function (systemFiles) { _this.systemFile = systemFiles[0]; }, function (err) { console.log(err); }, function () { return console.log(' update done'); });
        this.goBack(systemFile);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SystemXmlConfigComponent.prototype, "close", void 0);
    SystemXmlConfigComponent = __decorate([
        core_1.Component({
            selector: 'system-config-xml',
            templateUrl: 'app/html/system-config-xml.component.html',
            styleUrls: ['app/css/systemConfig.component.css'],
            providers: [system_service_1.SystemService, systemConfig_service_1.SystemConfigService, systemFiles_service_1.SystemFilesService]
        }), 
        __metadata('design:paramtypes', [router_2.Router, systemConfig_service_1.SystemConfigService, systemFiles_service_1.SystemFilesService, system_service_1.SystemService, router_1.ActivatedRoute])
    ], SystemXmlConfigComponent);
    return SystemXmlConfigComponent;
}());
exports.SystemXmlConfigComponent = SystemXmlConfigComponent;
//# sourceMappingURL=system-config-xml.component.js.map