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
var SystemConfig_1 = require('../entity/SystemConfig');
var PropertiesCondition_1 = require('../entity/PropertiesCondition');
var SystemConfigComponent = (function () {
    function SystemConfigComponent(router, systemConfigService, systemFileService, systemService, route) {
        this.router = router;
        this.systemConfigService = systemConfigService;
        this.systemFileService = systemFileService;
        this.systemService = systemService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.systemConfigs = [];
        this.system = new system_1.System('', '');
        this.systemFile = new SystemFiles_1.SystemFile('', '', '');
        this.systemConfig = new SystemConfig_1.SystemConfig(1, '', '', '', '', '', 1);
        this.propertiesCondition = new PropertiesCondition_1.PropertiesCondition();
        this.devChecked = 'yes';
        this.qaChecked = 'yes';
        this.prodChecked = 'yes';
        this.navigated = false;
    }
    SystemConfigComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['system_id'] !== undefined && params['file_id'] !== undefined) {
                _this.system_id = +params['system_id'];
                _this.file_id = +params['file_id'];
                _this.navigated = true;
                //this.getSystemConfig(id);
                _this.getSystemById(_this.system_id);
                _this.getFileById(_this.file_id);
                _this.getscBYsfid(_this.system_id, _this.file_id);
            }
            else {
                _this.navigated = false;
            }
        });
    };
    //获取系统
    SystemConfigComponent.prototype.getSystemById = function (id) {
        var _this = this;
        this.systemService.getSystem(id)
            .subscribe(function (systems) { if (systems.length == 1) {
            _this.system = systems[0];
        } }, function (err) { console.log(err); });
    };
    //获取文件信息
    SystemConfigComponent.prototype.getFileById = function (file_id) {
        var _this = this;
        this.systemFileService.getSystemFile(file_id)
            .subscribe(function (files) { if (files.length == 1) {
            _this.systemFile = files[0];
        } }, function (err) { console.log(err); });
    };
    //根据系统ID,获取文件配置信息
    SystemConfigComponent.prototype.getSystemConfig = function (id) {
        var _this = this;
        this.systemConfigService.getScBySysId(id)
            .subscribe(function (systemConfigs) { if (systemConfigs.length >= 1) {
            _this.systemConfigs = systemConfigs;
        } }, function (err) { console.log(err); }, function () { return console.log('systemConfigs info is null.'); });
    };
    //根据系统ID和文件ID获取配置信息
    SystemConfigComponent.prototype.getscBYsfid = function (id, file_id) {
        var _this = this;
        this.systemConfigService.getSCBysf(id, file_id)
            .subscribe(function (systemConfigs) { if (systemConfigs.length >= 1) {
            _this.systemConfigs = systemConfigs;
        } }, function (err) { console.log(err); }, function () { return console.log('systemConfigs info is null.'); });
    };
    SystemConfigComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    //返回上一页
    SystemConfigComponent.prototype.goBack = function (systemFile) {
        if (systemFile === void 0) { systemFile = null; }
        this.close.emit(systemFile);
        if (this.navigated) {
            window.history.back();
        }
    };
    //返回首页
    SystemConfigComponent.prototype.backToIndex = function () {
        var link = ['/dashboard'];
        this.router.navigate(link);
    };
    //新增一行
    SystemConfigComponent.prototype.addNewColumn = function () {
        this.systemConfigs.push(new SystemConfig_1.SystemConfig(this.system.id, '', '', '', '', '', 0));
    };
    //新增一页
    SystemConfigComponent.prototype.addNewPage = function () {
        var link = ['/pt/' + this.system_id + '/' + this.file_id];
        this.router.navigate(link);
    };
    //保存所有列表
    SystemConfigComponent.prototype.saveList = function () {
        for (var i = 0; i < this.systemConfigs.length; ++i) {
            if (this.systemConfigs[i].id == undefined) {
                this.save(this.systemConfigs[i]);
            }
            else {
                this.update(this.systemConfigs[i]);
            }
        }
        var link = ['/files/' + this.system.id];
        this.router.navigate(link);
    };
    //对新数据保存
    SystemConfigComponent.prototype.save = function (systemConfig) {
        var _this = this;
        systemConfig['file_id'] = this.systemFile.id;
        this.systemConfigService.addSystemConfig(systemConfig)
            .subscribe(function (systemConfigs) { _this.systemConfig = systemConfigs[0]; }, function (err) { console.log(err); }, function () { return console.log(' none'); });
    };
    //对已有数据更新
    SystemConfigComponent.prototype.update = function (systemConfig) {
        var _this = this;
        this.systemConfigService.updateSystemConfig(systemConfig)
            .subscribe(function (systemConfigs) { _this.systemConfig = systemConfigs[0]; }, function (err) { console.log(err); }, function () { return console.log(' none'); });
    };
    //删除当前列
    SystemConfigComponent.prototype.deleteCurrent = function (systemConfig) {
        var _this = this;
        if (systemConfig.id != undefined) {
            this.systemConfigService.deleteSystemConfig(systemConfig.id)
                .subscribe(function (systemConfigs) { if (systemConfigs.length == 1) {
                _this.systemConfig = systemConfigs[0];
            } }, //Bind to view
            function (//Bind to view
                err) { console.log(err); }, function () { return console.log(' systemConfigs info is null.'); });
        }
        this.systemConfigs.length--;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SystemConfigComponent.prototype, "close", void 0);
    SystemConfigComponent = __decorate([
        core_1.Component({
            selector: 'system-config',
            templateUrl: 'app/html/system-config.component.html',
            styleUrls: ['app/css/systemConfig.component.css'],
            providers: [system_service_1.SystemService, systemConfig_service_1.SystemConfigService, systemFiles_service_1.SystemFilesService]
        }), 
        __metadata('design:paramtypes', [router_2.Router, systemConfig_service_1.SystemConfigService, systemFiles_service_1.SystemFilesService, system_service_1.SystemService, router_1.ActivatedRoute])
    ], SystemConfigComponent);
    return SystemConfigComponent;
}());
exports.SystemConfigComponent = SystemConfigComponent;
