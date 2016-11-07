let api = require('../dao/SystemFilesDao.js')
const Joi=require('joi');


exports.list = {
    description :'list SystemFiles',
    notes: 'return a list',
    tags: ['api'],
    cors:true,
    handler: function (request, reply) {        
            api.list(rows => {reply(rows)})
        }
}

exports.findById = {
    description: 'get a SystemFile by id',
    notes: 'get a SystemFile',
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

exports.findByName = {
    description: 'get a SystemFile by name',
    notes: 'get a SystemFile',
    tags: ['api'],   
    cors:true, 
    validate: {
        payload: {
            filename: Joi.string().trim().min(1).max(90)
        }
    },
    handler: function(request,reply) {
      api.getByName(request,reply)
    }
}

exports.findFileBySysId = {
    description: 'get a SystemFile by system id',
    notes: 'get a SystemFile',
    tags: ['api'],   
    cors:true, 
    validate: {
        params: {
            system_id: Joi.number().integer()
        }
    },
    handler: function(request,reply) {
      api.getFilesBySysId(request,reply)
    }
}

exports.findFileBySysName = {
    description: 'get a SystemFile by system name',
    notes: 'get a SystemFile',
    tags: ['api'],   
    cors:true, 
    validate: {
        payload: {
            system: Joi.string().trim().min(1).max(90)
        }
    },
    handler: function(request,reply) {
      api.getFilesBySysName(request,reply)
    }
}


exports.add = {
    description :'Add a new SystemFile',
    notes: '0 or 1 ',
    tags: ['api'],
    cors:true,
    validate: {
        payload: {
            name: Joi.string().trim().min(1).max(90),
            type: Joi.string().trim().min(1).max(90),
            content: Joi.string().allow(''),
            system_id: Joi.number().integer()
        }
    },
    handler: function (request, reply) {
           api.add(request,reply);
        }
}

exports.update = {
    description: 'update a systemFile information',
    notes: '根据systemFile systemFile',
    tags: ['api'],
    cors: true,
    validate: {
         payload: {
            id: Joi.number().integer(),            
            content: Joi.string().trim().min(1).max(1000),
        }
    },
    handler: function (request, reply) {    
            api.update(request,reply);
        }
}   

exports.delete = {
    description: 'delete a SystemFile',
    notes: '删除系统文件信息',
    tags: ['api'],
    cors: true,
    validate: {
        params: {
            id: Joi.number().integer()
        }
    },
    handler: function(request, reply) {
        api.delete(request,reply);
    }
}

exports.deleteFile = {
    description: 'delete a SystemFile which type is properties',
    notes: '删除系统文件信息',
    tags: ['api'],
    cors: true,
    validate: {
        params: {
            id: Joi.number().integer()
        }
    },
    handler: function(request, reply) {
        api.deleteFile(request,reply);
    }
}

exports.deleteBySysId = {
    description: 'delete SystemFiles by system_id',
    notes: '删除系统编号为xxxx的系统文件信息',
    tags: ['api'],
    cors: true,
    validate: {
        params: {
            id: Joi.number().integer()
        }
    },
    handler: function(request, reply) {
        api.deleteBySysId(request,reply);
    }
}