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
require('rxjs/add/operator/toPromise');
var SystemConfigService = (function () {
    // Resolve HTTP using the constructor
    function SystemConfigService(http) {
        this.http = http;
        this.listUrl = "http://localhost:3200/systemConfig/list";
        this.getUrl = "http://localhost:3200/systemConfig/get";
        this.addUrl = "http://localhost:3200/systemConfig/add";
        this.getBysfUrl = "http://localhost:3200/systemConfig/getBySFId";
        this.getBySysIdUrl = "http://localhost:3200/systemConfig/getBySysId";
        this.getFileBySysIdUrl = "http://localhost:3200/systemConfig/getFileBySysId";
        this.deleteUrl = "http://localhost:3200/systemConfig/delete";
        this.updateUrl = "http://localhost:3200/systemConfig/update";
        this.profileUrl = "http://localhost:3200/v1/api/properties";
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
        return this.http.delete(this.deleteUrl + "/" + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemConfigService.prototype.listProperties = function (body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.profileUrl, body, options)
            .map(function (res) { res.json(), console.log('res: ' + res); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SystemConfigService);
    return SystemConfigService;
}());
exports.SystemConfigService = SystemConfigService;
