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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var SystemFilesService = (function () {
    function SystemFilesService(http) {
        this.http = http;
        this.listUrl = "http://localhost:3200/systemFiles/list";
        this.getUrl = "http://localhost:3200/systemFiles/getById";
        this.getBysidUrl = "http://localhost:3200/systemFiles/getFileBysId";
        this.addUrl = "http://localhost:3200/systemFiles/add";
        this.deleteUrl = "http://localhost:3200/systemFiles/delete";
        this.updateUrl = "http://localhost:3200/systemFiles/update";
    }
    SystemFilesService.prototype.listSystemFile = function () {
        return this.http.get(this.listUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemFilesService.prototype.getSystemFileBySysId = function (system_id) {
        return this.http.get(this.getBysidUrl + "/" + system_id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemFilesService.prototype.getSystemFile = function (id) {
        return this.http.get(this.getUrl + "/" + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemFilesService.prototype.addSystemFile = function (body, system_id) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var sysString = '{"system_id":' + system_id + ',';
        var bString = sysString + bodyString.substring(1);
        var myJsonObject = JSON.parse(bString);
        return this.http.post(this.addUrl, myJsonObject, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemFilesService.prototype.deleteSystemFIle = function (id) {
        return this.http.delete(this.deleteUrl + "/" + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemFilesService.prototype.updateSystemFile = function (body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var newBody = '';
        if (bodyString != "" && bodyString != null) {
            var bodyArray = bodyString.split(',');
            var bs = bodyArray[0] + ',' + bodyArray[3];
            newBody = JSON.parse(bs);
        }
        return this.http.post(this.updateUrl, newBody, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SystemFilesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SystemFilesService);
    return SystemFilesService;
}());
exports.SystemFilesService = SystemFilesService;
