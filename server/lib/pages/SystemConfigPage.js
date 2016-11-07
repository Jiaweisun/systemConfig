let api = require('../dao/SystemConfigDao.js')
const Joi=require('joi');


exports.list = {
    description :'list SystemConfigs',
    notes: 'return a list',
    tags: ['api'],
    cors:true,
    handler: function (request, reply) {        
            api.list(rows => {reply(rows)})
        }
}

exports.findById = {
    description: 'get a SystemConfig by id',
    notes: 'get a SystemConfig',
    tags: ['api'],   
    cors:true, 
    validate: {
        params: {
            id: Joi.number().integer()
        }
    },
    handler: function(request,reply) {
      api.get(request,reply)
    }
}

exports.findFileBySysId = {
    description: 'get a fileId by system id',
    notes: 'get fileId',
    tags: ['api'],   
    cors:true, 
    validate: {
        params: {
            system_id: Joi.number().integer()
        }
    },
    handler: function(request,reply) {
      api.getFileBySysId(request,reply)
    }   
}


exports.findBysfid = {
    description: 'get a SystemConfig by system id and file id',
    notes: 'get a SystemConfig',
    tags: ['api'],   
    cors:true, 
    validate: {
        params: {
            system_id: Joi.number().integer(),
            file_id: Joi.number().integer()//,
            // format: Joi.string().trim().min(1).max(90)
        }
    },
    handler: function(request,reply) {
      api.getBySfid(request,reply)
    }   
}


exports.findBySysId = {
    description: 'get a SystemConfig by system id',
    notes: 'get a SystemConfig',
    tags: ['api'],   
    cors:true, 
    validate: {
        params: {
            system_id: Joi.number().integer()
        }
    },
    handler: function(request,reply) {
      api.getBySysId(request,reply)
    }   
}

exports.add = {
    description :'Add a new systemConfig',
    notes: '0 or 1 ',
    tags: ['api'],
    cors:true,
    validate: {
        payload: {
            system_id: Joi.number().integer(),
            name: Joi.string().allow(''),
            key_name:Joi.string().allow(''),
            file_id: Joi.number().integer(),
            dev_value: Joi.string().allow(''),
            qa_value: Joi.string().allow(''),
            prod_value: Joi.string().allow(''),
            privatepro: Joi.number().integer()
        }
    },
    handler: function (request, reply) {
           api.add(request,reply);
        }
}

exports.update = {
    description: 'update a systemConfig information',
    notes: '根据systemConfig ID更新systemConfig信息。',
    tags: ['api'],
    cors:true,
    validate: {
         payload: {
            id: Joi.number().integer(),
            system_id: Joi.number().integer(),
            name: Joi.string().allow(''),
            key_name: Joi.string().allow(''),
            file_id: Joi.number().integer(),
            dev_value: Joi.string().allow(''),
            qa_value: Joi.string().allow(''),
            prod_value: Joi.string().allow(''),
            privatepro: Joi.number().integer()
        }
    },
    handler: function (request, reply) {    
            api.update(request,reply);
        }
}


exports.delete = {
    description: 'delete a systemConfig',
    notes: '删除系统配置信息',
    tags:['api'],
    cors:true,
    validate: {
        params: {
            id: Joi.number().integer()
        }
    },
    handler: function(request, reply) {
        api.delete(request,reply);
    }
}

exports.deleteBySysId = {
    description: 'delete a systemConfig by system_id',
    notes: '删除系统编号为xxx的系统配置信息',
    tags:['api'],
    cors:true,
    validate: {
        params: {
            id: Joi.number().integer()
        }
    },
    handler: function(request, reply) {
        api.deleteBySysId(request,reply);
    }
}

