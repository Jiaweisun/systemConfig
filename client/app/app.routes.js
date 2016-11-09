"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./component/dashboard.component');
var system_adding_component_1 = require('./component/system-adding.component');
var system_config_component_1 = require('./component/system-config.component');
var system_files_component_1 = require('./component/system-files.component');
var system_config_xml_component_1 = require('./component/system-config-xml.component');
var system_files_adding_component_1 = require('./component/system-files-adding.component');
var properties_component_1 = require('./component/properties.component');
var properties_text_component_1 = require('./component/properties-text.component');
var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'addSystem',
        component: system_adding_component_1.SystemAddingComponent
    },
    {
        path: 'config/:system_id/:file_id',
        component: system_config_component_1.SystemConfigComponent
    },
    {
        path: 'xml/:system_id/:file_id',
        component: system_config_xml_component_1.SystemXmlConfigComponent
    },
    {
        path: 'files/:id',
        component: system_files_component_1.SystemFileComponent
    },
    {
        path: 'addSystemFile/:id',
        component: system_files_adding_component_1.SystemFilesAddingComponent
    },
    {
        path: 'properties/:system_id/:file_id/:p',
        component: properties_component_1.PropertiesComponent
    },
    {
        path: 'pt/:system_id/:file_id',
        component: properties_text_component_1.PropertiesTextComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
