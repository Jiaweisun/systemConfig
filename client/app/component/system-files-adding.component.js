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
var SystemFiles_1 = require('../entity/SystemFiles');
var systemFiles_service_1 = require('../services/systemFiles.service');
var SystemFilesAddingComponent = (function () {
    function SystemFilesAddingComponent(router, systemFileService, route) {
        this.router = router;
        this.systemFileService = systemFileService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
    }
    SystemFilesAddingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.systemFile = new SystemFiles_1.SystemFile('', '', '');
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                _this.id = +params['id'];
                console.log(_this.id);
                _this.navigated = true;
            }
            else {
                _this.navigated = false;
            }
        });
    };
    SystemFilesAddingComponent.prototype.goBack = function (savedSystemFile) {
        if (savedSystemFile === void 0) { savedSystemFile = null; }
        this.close.emit(savedSystemFile);
        if (this.navigated) {
            window.history.back();
        }
    };
    SystemFilesAddingComponent.prototype.save = function (systemFile) {
        var _this = this;
        if (this.systemFile.name === "" || this.systemFile.name === null || this.systemFile.type === "" || this.systemFile.type === null) {
            return;
        }
        this.systemFileService.addSystemFile(systemFile, this.id).
            subscribe(function (systemFiles) {
            _this.systemFile = systemFiles[0];
            // console.log('systemFile: '+this.systemFile);       
        }, function (err) { console.log(err); _this.router.navigate(['/files/' + _this.id]); }, function () { return console.log(' file none'); });
    };
    SystemFilesAddingComponent.prototype.cancel = function () {
        var link = ['/files/' + this.id];
        this.router.navigate(link);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SystemFiles_1.SystemFile)
    ], SystemFilesAddingComponent.prototype, "systemFile", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SystemFilesAddingComponent.prototype, "close", void 0);
    SystemFilesAddingComponent = __decorate([
        core_1.Component({
            selector: 'adding-system-files',
            templateUrl: 'app/html/system-files-adding.component.html',
            styleUrls: ['app/css/systemConfig.component.css'],
            providers: [systemFiles_service_1.SystemFilesService]
        }), 
        __metadata('design:paramtypes', [router_2.Router, systemFiles_service_1.SystemFilesService, router_1.ActivatedRoute])
    ], SystemFilesAddingComponent);
    return SystemFilesAddingComponent;
}());
exports.SystemFilesAddingComponent = SystemFilesAddingComponent;
//# sourceMappingURL=system-files-adding.component.js.map