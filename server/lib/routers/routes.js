let SystemPage = require('../pages/SystemPage.js')
let SystemConfigPage = require('../pages/SystemConfigPage.js')
let ThirdPage = require('../pages/thirdPage.js')
let SystemFilesPage = require('../pages/SystemFilesPage.js')

exports.routers =  [
	{ method: 'GET',  path: '/system/list',  config: SystemPage.list },
	{ method: 'GET',  path: '/system/get/{id}',  config: SystemPage.findById},
	{ method: 'POST',  path: '/system/findByName',  config: SystemPage.findByName},
	{ method: 'POST', path: '/system/add',	config: SystemPage.add},

	{ method: 'GET',  path: '/systemConfig/list',  config: SystemConfigPage.list},
	{ method: 'GET',  path: '/systemConfig/getById/{id}',  config: SystemConfigPage.findById},
	{ method: 'GET',  path: '/systemConfig/getBySysId/{system_id}',  config: SystemConfigPage.findBySysId},
	{ method: 'GET',  path: '/systemConfig/getFileBySysId/{system_id}',  config: SystemConfigPage.findFileBySysId},
	{ method: 'GET', path: '/systemConfig/getBySFId/{system_id}/{file_id}',  config: SystemConfigPage.findBysfid},
	{ method: 'POST', path: '/systemConfig/add',	config: SystemConfigPage.add},
	{ method: 'DELETE',  path: '/systemConfig/delete/{id}',  config: SystemConfigPage.delete},
	{ method: 'POST',  path: '/systemConfig/update',  config: SystemConfigPage.update},

	

	{ method: 'GET',  path: '/systemFiles/list',  config: SystemFilesPage.list},
	{ method: 'GET',  path: '/systemFiles/getById/{id}',  config: SystemFilesPage.findById},
	{ method: 'POST',  path: '/systemFiles/getByName',  config: SystemFilesPage.findByName},
	{ method: 'GET',  path: '/systemFiles/getFileBysId/{system_id}',  config: SystemFilesPage.findFileBySysId},
	{ method: 'POST',  path: '/systemFiles/getFileBysName/{system}',  config: SystemFilesPage.findFileBySysName},
	{ method: 'POST', path: '/systemFiles/add',	config: SystemFilesPage.add},
	{ method: 'DELETE',  path: '/systemFiles/delete/{id}',  config: SystemFilesPage.delete},
	{ method: 'POST',  path: '/systemFiles/update',  config: SystemFilesPage.update},
	


	{ method: 'POST', path: '/v1/api/properties',	config: ThirdPage.findByPs},
	{ method: 'POST', path: '/v1/api/files',	config: ThirdPage.findFilesByPs},
	
 ];

