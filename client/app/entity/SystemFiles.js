"use strict";
var SystemFile = (function () {
    function SystemFile(name, type, content) {
        this.name = name;
        this.type = type;
        this.content = content;
    }
    return SystemFile;
}());
exports.SystemFile = SystemFile;
