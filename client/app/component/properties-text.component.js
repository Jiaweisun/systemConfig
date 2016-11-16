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
var PropertiesTextComponent = (function () {
    function PropertiesTextComponent(router, systemConfigService, systemFileService, systemService, route) {
        this.router = router;
        this.systemConfigService = systemConfigService;
        this.systemFileService = systemFileService;
        this.systemService = systemService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.systemFiles = [];
        this.system = new system_1.System('', '');
        this.systemFile = new SystemFiles_1.SystemFile('', '', '');
        this.systemConfig = new SystemConfig_1.SystemConfig(1, '', '', '', '', '', 1);
        this.systemConfigs = [];
        this.navigated = false;
    }
    PropertiesTextComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['system_id'] !== undefined && params['file_id'] !== undefined) {
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
    PropertiesTextComponent.prototype.getSystemById = function (id) {
        var _this = this;
        this.systemService.getSystem(id)
            .subscribe(function (systems) { if (systems.length == 1) {
            _this.system = systems[0];
        } }, function (err) { console.log(err); });
    };
    //获取文件信息
    PropertiesTextComponent.prototype.getFileById = function (file_id) {
        var _this = this;
        this.systemFileService.getSystemFile(file_id)
            .subscribe(function (files) { if (files.length == 1) {
            _this.systemFile = files[0];
        } }, function (err) { console.log(err); });
    };
    PropertiesTextComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    //返回上一页
    PropertiesTextComponent.prototype.goBack = function (systemFile) {
        if (systemFile === void 0) { systemFile = null; }
        this.close.emit(systemFile);
        if (this.navigated) {
            window.history.back();
        }
    };
    //返回首页
    PropertiesTextComponent.prototype.backToIndex = function () {
        var link = ['/dashboard'];
        this.router.navigate(link);
    };
    PropertiesTextComponent.prototype.updateToSave = function (res) {
        if (res === "" || res === null || res === undefined) {
            alert('初始化内容不能为空');
            return;
        }
        var edge = res.split('\u000A');
        var comment = "";
        for (var i = 0; i < edge.length; i++) {
            var column = edge[i];
            if (column.startsWith('//') || column.startsWith('#')) {
                comment = column.substr(2);
            }
            else {
                var c = column.split('=');
                if ((c[0] == null || c[0] == '') || (c[1] == null || c[1] == '')) {
                    continue;
                }
                else {
                    this.systemConfig = new SystemConfig_1.SystemConfig(this.system.id, comment, c[0], c[1], c[1], c[1], 1);
                    this.systemConfigs.push(this.systemConfig);
                }
            }
        }
        this.saveList();
    };
    //保存所有列表
    PropertiesTextComponent.prototype.saveList = function () {
        for (var i = 0; i < this.systemConfigs.length; ++i) {
            if (this.systemConfigs[i].id == undefined) {
                this.save(this.systemConfigs[i]);
            }
            else {
                this.updateConfig(this.systemConfigs[i]);
            }
        }
        var link = ['/files/' + this.system.id];
        //let link = ['/config/'+this.system.id+"/"+this.systemFile.id];
        this.router.navigate(link);
    };
    //对新数据保存
    PropertiesTextComponent.prototype.save = function (systemConfig) {
        var _this = this;
        systemConfig['file_id'] = this.systemFile.id;
        this.systemConfigService.addSystemConfig(systemConfig)
            .subscribe(function (systemConfigs) { _this.systemConfig = systemConfigs[0]; }, function (err) { console.log(err); }, function () { return console.log(' none'); });
    };
    //对已有systemConfig数据更新
    PropertiesTextComponent.prototype.updateConfig = function (systemConfig) {
        var _this = this;
        this.systemConfigService.updateSystemConfig(systemConfig)
            .subscribe(function (systemConfigs) { _this.systemConfig = systemConfigs[0]; }, function (err) { console.log(err); }, function () { return console.log(' none'); });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PropertiesTextComponent.prototype, "close", void 0);
    PropertiesTextComponent = __decorate([
        core_1.Component({
            selector: 'properties-text',
            templateUrl: 'app/html/properties-text.component.html',
            styleUrls: ['app/css/systemConfig.component.css'],
            providers: [system_service_1.SystemService, systemConfig_service_1.SystemConfigService, systemFiles_service_1.SystemFilesService]
        }), 
        __metadata('design:paramtypes', [router_2.Router, systemConfig_service_1.SystemConfigService, systemFiles_service_1.SystemFilesService, system_service_1.SystemService, router_1.ActivatedRoute])
    ], PropertiesTextComponent);
    return PropertiesTextComponent;
}());
exports.PropertiesTextComponent = PropertiesTextComponent;
