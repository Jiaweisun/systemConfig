"use strict";
var PropertiesCondition = (function () {
    function PropertiesCondition(system, profile, filename, format) {
        this.system = system;
        this.profile = profile;
        this.filename = filename;
        this.format = format;
    }
    return PropertiesCondition;
}());
exports.PropertiesCondition = PropertiesCondition;
