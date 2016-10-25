"use strict";
var SystemConfig = (function () {
    function SystemConfig(system_id, name, key_name, dev_value, qa_value, prod_value, privatepro) {
        this.system_id = system_id;
        this.name = name;
        this.key_name = key_name;
        this.dev_value = dev_value;
        this.qa_value = qa_value;
        this.prod_value = prod_value;
        this.privatepro = privatepro;
    }
    return SystemConfig;
}());
exports.SystemConfig = SystemConfig;
