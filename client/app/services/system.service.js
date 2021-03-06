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
// Imports
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var SystemService = (function () {
    function SystemService(http) {
        this.http = http;
        this.baseUrl = "http://localhost:3200/system";
    }
    SystemService.prototype.listSystem = function () {
        return this.http.get(this.baseUrl + "/list")
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SystemService.prototype.getSystem = function (id) {
        return this.http.get(this.baseUrl + "/get/" + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SystemService.prototype.addSystem = function (body) {
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.baseUrl + "/add", body, options) // ...using post request
            .map(function (res) { return res.json(); })
            .catch(this.handleError); //...errors if any
    };
    SystemService.prototype.deleteSystem = function (id) {
        return this.http.delete(this.baseUrl + "/delete/" + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SystemService.prototype.handleError = function (error) {
        var errMsg = 'server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    SystemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SystemService);
    return SystemService;
}());
exports.SystemService = SystemService;
