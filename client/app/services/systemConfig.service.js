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
/* * * ./app/comments/services/comment.service.ts * * */
// Imports
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var SystemConfigService = (function () {
    // Resolve HTTP using the constructor
    function SystemConfigService(http) {
        this.http = http;
        this.listUrl = "/systemConfig/list";
        this.getUrl = "/systemConfig/get";
        this.addUrl = "/systemConfig/add";
        this.getBysfUrl = "/systemConfig/getBySFId";
        this.getBySysIdUrl = "/systemConfig/getBySysId";
        this.getFileBySysIdUrl = "/systemConfig/getFileBySysId";
        this.deleteUrl = "/systemConfig/delete";
        this.updateUrl = "/systemConfig/update";
    }
    SystemConfigService.prototype.listSystemConfig = function () {
        // ...using get request
        return this.http.get(this.listUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemConfigService.prototype.getSystemConfig = function (id) {
        return this.http.get(this.getUrl + "/" + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemConfigService.prototype.getFileBySysId = function (system_id) {
        return this.http.get(this.getFileBySysIdUrl + "/" + system_id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemConfigService.prototype.getScBySysId = function (system_id) {
        return this.http.get(this.getBySysIdUrl + "/" + system_id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemConfigService.prototype.getSCBysf = function (system_id, file_id) {
        return this.http.get(this.getBysfUrl + "/" + system_id + "/" + file_id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemConfigService.prototype.addSystemConfig = function (body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.addUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemConfigService.prototype.updateSystemConfig = function (body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.updateUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemConfigService.prototype.deleteSystemConfig = function (id) {
        return this.http.delete(this.deleteUrl + "/" + id) // ...using put request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    SystemConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SystemConfigService);
    return SystemConfigService;
}());
exports.SystemConfigService = SystemConfigService;
//# sourceMappingURL=systemConfig.service.js.map